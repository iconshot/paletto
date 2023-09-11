const path = require("path");

const fsp = require("fs/promises");

const Target = require("./Target");

const defaultConfig = require("./default-config");

class Bundler {
  constructor(config) {
    this.config = this.extend(config);

    this.elements = [];
    this.targets = [];
  }

  getConfig() {
    return this.config;
  }

  extend(config) {
    const tmpConfig = { ...defaultConfig(this), ...config };

    const { extend } = tmpConfig;

    if (extend !== null) {
      for (const key in extend) {
        const value = extend[key];

        if (value === null) {
          tmpConfig[key] = value;
        } else if (Array.isArray(value)) {
          tmpConfig[key] = [...tmpConfig[key], ...value];
        } else if (typeof value === "object") {
          for (const j in value) {
            tmpConfig[key][j] = value[j];
          }
        } else {
          tmpConfig[key] = value;
        }
      }
    }

    return tmpConfig;
  }

  async bundle() {
    const { src, elements } = this.config;

    this.elements = elements;

    this.convertElements();

    const matches = [];

    for (const tmpSrc of src) {
      const tmpPath = path.resolve(tmpSrc);

      await this.scan(tmpPath, matches);
    }

    this.parseComponents(matches);

    this.convertElements();

    this.parseUtilities(matches);

    await this.write();
  }

  splitModifiers(string) {
    const { breakpoints } = this.config;

    const preffixRegex = /^([^a-z0-9\[\]])?(.+)/;

    const match = string.match(preffixRegex);

    if (match === null) {
      return null;
    }

    const [preffix = null, tmpString] = match.slice(1);

    const splitRegex = /(?<!\[[^\[\]]*):/;

    let className = null;
    let pseudoClasses = [];
    let breakpoint = null;

    const split = tmpString.split(splitRegex);

    switch (split.length) {
      case 0: {
        return null;

        break;
      }

      case 1: {
        className = split[0];

        break;
      }

      case 2: {
        if (split[0] in breakpoints) {
          breakpoint = split[0];
        } else {
          pseudoClasses = [split[0]];
        }

        className = split[1];

        break;
      }

      default: {
        if (split[0] in breakpoints) {
          breakpoint = split[0];
          pseudoClasses = split.slice(1, -1);
        } else {
          pseudoClasses = split.slice(0, -1);
        }

        className = split[split.length - 1];

        break;
      }
    }

    return [preffix, breakpoint, pseudoClasses, className];
  }

  // create targets from elements

  convertElements() {
    const { utilities, breakpoints } = this.config;

    for (const element of this.elements) {
      const tmpSelector = element.getSelector();

      const { "@apply": tmpApply = null, ...tmpProperties } =
        element.getProperties();

      if (tmpApply === null) {
        if (Object.keys(tmpProperties).length === 0) {
          continue;
        }

        const target = new Target(tmpSelector, tmpProperties);

        this.targets.push(target);

        continue;
      }

      const tmpTargets = [];
      const tmpBreakpointTargets = {};

      for (const key in breakpoints) {
        tmpBreakpointTargets[key] = [];
      }

      const matches = tmpApply.split(" ").filter((match) => match.length > 0);

      for (const match of matches) {
        const modifiers = this.splitModifiers(match);

        if (modifiers === null) {
          continue;
        }

        const [tmpPreffix, tmpBreakpointName, tmpPseudoClasses, tmpClass] =
          modifiers;

        if (tmpPreffix !== null && tmpPreffix !== "!") {
          continue;
        }

        for (const utility of utilities) {
          const tmpProperties = utility.parse(tmpClass);

          if (tmpProperties === null) {
            continue;
          }

          const properties = { ...tmpProperties };

          const selectors = tmpSelector.match(/(\\.|[^,])+/g);

          const tmpSelectors = selectors
            .map((selector) => selector.trim())
            .map((selector) => this.parseSelector(selector, tmpPseudoClasses));

          const selector = tmpSelectors.join(", ");

          if (tmpPreffix === "!") {
            for (const key in properties) {
              properties[key] = `${properties[key]}!important`;
            }
          }

          const target = new Target(selector, properties);

          if (tmpBreakpointName !== null) {
            tmpBreakpointTargets[tmpBreakpointName].push(target);
          } else {
            tmpTargets.push(target);
          }

          break;
        }
      }

      const target = new Target(tmpSelector, tmpProperties);

      tmpTargets.push(target);

      const unique = (targets) => {
        return targets.filter(
          (target, i) =>
            targets.findIndex(
              (tmpTarget) => tmpTarget.getSelector() === target.getSelector()
            ) === i
        );
      };

      for (const currentTarget of unique(tmpTargets)) {
        const selector = currentTarget.getSelector();

        const allTargets = tmpTargets.filter(
          (tmpTarget) => tmpTarget.getSelector() === currentTarget.getSelector()
        );

        const properties = allTargets.reduce(
          (properties, tmpTarget) => ({
            ...properties,
            ...tmpTarget.getProperties(),
          }),
          {}
        );

        if (Object.keys(properties).length === 0) {
          continue;
        }

        const target = new Target(selector, properties);

        this.targets.push(target);
      }

      for (const key in breakpoints) {
        const breakpoint = breakpoints[key];

        const tmpTargets = tmpBreakpointTargets[key];

        for (const currentTarget of unique(tmpTargets)) {
          const selector = currentTarget.getSelector();

          const allTargets = tmpTargets.filter(
            (tmpTarget) =>
              tmpTarget.getSelector() === currentTarget.getSelector()
          );

          const properties = allTargets.reduce(
            (properties, tmpTarget) => ({
              ...properties,
              ...tmpTarget.getProperties(),
            }),
            {}
          );

          if (Object.keys(properties).length === 0) {
            continue;
          }

          const target = new Target(selector, properties);

          breakpoint.addTarget(target);
        }
      }
    }

    this.elements = [];
  }

  parseComponents(matches) {
    const { components } = this.config;

    for (const match of matches) {
      for (const component of components) {
        const properties = component.parse(match);

        if (properties === null) {
          continue;
        }

        const selector = `.${match}`;

        const element = new Target(selector, properties);

        this.elements.push(element);

        break;
      }
    }
  }

  parseUtilities(matches) {
    const { utilities, breakpoints } = this.config;

    for (const match of matches) {
      // ignore invalid matches

      const modifiers = this.splitModifiers(match);

      if (modifiers === null) {
        continue;
      }

      const [tmpPreffix, tmpBreakpointName, tmpPseudoClasses, tmpClass] =
        modifiers;

      if (tmpPreffix !== null && tmpPreffix !== "!") {
        continue;
      }

      const tmpBreakpoint =
        tmpBreakpointName !== null ? breakpoints[tmpBreakpointName] : null;

      for (const utility of utilities) {
        const tmpProperties = utility.parse(tmpClass);

        if (tmpProperties === null) {
          continue;
        }

        const { "@apply": apply = null, ...properties } = tmpProperties;

        if (Object.keys(properties).length === 0) {
          break;
        }

        let selector = `.${this.escapeClass(match)}`;

        selector = this.parseSelector(selector, tmpPseudoClasses);

        if (tmpPreffix === "!") {
          for (const key in properties) {
            properties[key] = `${properties[key]}!important`;
          }
        }

        const target = new Target(selector, properties);

        if (tmpBreakpoint !== null) {
          tmpBreakpoint.addTarget(target);
        } else {
          this.targets.push(target);
        }

        break;
      }
    }
  }

  escapeClass(className) {
    return className.replace(/([^a-z0-9-_])/g, "\\$1");
  }

  parseSelector(selector, tmpPseudoClasses) {
    const { pseudoClasses } = this.config;

    for (const tmpPseudoClass of tmpPseudoClasses) {
      const hasBrackets = tmpPseudoClass.match(/^\[.+\]$/);

      if (hasBrackets !== null) {
        const innerMatch = tmpPseudoClass.slice(1, -1);

        if (innerMatch.startsWith("::")) {
          selector += innerMatch;
        } else {
          const innerModifiers = this.splitModifiers(innerMatch);

          if (innerModifiers === null) {
            continue;
          }

          const [innerPreffix, _, innerPseudoClasses, innerClass] =
            innerModifiers;

          let innerSelector = `.${this.escapeClass(innerClass)}`;

          for (const innerPseudoClass of innerPseudoClasses) {
            if (innerPseudoClass in pseudoClasses) {
              const pseudoClass = pseudoClasses[innerPseudoClass];

              innerSelector += `:${pseudoClass.getValue()}`;
            } else {
              innerSelector += `:${innerPseudoClass}`;
            }
          }

          selector = `${innerSelector}${
            innerPreffix === null ? " " : ` ${innerPreffix} `
          }${selector}`;
        }
      } else {
        if (tmpPseudoClass in pseudoClasses) {
          const pseudoClass = pseudoClasses[tmpPseudoClass];

          selector += `:${pseudoClass.getValue()}`;
        } else {
          selector += `:${tmpPseudoClass}`;
        }
      }
    }

    return selector;
  }

  // recursively scan directory in search of potential classes

  async scan(src, matches, isChild = false) {
    const { extensions } = this.config;

    const stat = await fsp.stat(src);

    if (stat.isDirectory()) {
      const files = await fsp.readdir(src);

      for (const file of files) {
        const tmpFile = path.resolve(src, file);

        await this.scan(tmpFile, matches, true);
      }
    } else {
      if (isChild) {
        const endsWith = extensions.some((extension) =>
          src.endsWith(extension)
        );

        if (!endsWith) {
          return;
        }
      }

      const content = await fsp.readFile(src, { encoding: "utf-8" });

      const regex = /[^<>"'`\s]*[^<>"'`\s:]/g;

      const result = content.match(regex);

      if (result === null) {
        return;
      }

      for (const match of result) {
        if (!matches.includes(match)) {
          matches.push(match);
        }
      }
    }
  }

  async write() {
    const { file, animations, breakpoints } = this.config;

    const tmpFile = path.resolve(file);

    const dir = path.dirname(tmpFile);

    await fsp.mkdir(dir, { recursive: true });

    const blocks = [];

    for (const target of this.targets) {
      const selector = target.getSelector();
      const properties = target.getProperties();

      const lines = [];

      lines.push(`${selector} {`);

      for (const key in properties) {
        lines.push(`\t${key}: ${properties[key]};`);
      }

      lines.push("}");

      blocks.push(lines.join("\n"));
    }

    // breakpoints are only outputted if they have targets

    for (const name in breakpoints) {
      const breakpoint = breakpoints[name];

      const media = breakpoint.getMedia();
      const targets = breakpoint.getTargets();

      if (targets.length === 0) {
        continue;
      }

      const tmpBlocks = [];

      tmpBlocks.push(`@media ${media} {`);

      for (const target of targets) {
        const selector = target.getSelector();
        const properties = target.getProperties();

        const lines = [];

        lines.push(`\t${selector} {`);

        for (const key in properties) {
          lines.push(`\t\t${key}: ${properties[key]};`);
        }

        lines.push(`\t}`);

        tmpBlocks.push(lines.join("\n"));
      }

      tmpBlocks.push("}");

      blocks.push(tmpBlocks.join("\n\n"));
    }

    // animations are always outputted because there are multiple ways to use animation-name

    for (const name in animations) {
      const animation = animations[name];

      const keyframes = animation.getKeyframes();

      const lines = [];

      lines.push(`@keyframes ${name} {`);

      for (const key in keyframes) {
        const properties = keyframes[key];

        lines.push(`\t${key} {`);

        for (const j in properties) {
          lines.push(`\t\t${j}: ${properties[j]};`);
        }

        lines.push("\t}");
      }

      lines.push("}");

      blocks.push(lines.join("\n"));
    }

    const content = blocks.join("\n\n");

    await fsp.writeFile(tmpFile, content);
  }
}

module.exports = Bundler;

const path = require("path");

const fsp = require("fs/promises");

const Element = require("./Element");
const Target = require("./Target");

const defaultConfig = require("./default-config");

class Bundler {
  constructor() {
    this.config = null;

    this.elements = [];
    this.targets = [];

    this.caches = {
      components: new Map(),
      utilities: new Map(),
    };
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

  async bundle(config) {
    this.config = this.extend(config);

    const { src, elements } = this.config;

    this.elements = elements;

    this.convertElements();

    const matches = [];

    await Promise.all(
      src.map(async (tmpSrc) => {
        const tmpPath = path.resolve(tmpSrc);

        await this.scan(tmpPath, matches);
      })
    );

    this.parseComponents(matches);

    this.convertElements();

    this.parseUtilities(matches);

    await this.write();

    this.elements = [];
    this.targets = [];
  }

  parse(string, rules, cache) {
    if (cache.has(string)) {
      return cache.get(string);
    }

    let result = null;

    for (const rule of rules) {
      const tmpResult = rule.parse(string);

      if (tmpResult !== null) {
        result = tmpResult;

        break;
      }
    }

    cache.set(string, result);

    return result;
  }

  splitModifiers(string) {
    const preffixRegex = /^([^a-z0-9\[\]])?(.+)/;

    const match = string.match(preffixRegex);

    if (match === null) {
      return null;
    }

    const [preffix = null, tmpString] = match.slice(1);

    const splitRegex = /(?<!\[[^\[\]]*):/;

    let className = null;
    let modifiers = [];

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

      default: {
        modifiers = split.slice(0, -1);
        className = split[split.length - 1];

        break;
      }
    }

    return [preffix, modifiers, className];
  }

  // create targets from elements

  convertElements() {
    const { utilities } = this.config;

    for (const element of this.elements) {
      const tmpSelector = element.getSelector();

      const { "@apply": tmpApply = null, ...tmpProperties } =
        element.getProperties();

      if (tmpApply === null) {
        if (Object.keys(tmpProperties).length === 0) {
          continue;
        }

        const target = new Target(tmpSelector, tmpProperties, []);

        this.targets.push(target);

        continue;
      }

      const tmpTargets = [];

      const matches = tmpApply.split(" ").filter((match) => match.length > 0);

      for (const match of matches) {
        const tmpModifiers = this.splitModifiers(match);

        if (tmpModifiers === null) {
          continue;
        }

        const [preffix, modifiers, className] = tmpModifiers;

        if (preffix !== null && preffix !== "!") {
          continue;
        }

        const tmpProperties = this.parse(
          className,
          utilities,
          this.caches.utilities
        );

        if (tmpProperties === null) {
          continue;
        }

        const properties = { ...tmpProperties };

        const selectors = tmpSelector.match(/(\\.|[^,])+/g);

        const tmpSelectors = selectors
          .map((selector) => selector.trim())
          .map((selector) => this.appendPseudoClasses(selector, modifiers));

        const selector = tmpSelectors.join(", ");

        const media = this.filterMediaQueries(modifiers);

        if (preffix === "!") {
          for (const key in properties) {
            properties[key] = `${properties[key]}!important`;
          }
        }

        const target = new Target(selector, properties, media);

        tmpTargets.push(target);
      }

      const target = new Target(tmpSelector, tmpProperties, []);

      tmpTargets.push(target);

      const unique = tmpTargets.filter((target, i) => {
        const selector = target.getSelector();
        const media = target.getMediaQueries();

        const index = tmpTargets.findIndex((tmpTarget) => {
          const tmpSelector = tmpTarget.getSelector();
          const tmpMedia = tmpTarget.getMediaQueries();

          return (
            selector === tmpSelector &&
            media.length === tmpMedia.length &&
            media.every((item, i) => item === tmpMedia[i])
          );
        });

        return index === i;
      });

      for (const target of unique) {
        const selector = target.getSelector();
        const media = target.getMediaQueries();

        const all = tmpTargets.filter((tmpTarget) => {
          const tmpSelector = tmpTarget.getSelector();
          const tmpMedia = tmpTarget.getMediaQueries();

          return (
            selector === tmpSelector &&
            media.length === tmpMedia.length &&
            media.every((item, i) => item === tmpMedia[i])
          );
        });

        const properties = all.reduce(
          (properties, target) => ({
            ...properties,
            ...target.getProperties(),
          }),
          {}
        );

        const finalTarget = new Target(selector, properties, media);

        this.targets.push(finalTarget);
      }
    }

    this.elements = [];
  }

  parseComponents(matches) {
    const { components } = this.config;

    for (const match of matches) {
      const properties = this.parse(match, components, this.caches.components);

      if (properties === null) {
        continue;
      }

      const selector = `.${match}`;

      const element = new Element(selector, properties);

      this.elements.push(element);
    }
  }

  parseUtilities(matches) {
    const { utilities } = this.config;

    for (const match of matches) {
      // ignore invalid matches

      const tmpModifiers = this.splitModifiers(match);

      if (tmpModifiers === null) {
        continue;
      }

      const [preffix, modifiers, className] = tmpModifiers;

      if (preffix !== null && preffix !== "!") {
        continue;
      }

      const tmpProperties = this.parse(
        className,
        utilities,
        this.caches.utilities
      );

      if (tmpProperties === null) {
        continue;
      }

      const { "@apply": apply = null, ...properties } = tmpProperties;

      if (Object.keys(properties).length === 0) {
        continue;
      }

      let selector = `.${this.escapeClass(match)}`;

      selector = this.appendPseudoClasses(selector, modifiers);

      const media = this.filterMediaQueries(modifiers);

      if (preffix === "!") {
        for (const key in properties) {
          properties[key] = `${properties[key]}!important`;
        }
      }

      const target = new Target(selector, properties, media);

      this.targets.push(target);
    }
  }

  escapeClass(className) {
    return className.replace(/([^a-z0-9-_])/g, "\\$1");
  }

  appendPseudoClasses(selector, modifiers) {
    const { pseudoClasses, mediaQueries } = this.config;

    for (const modifier of modifiers) {
      if (modifier in mediaQueries) {
        continue;
      }

      const hasBrackets = modifier.match(/^\[.+\]$/);

      if (hasBrackets !== null) {
        const innerMatch = modifier.slice(1, -1);

        if (innerMatch.startsWith("::")) {
          selector += innerMatch;
        } else {
          const innerTmpModifiers = this.splitModifiers(innerMatch);

          if (innerTmpModifiers === null) {
            continue;
          }

          const [innerPreffix, innerModifiers, innerClass] = innerTmpModifiers;

          let innerSelector = `.${this.escapeClass(innerClass)}`;

          for (const innerModifier of innerModifiers) {
            if (innerModifier in pseudoClasses) {
              const pseudoClass = pseudoClasses[innerModifier];

              innerSelector += `:${pseudoClass.getValue()}`;
            } else {
              innerSelector += `:${innerModifier}`;
            }
          }

          selector = `${innerSelector}${
            innerPreffix === null ? " " : ` ${innerPreffix} `
          }${selector}`;
        }
      } else {
        if (modifier in pseudoClasses) {
          const pseudoClass = pseudoClasses[modifier];

          selector += `:${pseudoClass.getValue()}`;
        } else {
          selector += `:${modifier}`;
        }
      }
    }

    return selector;
  }

  filterMediaQueries(modifiers) {
    const { mediaQueries } = this.config;

    return modifiers
      .filter((modifier) => modifier in mediaQueries)
      .map((modifier) => mediaQueries[modifier]);
  }

  // recursively scan directory in search of potential classes

  async scan(src, matches, isChild = false) {
    const { extensions } = this.config;

    const stat = await fsp.stat(src);

    if (stat.isDirectory()) {
      const files = await fsp.readdir(src);

      await Promise.all(
        files.map(async (file) => {
          const tmpFile = path.resolve(src, file);

          await this.scan(tmpFile, matches, true);
        })
      );
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
    const { file, animations } = this.config;

    const tmpFile = path.resolve(file);

    const dir = path.dirname(tmpFile);

    await fsp.mkdir(dir, { recursive: true });

    const blocks = this.outputTargets(this.targets);

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

  outputTargets(targets, tabs = 0) {
    const { mediaQueries } = this.config;

    targets.sort((targetA, targetB) => {
      const mediaA = targetA.getMediaQueries();
      const mediaB = targetB.getMediaQueries();

      if (mediaA.length === 0 && mediaB.length === 0) {
        return 0;
      }

      if (mediaA.length === 0 && mediaB.length !== 0) {
        return -1;
      }

      if (mediaA.length !== 0 && mediaB.length === 0) {
        return 1;
      }

      const keys = Object.keys(mediaQueries);

      const queryA = mediaA[0];
      const queryB = mediaB[0];

      const indexA = keys.findIndex((key) => mediaQueries[key] === queryA);
      const indexB = keys.findIndex((key) => mediaQueries[key] === queryB);

      return indexA - indexB;
    });

    const filter = targets.filter((target, i) => {
      const media = target.getMediaQueries();

      let index = null;

      if (media.length === 0) {
        index = targets.findIndex((tmpTarget) => {
          const tmpMedia = tmpTarget.getMediaQueries();

          return tmpMedia.length === 0;
        });
      } else {
        index = targets.findIndex((tmpTarget) => {
          const tmpMedia = tmpTarget.getMediaQueries();

          return (
            tmpMedia.length !== 0 &&
            tmpMedia[0].getQuery() === media[0].getQuery()
          );
        });
      }

      return index === i;
    });

    const blocks = [];

    const tab = new Array(tabs).fill("\t", 0, tabs).join("");

    for (const target of filter) {
      const media = target.getMediaQueries();

      const all = targets.filter((tmpTarget) => {
        const media = target.getMediaQueries();
        const tmpMedia = tmpTarget.getMediaQueries();

        if (media.length === 0) {
          return tmpMedia.length === 0;
        }

        return (
          tmpMedia.length !== 0 &&
          tmpMedia[0].getQuery() === media[0].getQuery()
        );
      });

      if (media.length === 0) {
        for (const target of all) {
          const selector = target.getSelector();
          const properties = target.getProperties();

          const lines = [];

          lines.push(`${tab}${selector} {`);

          for (const property in properties) {
            lines.push(`${tab}\t${property}: ${properties[property]};`);
          }

          lines.push(`${tab}}`);

          blocks.push(lines.join("\n"));
        }
      } else {
        blocks.push(`${tab}@media ${media[0].getQuery()} {`);

        const newTargets = all.map(
          (target) =>
            new Target(
              target.getSelector(),
              target.getProperties(),
              target.getMediaQueries().slice(1)
            )
        );

        const tmpBlocks = this.outputTargets(newTargets, tabs + 1);

        blocks.push(tmpBlocks.join("\n\n"));

        blocks.push(`${tab}}`);
      }
    }

    return blocks;
  }
}

module.exports = Bundler;

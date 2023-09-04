const path = require("path");

const fsp = require("fs/promises");

const Animation = require("./Animation");
const Breakpoint = require("./Breakpoint");
const Color = require("./Color");
const Element = require("./Element");
const Rule = require("./Rule");
const Target = require("./Target");

const defaultRules = require("./default-rules");

class Bundler {
  constructor(config) {
    this.config = this.extend(config);

    this.targets = [];

    this.addColorRules();
  }

  extend(config) {
    const defaultConfig = {
      src: ["./src"],
      file: "./src/output.css",
      extensions: ["js", "html"],
      colors: { blank: new Color(0, 0) },
      rules: [...defaultRules],
      elements: [
        new Element(
          ".container",
          "w-1536px xxl:w-1280px xl:w-1024px lg:w-768px md:w-640px sm:w-100%"
        ),
      ],
      animations: {
        spin: new Animation({
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        }),
        ping: new Animation({
          "75%, 100%": { transform: "scale(2)", opacity: 0 },
        }),
        pulse: new Animation({
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        }),
        bounce: new Animation({
          "0%, 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        }),
      },
      pseudoClasses: {},
      breakpoints: {
        xxl: new Breakpoint("(max-width: 1536px)"),
        xl: new Breakpoint("(max-width: 1280px)"),
        lg: new Breakpoint("(max-width: 1024px)"),
        md: new Breakpoint("(max-width: 768px)"),
        sm: new Breakpoint("(max-width: 640px)"),
      },
      extend: null,
    };

    const tmpConfig = { ...defaultConfig, ...config };

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

  // color rules are added before the other rules so they have priority

  addColorRules() {
    const { rules, colors } = this.config;

    [
      ["color", "color"],
      ["bg-color", "background-color"],
      ["border-inline-s-color", "border-inline-start-color"],
      ["border-inline-e-color", "border-inline-end-color"],
      ["border-inline-color", "border-inline-color"],
      ["border-block-s-color", "border-block-start-color"],
      ["border-block-e-color", "border-block-end-color"],
      ["border-block-color", "border-block-color"],
      ["border-x-color", ["border-left-color", "border-right-color"]],
      ["border-y-color", ["border-top-color", "border-bottom-color"]],
      ["border-t-color", "border-top-color"],
      ["border-b-color", "border-bottom-color"],
      ["border-r-color", "border-right-color"],
      ["border-l-color", "border-left-color"],
      ["border-color", "border-color"],
      ["outline-color", "outline-color"],
      ["text-decoration-color", "text-decoration-color"],
      ["caret-color", "caret-color"],
      ["accent-color", "accent-color"],
      ["bg-gradient-from-color", "--paletto-gradient-from-color"],
      ["bg-gradient-to-color", "--paletto-gradient-to-color"],
      ["box-shadow-color", "--paletto-box-shadow-color"],
      ["text-shadow-color", "--paletto-text-shadow-color"],
      ["drop-shadow-color", "--paletto-drop-shadow-color"],
      ["backdrop-drop-shadow-color", "--paletto-backdrop-drop-shadow-color"],
    ].map((pair) => {
      const [key, property] = pair;

      const createObject = (value) => {
        const object = {};

        if (Array.isArray(property)) {
          for (const tmpProperty of property) {
            object[tmpProperty] = value;
          }
        } else {
          object[property] = value;
        }

        return object;
      };

      rules.unshift(new Rule(`${key}-{first}`, (first) => createObject(first)));

      rules.unshift(
        new Rule(`${key}-{first}-{second}`, (first, second) => {
          if (!(first in colors)) {
            return null;
          }

          if (isNaN(second)) {
            return null;
          }

          const value = parseInt(second);

          const color = colors[first];

          const [r, g, b] = color.rgb(value);

          return createObject(`rgb(${r} ${g} ${b})`);
        })
      );

      rules.unshift(
        new Rule(`${key}-{first}-{second}-{third}`, (first, second, third) => {
          if (!(first in colors)) {
            return null;
          }

          if (isNaN(second)) {
            return null;
          }

          const value = parseInt(second);

          const color = colors[first];

          const [r, g, b] = color.rgb(value);

          return createObject(`rgb(${r} ${g} ${b} / ${third})`);
        })
      );
    });
  }

  async bundle() {
    const { src } = this.config;

    this.fill();

    const matches = [];

    for (const tmpSrc of src) {
      const tmpPath = path.resolve(tmpSrc);

      await this.scan(tmpPath, matches);
    }

    this.parse(matches);

    await this.write();
  }

  split(match) {
    const { breakpoints } = this.config;

    const split = match.split(":");

    let className = null;
    let pseudoClass = null;
    let breakpoint = null;

    switch (split.length) {
      case 1: {
        className = split[0];

        break;
      }

      case 2: {
        if (split[0] in breakpoints) {
          breakpoint = split[0];
        } else {
          pseudoClass = split[0];
        }

        className = split[1];

        break;
      }

      case 3: {
        if (!(split[0] in breakpoints)) {
          return null;
        }

        breakpoint = split[0];
        pseudoClass = split[1];
        className = split[2];

        break;
      }

      default: {
        return null;

        break;
      }
    }

    return [className, pseudoClass, breakpoint];
  }

  // create targets from elements

  fill() {
    const { rules, elements, pseudoClasses, breakpoints } = this.config;

    for (const element of elements) {
      const tmpSelector = element.getSelector();
      const tmpClasses = element.getClasses();
      const tmpProperties = element.getProperties();

      if (tmpClasses === null) {
        const target = new Target(tmpSelector, tmpProperties);

        this.targets.push(target);

        continue;
      }

      const tmpTargets = [];
      const tmpBreakpointTargets = {};

      for (const key in breakpoints) {
        tmpBreakpointTargets[key] = [];
      }

      const matches = tmpClasses
        .split(" ")
        .filter((tmpClass) => tmpClass !== "");

      for (const match of matches) {
        const split = this.split(match);

        if (split === null) {
          continue;
        }

        const [tmpClass, tmpPseudoClass, tmpBreakpointName] = split;

        for (const rule of rules) {
          const properties = rule.parse(tmpClass);

          if (properties === null) {
            continue;
          }

          let selector = tmpSelector;

          if (tmpPseudoClass !== null) {
            let suffix = null;

            if (tmpPseudoClass in pseudoClasses) {
              const pseudoClass = pseudoClasses[tmpPseudoClass];

              suffix = pseudoClass.getValue();
            } else {
              suffix = tmpPseudoClass;
            }

            selector += `:${suffix}`;
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

      if (tmpProperties !== null) {
        const target = new Target(tmpSelector, tmpProperties);

        tmpTargets.push(target);
      }

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

        const properties = allTargets.reduce((properties, tmpTarget) => {
          return { ...properties, ...tmpTarget.getProperties() };
        }, {});

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

          const properties = allTargets.reduce((properties, tmpTarget) => {
            return { ...properties, ...tmpTarget.getProperties() };
          }, {});

          const target = new Target(selector, properties);

          breakpoint.addTarget(target);
        }
      }
    }
  }

  // recursively scan directory in search of potential classes

  async scan(src, matches) {
    const { extensions } = this.config;

    const stat = await fsp.stat(src);

    if (stat.isDirectory()) {
      const files = await fsp.readdir(src);

      for (const file of files) {
        const tmpFile = path.resolve(src, file);

        await this.scan(tmpFile, matches);
      }
    } else {
      const endsWith = extensions.some((extension) => src.endsWith(extension));

      if (!endsWith) {
        return;
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

  // add target to targets or breakpoint

  parse(matches) {
    const { rules, pseudoClasses, breakpoints } = this.config;

    for (const match of matches) {
      const split = this.split(match);

      if (split === null) {
        continue;
      }

      const [tmpClass, tmpPseudoClass, tmpBreakpointName] = split;

      const tmpBreakpoint =
        tmpBreakpointName !== null ? breakpoints[tmpBreakpointName] : null;

      for (const rule of rules) {
        const properties = rule.parse(tmpClass);

        if (properties === null) {
          continue;
        }

        let selector = tmpClass
          .replaceAll("/", "\\/")
          .replaceAll(".", "\\.")
          .replaceAll("%", "\\%")
          .replaceAll(",", "\\,")
          .replaceAll("#", "\\#")
          .replaceAll("[", "\\[")
          .replaceAll("]", "\\]");

        if (tmpPseudoClass !== null) {
          selector = `${tmpPseudoClass}\\:${selector}`;

          let suffix = null;

          if (tmpPseudoClass in pseudoClasses) {
            const pseudoClass = pseudoClasses[tmpPseudoClass];

            suffix = pseudoClass.getValue();
          } else {
            suffix = tmpPseudoClass;
          }

          selector += `:${suffix}`;
        }

        if (tmpBreakpoint !== null) {
          selector = `${tmpBreakpointName}\\:${selector}`;
        }

        selector = `.${selector}`;

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

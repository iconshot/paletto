const Color = require("@paletto/color");

const Animation = require("./Animation");
const Media = require("./Media");
const Rule = require("./Rule");

const defaultUtilities = require("./default-utilities");

module.exports = (bundler) => {
  const config = {
    src: ["./src"],
    file: "./src/output.css",
    extensions: ["js", "html"],
    colors: { blank: new Color(0, 0) },
    elements: [],
    components: [
      new Rule("container", {
        "@apply":
          "w-1536px xxl:w-1280px xl:w-1024px lg:w-768px md:w-640px sm:w-100%",
      }),
    ],
    utilities: [...defaultUtilities],
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
    mediaQueries: {
      xxl: new Media("(max-width: 1536px)"),
      xl: new Media("(max-width: 1280px)"),
      lg: new Media("(max-width: 1024px)"),
      md: new Media("(max-width: 768px)"),
      sm: new Media("(max-width: 640px)"),
      print: new Media("print"),
      screen: new Media("screen"),
      landscape: new Media("(orientation: landscape)"),
      portrait: new Media("(orientation: portrait)"),
      light: new Media("(prefers-color-scheme: light)"),
      dark: new Media("(prefers-color-scheme: dark)"),
    },
    extend: null,
  };

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
  ]
    .reverse()
    .forEach((pair) => {
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

      const rules = [
        new Rule(`${key}-{first}`, ({ first }) => createObject(first)),
        new Rule(`${key}-{first}-{second}`, ({ first, second }) => {
          const { colors } = bundler.getConfig();

          if (!(first in colors)) {
            return {};
          }

          if (isNaN(second)) {
            return {};
          }

          const value = parseInt(second);

          const color = colors[first];

          const [r, g, b] = color.rgb(value);

          return createObject(`rgb(${r} ${g} ${b})`);
        }),
        new Rule(
          `${key}-{first}-{second}-{third}`,
          ({ first, second, third }) => {
            const { colors } = bundler.getConfig();

            if (!(first in colors)) {
              return {};
            }

            if (isNaN(second)) {
              return {};
            }

            const value = parseInt(second);

            const color = colors[first];

            const [r, g, b] = color.rgb(value);

            return createObject(`rgb(${r} ${g} ${b} / ${third})`);
          }
        ),
      ];

      config.utilities.unshift(...rules);
    });

  return config;
};

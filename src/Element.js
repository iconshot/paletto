const Target = require("./Target");

class Element extends Target {
  constructor(...args) {
    let selector = null;
    let classes = null;
    let properties = null;

    switch (args.length) {
      case 2: {
        selector = args[0];

        if (args[1] !== null && typeof args[1] === "object") {
          properties = args[1];
        } else {
          classes = args[1];
        }

        break;
      }

      case 3: {
        selector = args[0];
        classes = args[1];
        properties = args[2];

        break;
      }

      default: {
        throw new Error("Element needs two or three arguments.");
      }
    }

    super(selector, properties);

    this.classes = classes;
  }

  getClasses() {
    return this.classes;
  }
}

module.exports = Element;

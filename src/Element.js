const Target = require("./Target");

class Element extends Target {
  constructor(selector, properties) {
    const { "@apply": apply = null, ...tmpProperties } = properties;

    super(selector, tmpProperties);

    this.apply = apply;
  }

  getApply() {
    return this.apply;
  }
}

module.exports = Element;

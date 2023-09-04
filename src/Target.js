class Target {
  constructor(selector, properties) {
    this.selector = selector;
    this.properties = properties;
  }

  getSelector() {
    return this.selector;
  }

  getProperties() {
    return this.properties;
  }
}

module.exports = Target;

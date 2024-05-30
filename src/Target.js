class Target {
  constructor(selector, properties, mediaQueries) {
    this.selector = selector;
    this.properties = properties;
    this.mediaQueries = mediaQueries;
  }

  getSelector() {
    return this.selector;
  }

  getProperties() {
    return this.properties;
  }

  getMediaQueries() {
    return this.mediaQueries;
  }
}

module.exports = Target;

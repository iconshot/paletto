class Rule {
  constructor(matcher, extractor) {
    this.matcher = matcher;
    this.extractor = extractor;
  }

  parse(string) {
    const args = this.match(string);

    if (args === null) {
      return null;
    }

    const properties = this.extract(...args);

    return properties;
  }

  match(string) {
    // convert hello-{world} to a regex expecting a "world" param

    const matcher = this.matcher.replace(
      /\{([^\}]+)\}/g,
      "(?:([^\\-\\[\\]]+)|\\[([^\\[\\]]+)\\])"
    );

    const regExp = new RegExp(`^${matcher}$`);

    const matches = string.match(regExp);

    if (matches === null) {
      return null;
    }

    const args = matches.slice(1).filter((match) => match !== undefined);

    return args;
  }

  extract(...args) {
    const properties =
      typeof this.extractor === "function"
        ? this.extractor(...args)
        : this.extractor;

    return properties;
  }
}

module.exports = Rule;

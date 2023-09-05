class Rule {
  constructor(matcher, extractor) {
    this.matcher = matcher;
    this.extractor = extractor;
  }

  keys() {
    const matches = this.matcher.matchAll(/\{([^\}]+)\}/g);

    return [...matches].map((match) => match[1]);
  }

  parse(string) {
    const params = this.match(string);

    if (params === null) {
      return null;
    }

    const properties = this.extract(params);

    return properties;
  }

  match(string) {
    // convert utility-{value} to a regex expecting a "value" param

    const matcher = this.matcher.replace(
      /\{([^\}]+)\}/g,
      "(?:([^\\-\\[\\]]+)|\\[([^\\[\\]]+)\\])"
    );

    const regExp = new RegExp(`^${matcher}$`);

    const matches = string.match(regExp);

    if (matches === null) {
      return null;
    }

    const keys = this.keys();

    const values = matches.slice(1).filter((match) => match !== undefined);

    const params = {};

    let i = 0;

    for (const key of keys) {
      params[key] = values[i];

      i++;
    }

    return params;
  }

  extract(params) {
    const properties =
      typeof this.extractor === "function"
        ? this.extractor(params)
        : this.extractor;

    return properties;
  }
}

module.exports = Rule;

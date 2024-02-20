class Size {
  static parse(value) {
    // if "/" found, return percentage

    if (value.includes("/")) {
      const numbers = value.split("/").map((number) => parseFloat(number));

      return `${(numbers[0] / numbers[1]) * 100}%`;
    }

    // if number, return rem

    if (!isNaN(value)) {
      const rem = parseFloat(value) / 16;

      return rem === 0 ? "0" : `${rem}rem`;
    }

    // anything else, return value

    return value;
  }
}

module.exports = Size;

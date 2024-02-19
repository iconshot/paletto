const ColorConvert = require("color-convert");

class Color {
  // source: http://www.procato.com/rgb+index/

  static hues = {
    red: 0,
    scarlet: 7.5,
    vermilion: 15,
    tangelo: 22.5,
    orange: 30,
    gamboge: 37.5,
    amber: 45,
    gold: 52.5,
    yellow: 60,
    appleGreen: 67.5,
    limeGreen: 75,
    springBud: 82.5,
    chartreuseGreen: 90,
    pistachio: 97.5,
    harlequin: 105,
    sapGreen: 112.5,
    green: 120,
    emeraldGreen: 127.5,
    malachiteGreen: 135,
    seaGreen: 142.5,
    springGreen: 150,
    aquamarine: 157.5,
    turquoise: 165,
    opal: 172.5,
    cyan: 180,
    arcticBlue: 187.5,
    cerulean: 195,
    cornflowerBlue: 202.5,
    azure: 210,
    cobaltBlue: 217.5,
    sapphireBlue: 225,
    phthaloBlue: 232.5,
    blue: 240,
    persianBlue: 247.5,
    indigo: 255,
    blueViolet: 262.5,
    violet: 270,
    purple: 277.5,
    mulberry: 285,
    heliotrope: 292.5,
    magenta: 300,
    orchid: 307.5,
    fuchsia: 315,
    cerise: 322.5,
    rose: 330,
    raspberry: 337.5,
    crimson: 345,
    amaranth: 352.5,
  };

  constructor(hue, saturation) {
    this.hue = hue;
    this.saturation = saturation;
  }

  getHue() {
    return this.hue;
  }

  getSaturation() {
    return this.saturation;
  }

  rgb(value) {
    return ColorConvert.hsv.rgb(this.hue, this.saturation, value);
  }

  hex(value) {
    return ColorConvert.hsv.hex(this.hue, this.saturation, value);
  }
}

module.exports = Color;

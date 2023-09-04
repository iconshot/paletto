class Breakpoint {
  constructor(media) {
    this.media = media;

    this.targets = [];
  }

  getMedia() {
    return this.media;
  }

  getTargets() {
    return this.targets;
  }

  addTarget(target) {
    this.targets.push(target);
  }
}

module.exports = Breakpoint;

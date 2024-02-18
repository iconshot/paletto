#!/usr/bin/env node

const path = require("node:path");
const fs = require("node:fs");

const Bundler = require("./src/Bundler");

function requireUncached(module) {
  delete require.cache[require.resolve(module)];

  return require(module);
}

async function bundle() {
  console.log("Paletto: Bundling CSS...");

  const palettoConfig = requireUncached(path.resolve("./paletto.config"));

  const bundler = new Bundler(palettoConfig);

  await bundler.bundle();

  console.log("\033[36mPaletto: Bundled.");
}

async function run() {
  const args = process.argv.slice(2);

  const watch = args.length > 0 && args[0] === "--watch";

  await bundle();

  if (!watch) {
    return;
  }

  let configTimeout = null;
  let sourceTimeout = null;

  let watchers = [];

  let started = false;

  // every time we open the watchers, we load the new config

  const openWatchers = async () => {
    // bundle when it has already been started

    if (started) {
      await bundle();
    }

    const { src, file } = requireUncached(path.resolve("./paletto.config"));

    const tmpFile = path.resolve(file);

    watchers = src.map((tmpSrc) => {
      return fs.watch(tmpSrc, { recursive: true }, (_, filename) => {
        // ignore when change found in "file"

        const tmpFilename = path.resolve(tmpSrc, filename);

        if (tmpFile === tmpFilename) {
          return;
        }

        clearTimeout(sourceTimeout);

        sourceTimeout = setTimeout(() => bundle(), 500);
      });
    });

    started = true;
  };

  const closeWatchers = () => {
    for (const watcher of watchers) {
      watcher.close();
    }

    watchers = [];
  };

  // change in config = reopen watchers

  fs.watch("./paletto.config.js", () => {
    clearTimeout(configTimeout);

    configTimeout = setTimeout(() => {
      closeWatchers();

      openWatchers();
    }, 500);
  });

  // open first watchers

  openWatchers();
}

run();

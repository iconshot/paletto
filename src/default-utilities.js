const Rule = require("./Rule");
const Value = require("./Value");

function createUtilities(pairs, property) {
  const createObject = (value) => {
    const object = {};

    if (Array.isArray(property)) {
      for (const tmpProperty of property) {
        object[tmpProperty] = value;
      }
    } else {
      object[property] = value;
    }

    return object;
  };

  return pairs.map((pair) => new Rule(pair[0], createObject(pair[1])));
}

module.exports = [
  // font family

  new Rule("font-sans", {
    "font-family":
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  }),

  new Rule("font-serif", {
    "font-family":
      'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  }),

  new Rule("font-mono", {
    "font-family":
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  }),

  // font style

  new Rule("font-style-{first}", ({ first }) => ({ "font-style": first })),

  new Rule("font-style-{first}-{second}", ({ first, second }) => ({
    "font-style": `${first} ${second}`,
  })),

  // font weight

  ...createUtilities(
    [
      ["font-normal", "normal"],
      ["font-bold", "bold"],
    ],
    "font-weight"
  ),

  new Rule("font-weight-{value}", ({ value }) => ({ "font-weight": value })),

  // font size

  new Rule("font-size-{value}", ({ value }) => ({
    "font-size": Value.parse(value),
  })),

  // letter spacing

  new Rule("letter-spacing-{value}", ({ value }) => ({
    "letter-spacing": Value.parse(value),
  })),

  // line height

  new Rule("line-height-{value}", ({ value }) => ({
    "line-height": Value.parse(value),
  })),

  // line break

  new Rule("line-break-{value}", ({ value }) => ({ "line-break": value })),

  // list style position

  ...createUtilities(
    [
      ["list-inside", "inside"],
      ["list-outside", "outside"],
    ],
    "list-style-position"
  ),

  new Rule("list-position-{value}", ({ value }) => ({
    "list-style-position": value,
  })),

  // list style type

  ...createUtilities(
    [
      ["list-none", "none"],
      ["list-disc", "disc"],
      ["list-circle", "circle"],
      ["list-square", "square"],
      ["list-decimal", "decimal"],
    ],
    "list-style-type"
  ),

  new Rule("list-type-{value}", ({ value }) => ({
    "list-style-type": value,
  })),

  // text align

  ...createUtilities(
    [
      ["text-left", "left"],
      ["text-center", "center"],
      ["text-right", "right"],
      ["text-justify", "justify"],
      ["text-start", "start"],
      ["text-end", "end"],
    ],
    "text-align"
  ),

  new Rule("text-align-{value}", ({ value }) => ({ "text-align": value })),

  // text decoration

  ...createUtilities(
    [
      ["text-decoration-underline", "underline"],
      ["text-decoration-overline", "overline"],
      ["text-decoration-line-through", "line-through"],
      ["text-decoration-none", "none"],
    ],
    "text-decoration-line"
  ),

  new Rule("text-decoration-line-{first}", ({ first }) => ({
    "text-decoration-line": first,
  })),

  new Rule("text-decoration-line-{first}-{second}", ({ first, second }) => ({
    "text-decoration-line": `${first} ${second}`,
  })),

  new Rule(
    "text-decoration-line-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "text-decoration-line": `${first} ${second} ${third}`,
    })
  ),

  // text decoration style

  ...createUtilities(
    [
      ["text-decoration-solid", "solid"],
      ["text-decoration-double", "double"],
      ["text-decoration-dotted", "dotted"],
      ["text-decoration-dashed", "dashed"],
      ["text-decoration-wavy", "wavy"],
    ],
    "text-decoration-style"
  ),

  new Rule("text-decoration-style-{value}", ({ value }) => ({
    "text-decoration-style": value,
  })),

  // text decoration thickness

  new Rule("text-decoration-thickness-{value}", ({ value }) => ({
    "text-decoration-thickness": Value.parse(value),
  })),

  // text underline offset

  new Rule("text-underline-offset-{value}", ({ value }) => ({
    "text-underline-offset": Value.parse(value),
  })),

  // text underline position

  new Rule("text-underline-position-{first}", ({ first }) => ({
    "text-underline-position": first,
  })),

  new Rule("text-underline-position-{first}-{second}", ({ first, second }) => ({
    "text-underline-position": `${first} ${second}`,
  })),

  // text transform

  ...createUtilities(
    [
      ["text-uppercase", "uppercase"],
      ["text-lowercase", "lowercase"],
      ["text-capitalize", "capitalize"],
      ["text-normal", "none"],
    ],
    "text-transform"
  ),

  new Rule("text-transform-{value}", ({ value }) => ({
    "text-transform": value,
  })),

  // text overflow

  new Rule("text-truncate", {
    overflow: "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap",
  }),

  ...createUtilities(
    [
      ["text-ellipsis", "ellipsis"],
      ["text-clip", "clip"],
    ],
    "text-overflow"
  ),

  new Rule("text-overflow-{first}", ({ first }) => ({
    "text-overflow": first,
  })),

  new Rule("text-overflow-{first}-{second}", ({ first, second }) => ({
    "text-overflow": `${first} ${second}`,
  })),

  // text indent

  new Rule("text-indent-{first}", ({ first }) => ({
    "text-indent": Value.parse(first),
  })),

  new Rule("text-indent-{first}-{second}", ({ first, second }) => ({
    "text-indent": `${Value.parse(first)} ${second}`,
  })),

  new Rule(
    "text-indent-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "text-indent": `${Value.parse(first)} ${second} ${third}`,
    })
  ),

  // vertical align

  new Rule("vertical-align-{value}", ({ value }) => ({
    "vertical-align": Value.parse(value),
  })),

  // white space

  new Rule("white-space-{first}", ({ first }) => ({ "white-space": first })),

  new Rule("white-space-{first}-{second}", ({ first, second }) => ({
    "white-space": `${first} ${second}`,
  })),

  // overflow wrap

  new Rule("overflow-wrap-{value}", ({ value }) => ({
    "overflow-wrap": value,
  })),

  // word break

  new Rule("word-break-{value}", ({ value }) => ({ "word-break": value })),

  // hyphens

  new Rule("hyphens-{value}", ({ value }) => ({ hyphens: value })),

  // content

  new Rule("content-{value}", ({ value }) => ({ content: value })),

  // text shadow

  new Rule("text-shadow-{first}", ({ first }) => ({ "text-shadow": first })),

  new Rule("text-shadow-{first}-{second}", ({ first, second }) => ({
    "text-shadow": `${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-text-shadow-color)`,
  })),

  new Rule(
    "text-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "text-shadow": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} var(--paletto-text-shadow-color)`,
    })
  ),

  // aspect ratio

  new Rule("aspect-{first}", ({ first }) => ({ "aspect-ratio": first })),

  new Rule("aspect-{first}-{second}", ({ first, second }) => ({
    "aspect-ratio": `${first} ${second}`,
  })),

  // columns

  new Rule("columns-num-{first}", ({ first }) => ({ columns: first })),

  new Rule("columns-num-{first}-{second}", ({ first, second }) => ({
    columns: `${first} ${second}`,
  })),

  new Rule("columns-{first}", ({ first }) => ({
    columns: Value.parse(first),
  })),

  new Rule("columns-{first}-{second}", ({ first, second }) => ({
    columns: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // break after

  new Rule("break-after-{value}", ({ value }) => ({ "break-after": value })),

  // break before

  new Rule("break-before-{value}", ({ value }) => ({
    "break-before": value,
  })),

  // break inside

  new Rule("break-inside-{value}", ({ value }) => ({
    "break-inside": value,
  })),

  // writing mode

  new Rule("writing-mode-{value}", ({ value }) => ({
    "writing-mode": value,
  })),

  // direction

  new Rule("direction-{value}", ({ value }) => ({ direction: value })),

  // box decoration

  new Rule("box-decoration-{value}", ({ value }) => ({
    "box-decoration-break": value,
  })),

  // box sizing

  new Rule("box-sizing-{value}", ({ value }) => ({ "box-sizing": value })),

  // display

  ...[
    "block",
    "inline",
    "inline-block",
    "flex",
    "inline-flex",
    "table",
    "inline-table",
    "table-caption",
    "table-cell",
    "table-column",
    "table-column-group",
    "table-footer-group",
    "table-header-group",
    "table-row-group",
    "table-wor",
    "flow-root",
    "grid",
    "inline-grid",
    "contents",
    "list-item",
    "none",
  ].map((value) => new Rule(value, { display: value })),

  new Rule("display-{first}", ({ first }) => ({ display: first })),

  new Rule("display-{first}-{second}", ({ first, second }) => ({
    display: `${first} ${second}`,
  })),

  // float

  new Rule("float-{value}", ({ value }) => ({ float: value })),

  // clear

  new Rule("clear-{value}", ({ value }) => ({ clear: value })),

  // isolation

  new Rule("isolation-{value}", ({ value }) => ({ isolation: value })),

  // object fit

  new Rule("object-fit-{value}", ({ value }) => ({ "object-fit": value })),

  // object position

  new Rule("object-position-{first}", ({ first }) => ({
    "object-position": Value.parse(first),
  })),

  new Rule("object-position-{first}-{second}", ({ first, second }) => ({
    "object-position": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule(
    "object-position-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "object-position": `${first} ${Value.parse(
        second
      )} ${third} ${Value.parse(fourth)}`,
    })
  ),

  // overflow

  new Rule("overflow-x-{value}", ({ value }) => ({ "overflow-x": value })),

  new Rule("overflow-y-{value}", ({ value }) => ({ "overflow-y": value })),

  new Rule("overflow-{first}", ({ first }) => ({ overflow: first })),

  new Rule("overflow-{first}-{second}", ({ first, second }) => ({
    overflow: `${first} ${second}`,
  })),

  // overscroll behavior

  new Rule("overscroll-x-{value}", ({ value }) => ({
    "overscroll-behavior-x": value,
  })),

  new Rule("overscroll-y-{value}", ({ value }) => ({
    "overscroll-behavior-y": value,
  })),

  new Rule("overscroll-{first}", ({ first }) => ({
    "overscroll-behavior": first,
  })),

  new Rule("overscroll-{first}-{second}", ({ first, second }) => ({
    "overscroll-behavior": `${first} ${second}`,
  })),

  // position

  ...["static", "relative", "absolute", "fixed", "sticky"].map(
    (value) => new Rule(value, { position: value })
  ),

  new Rule("position-{value}", ({ value }) => ({ position: value })),

  // inset inline

  new Rule("inset-inline-s-{value}", ({ value }) => ({
    "inset-inline-start": Value.parse(value),
  })),

  new Rule("inset-inline-e-{value}", ({ value }) => ({
    "inset-inline-end": Value.parse(value),
  })),

  new Rule("inset-inline-{first}", ({ first }) => ({
    "inset-inline": Value.parse(first),
  })),

  new Rule("inset-inline-{first}-{second}", ({ first, second }) => ({
    "inset-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // inset block

  new Rule("inset-block-s-{value}", ({ value }) => ({
    "inset-block-start": Value.parse(value),
  })),

  new Rule("inset-block-e-{value}", ({ value }) => ({
    "inset-block-end": Value.parse(value),
  })),

  new Rule("inset-block-{first}", ({ first }) => ({
    "inset-block": Value.parse(first),
  })),

  new Rule("inset-block-{first}-{second}", ({ first, second }) => ({
    "inset-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // inset

  new Rule("inset-{first}", ({ first }) => ({ inset: Value.parse(first) })),

  new Rule("inset-{first}-{second}", ({ first, second }) => ({
    inset: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("inset-{first}-{second}-{third}", ({ first, second, third }) => ({
    inset: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(third)}`,
  })),

  new Rule(
    "inset-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      inset: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)}`,
    })
  ),

  // top, bottom, right, left

  new Rule("top-{value}", ({ value }) => ({ top: Value.parse(value) })),

  new Rule("bottom-{value}", ({ value }) => ({
    bottom: Value.parse(value),
  })),

  new Rule("right-{value}", ({ value }) => ({ right: Value.parse(value) })),

  new Rule("left-{value}", ({ value }) => ({ left: Value.parse(value) })),

  // visibility

  new Rule("visibility-{value}", ({ value }) => ({ visibility: value })),

  // z-index

  new Rule("z-{value}", ({ value }) => ({ "z-index": value })),

  // flex direction

  ...createUtilities(
    [
      ["flex-row", "row"],
      ["flex-row-reverse", "row-reverse"],
      ["flex-column", "column"],
      ["flex-column-reverse", "column-reverse"],
    ],
    "flex-direction"
  ),

  new Rule("flex-direction-{value}", ({ value }) => ({
    "flex-direction": value,
  })),

  // flex wrap

  ...createUtilities(
    [
      ["flex-wrap", "wrap"],
      ["flex-wrap-reverse", "wrap-reverse"],
      ["flex-nowrap", "nowrap"],
    ],
    "flex-wrap"
  ),

  new Rule("flex-wrap-{value}", ({ value }) => ({ "flex-wrap": value })),

  // flex flow

  new Rule("flex-flow-{first}", ({ first }) => ({ "flex-flow": first })),

  new Rule("flex-flow-{first}-{second}", ({ first, second }) => ({
    "flex-flow": `${first} ${second}`,
  })),

  // flex grow

  new Rule("flex-grow-{value}", ({ value }) => ({ "flex-grow": value })),

  // flex shrink

  new Rule("flex-shrink-{value}", ({ value }) => ({ "flex-shrink": value })),

  // flex basis

  new Rule("flex-basis-{value}", ({ value }) => ({
    "flex-basis": Value.parse(value),
  })),

  // flex

  new Rule("flex-all", { flex: "1 1 0" }),

  new Rule("flex-auto", { flex: "1 1 auto" }),

  new Rule("flex-initial", { flex: "0 1 auto" }),

  new Rule("flex-{first}-{second}-{third}", ({ first, second, third }) => ({
    flex: `${first} ${second} ${Value.parse(third)}`,
  })),

  // order

  new Rule("order-{value}", ({ value }) => ({ order: value })),

  // gap

  new Rule("gap-{first}", ({ first }) => ({ gap: Value.parse(first) })),

  new Rule("gap-{first}-{second}", ({ first, second }) => ({
    gap: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("column-gap-{value}", ({ value }) => ({
    "column-gap": Value.parse(value),
  })),

  new Rule("row-gap-{value}", ({ value }) => ({
    "row-gap": Value.parse(value),
  })),

  // justify content

  ...createUtilities(
    [
      ["justify-normal", "normal"],
      ["justify-start", "flex-start"],
      ["justify-end", "flex-end"],
      ["justify-center", "center"],
      ["justify-between", "space-between"],
      ["justify-around", "space-around"],
      ["justify-evenly", "space-evenly"],
      ["justify-stretch", "stretch"],
    ],
    "justify-content"
  ),

  new Rule("justify-content-{first}", ({ first }) => ({
    "justify-content": first,
  })),

  new Rule("justify-content-{first}-{second}", ({ first, second }) => ({
    "justify-content": `${first} ${second}`,
  })),

  // justify items

  new Rule("justify-items-{first}", ({ first }) => ({
    "justify-items": first,
  })),

  new Rule("justify-items-{first}-{second}", ({ first, second }) => ({
    "justify-items": `${first} ${second}`,
  })),

  // justify self

  new Rule("justify-self-{first}", ({ first }) => ({
    "justify-self": first,
  })),

  new Rule("justify-self-{first}-{second}", ({ first, second }) => ({
    "justify-self": `${first} ${second}`,
  })),

  // align items

  ...createUtilities(
    [
      ["align-start", "flex-start"],
      ["align-end", "flex-end"],
      ["align-center", "center"],
      ["align-baseline", "baseline"],
      ["align-stretch", "stretch"],
    ],
    "align-items"
  ),

  new Rule("align-items-{first}", ({ first }) => ({
    "align-items": first,
  })),

  new Rule("align-items-{first}-{second}", ({ first, second }) => ({
    "align-items": `${first} ${second}`,
  })),

  // align content

  new Rule("align-content-{first}", ({ first }) => ({
    "align-content": first,
  })),

  new Rule("align-content-{first}-{second}", ({ first, second }) => ({
    "align-content": `${first} ${second}`,
  })),

  // align self

  new Rule("align-self-{first}", ({ first }) => ({ "align-self": first })),

  new Rule("align-self-{first}-{second}", ({ first, second }) => ({
    "align-self": `${first} ${second}`,
  })),

  // place content

  new Rule("place-content-{first}", ({ first }) => ({
    "place-content": first,
  })),

  new Rule("place-content-{first}-{second}", ({ first, second }) => ({
    "place-content": `${first} ${second}`,
  })),

  new Rule(
    "place-content-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "place-content": `${first} ${second} ${third}`,
    })
  ),

  new Rule(
    "place-content-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "place-content": `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // place items

  new Rule("place-items-{first}", ({ first }) => ({ "place-items": first })),

  new Rule("place-items-{first}-{second}", ({ first, second }) => ({
    "place-items": `${first} ${second}`,
  })),

  new Rule(
    "place-items-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "place-items": `${first} ${second} ${third}`,
    })
  ),

  new Rule(
    "place-items-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "place-items": `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // place self

  new Rule("place-self-{first}", ({ first }) => ({ "place-self": first })),

  new Rule("place-self-{first}-{second}", ({ first, second }) => ({
    "place-self": `${first} ${second}`,
  })),

  new Rule(
    "place-self-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "place-self": `${first} ${second} ${third}`,
    })
  ),

  new Rule(
    "place-self-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "place-self": `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // margin inline

  new Rule("m-inline-s-{value}", ({ value }) => ({
    "margin-inline-start": Value.parse(value),
  })),

  new Rule("m-inline-e-{value}", ({ value }) => ({
    "margin-inline-end": Value.parse(value),
  })),

  new Rule("m-inline-{first}", ({ first }) => ({
    "margin-inline": Value.parse(first),
  })),

  new Rule("m-inline-{first}-{second}", ({ first, second }) => ({
    "margin-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // margin block

  new Rule("m-block-s-{value}", ({ value }) => ({
    "margin-block-start": Value.parse(value),
  })),

  new Rule("m-block-e-{value}", ({ value }) => ({
    "margin-block-end": Value.parse(value),
  })),

  new Rule("m-block-{first}", ({ first }) => ({
    "margin-block": Value.parse(first),
  })),

  new Rule("m-block-{first}-{second}", ({ first, second }) => ({
    "margin-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // margin

  new Rule("m-{first}", ({ first }) => ({ margin: Value.parse(first) })),

  new Rule("m-{first}-{second}", ({ first, second }) => ({
    margin: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("m-{first}-{second}-{third}", ({ first, second, third }) => ({
    margin: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
      third
    )}`,
  })),

  new Rule(
    "m-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      margin: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)}`,
    })
  ),

  new Rule("mt-{value}", ({ value }) => ({
    "margin-top": Value.parse(value),
  })),

  new Rule("mb-{value}", ({ value }) => ({
    "margin-bottom": Value.parse(value),
  })),

  new Rule("ml-{value}", ({ value }) => ({
    "margin-left": Value.parse(value),
  })),

  new Rule("mr-{value}", ({ value }) => ({
    "margin-right": Value.parse(value),
  })),

  new Rule("mx-{value}", ({ value }) => ({
    "margin-left": Value.parse(value),
    "margin-right": Value.parse(value),
  })),

  new Rule("my-{value}", ({ value }) => ({
    "margin-top": Value.parse(value),
    "margin-bottom": Value.parse(value),
  })),

  // padding inline

  new Rule("p-inline-s-{value}", ({ value }) => ({
    "padding-inline-start": Value.parse(value),
  })),

  new Rule("p-inline-e-{value}", ({ value }) => ({
    "padding-inline-end": Value.parse(value),
  })),

  new Rule("p-inline-{first}", ({ first }) => ({
    "padding-inline": Value.parse(first),
  })),

  new Rule("p-inline-{first}-{second}", ({ first, second }) => ({
    "padding-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // padding block

  new Rule("p-block-s-{value}", ({ value }) => ({
    "padding-block-start": Value.parse(value),
  })),

  new Rule("p-block-e-{value}", ({ value }) => ({
    "padding-block-end": Value.parse(value),
  })),

  new Rule("p-block-{first}", ({ first }) => ({
    "padding-block": Value.parse(first),
  })),

  new Rule("p-block-{first}-{second}", ({ first, second }) => ({
    "padding-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // padding

  new Rule("p-{first}", ({ first }) => ({ padding: Value.parse(first) })),

  new Rule("p-{first}-{second}", ({ first, second }) => ({
    padding: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("p-{first}-{second}-{third}", ({ first, second, third }) => ({
    padding: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
      third
    )}`,
  })),

  new Rule(
    "p-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      padding: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)}`,
    })
  ),

  new Rule("pt-{value}", ({ value }) => ({
    "padding-top": Value.parse(value),
  })),

  new Rule("pb-{value}", ({ value }) => ({
    "padding-bottom": Value.parse(value),
  })),

  new Rule("pl-{value}", ({ value }) => ({
    "padding-left": Value.parse(value),
  })),

  new Rule("pr-{value}", ({ value }) => ({
    "padding-right": Value.parse(value),
  })),

  new Rule("px-{value}", ({ value }) => ({
    "padding-left": Value.parse(value),
    "padding-right": Value.parse(value),
  })),

  new Rule("py-{value}", ({ value }) => ({
    "padding-top": Value.parse(value),
    "padding-bottom": Value.parse(value),
  })),

  // width

  new Rule("w-{value}", ({ value }) => ({ width: Value.parse(value) })),

  // min width

  new Rule("min-w-{value}", ({ value }) => ({
    "min-width": Value.parse(value),
  })),

  // max width

  new Rule("max-w-{value}", ({ value }) => ({
    "max-width": Value.parse(value),
  })),

  // height

  new Rule("h-{value}", ({ value }) => ({ height: Value.parse(value) })),

  // min height

  new Rule("min-h-{value}", ({ value }) => ({
    "min-height": Value.parse(value),
  })),

  // max height

  new Rule("max-h-{value}", ({ value }) => ({
    "max-height": Value.parse(value),
  })),

  // background attachment

  ...createUtilities(
    [
      ["bg-fixed", "fixed"],
      ["bg-local", "local"],
      ["bg-scroll", "scroll"],
    ],
    "background-attachment"
  ),

  new Rule("bg-attachment-{value}", ({ value }) => ({
    "background-attachment": value,
  })),

  // background clip

  ...createUtilities(
    [
      ["bg-clip-border", "border-box"],
      ["bg-clip-padding", "padding-box"],
      ["bg-clip-content", "content-box"],
      ["bg-clip-text", "text"],
    ],
    "background-clip"
  ),

  new Rule("bg-clip-{value}", ({ value }) => ({ "background-clip": value })),

  // background origin

  ...createUtilities(
    [
      ["bg-origin-border", "border-box"],
      ["bg-origin-padding", "padding-box"],
      ["bg-origin-content", "content-box"],
    ],
    "background-origin"
  ),

  new Rule("bg-origin-{value}", ({ value }) => ({
    "background-origin": value,
  })),

  // background position

  ...createUtilities(
    [
      ["bg-top", "top"],
      ["bg-bottom", "bottom"],
      ["bg-left", "left"],
      ["bg-right", "right"],
      ["bg-center", "center"],
      ["bg-top-left", "top left"],
      ["bg-top-right", "top right"],
      ["bg-bottom-left", "bottom left"],
      ["bg-bottom-right", "bottom right"],
    ],
    "background-position"
  ),

  new Rule("bg-position-{first}", ({ first }) => ({
    "background-position": Value.parse(first),
  })),

  new Rule("bg-position-{first}-{second}", ({ first, second }) => ({
    "background-position": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule(
    "bg-position-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "background-position": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)}`,
    })
  ),

  new Rule(
    "bg-position-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "background-position": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} ${Value.parse(fourth)}`,
    })
  ),

  // background repeat

  ...createUtilities(
    [
      ["bg-repeat", "repeat"],
      ["bg-no-repeat", "no-repeat"],
      ["bg-repeat-x", "repeat-x"],
      ["bg-repeat-y", "repeat-y"],
    ],
    "background-repeat"
  ),

  new Rule("bg-repeat-{first}", ({ first }) => ({
    "background-repeat": first,
  })),

  new Rule("bg-repeat-{first}-{second}", ({ first, second }) => ({
    "background-repeat": `${first} ${second}`,
  })),

  // background size

  ...createUtilities(
    [
      ["bg-auto", "auto"],
      ["bg-cover", "cover"],
      ["bg-contain", "contain"],
    ],
    "background-size"
  ),

  new Rule("bg-size-{first}", ({ first }) => ({
    "background-size": Value.parse(first),
  })),

  new Rule("bg-size-{first}-{second}", ({ first, second }) => ({
    "background-size": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // background-image

  ...createUtilities(
    [
      [
        "bg-gradient-to-t",
        "linear-gradient(to top, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
      [
        "bg-gradient-to-tr",
        "linear-gradient(to top right, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
      [
        "bg-gradient-to-tl",
        "linear-gradient(to top left, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
      [
        "bg-gradient-to-b",
        "linear-gradient(to bottom, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
      [
        "bg-gradient-to-br",
        "linear-gradient(to bottom right, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
      [
        "bg-gradient-to-bl",
        "linear-gradient(to bottom left, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
      [
        "bg-gradient-to-r",
        "linear-gradient(to right, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
      [
        "bg-gradient-to-l",
        "linear-gradient(to left, var(--paletto-gradient-from-color), var(--paletto-gradient-to-color))",
      ],
    ],
    "background-image"
  ),

  new Rule("bg-image-{value}", ({ value }) => ({
    "background-image": value,
  })),

  // border collapse

  ...createUtilities(
    [
      ["border-collapse", "collapse"],
      ["border-separate", "separate"],
    ],
    "border-collapse"
  ),

  new Rule("border-collapse-{value}", ({ value }) => ({
    "border-collapse": value,
  })),

  // border spacing

  new Rule("border-spacing-{first}", ({ first }) => ({
    "border-spacing": Value.parse(first),
  })),

  new Rule("border-spacing-{first}-{second}", ({ first, second }) => ({
    "border-spacing": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // table layout

  new Rule("table-{value}", ({ value }) => ({ "table-layout": value })),

  // caption side

  new Rule("caption-{value}", ({ value }) => ({ "caption-side": value })),

  // border radius

  new Rule("rounded-t-{first}", ({ first }) => ({
    "border-top-left-radius": Value.parse(first),
    "border-top-right-radius": Value.parse(first),
  })),

  new Rule("rounded-t-{first}-{second}", ({ first, second }) => ({
    "border-top-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-top-right-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-b-{first}", ({ first }) => ({
    "border-bottom-left-radius": Value.parse(first),
    "border-bottom-right-radius": Value.parse(first),
  })),

  new Rule("rounded-b-{first}-{second}", ({ first, second }) => ({
    "border-bottom-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-bottom-right-radius": `${Value.parse(first)} ${Value.parse(
      second
    )}`,
  })),

  new Rule("rounded-r-{first}", ({ first }) => ({
    "border-top-right-radius": Value.parse(first),
    "border-bottom-right-radius": Value.parse(first),
  })),

  new Rule("rounded-r-{first}-{second}", ({ first, second }) => ({
    "border-top-right-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-bottom-right-radius": `${Value.parse(first)} ${Value.parse(
      second
    )}`,
  })),

  new Rule("rounded-l-{first}", ({ first }) => ({
    "border-top-left-radius": Value.parse(first),
    "border-bottom-left-radius": Value.parse(first),
  })),

  new Rule("rounded-l-{first}-{second}", ({ first, second }) => ({
    "border-top-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-bottom-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-tl-{first}", ({ first }) => ({
    "border-top-left-radius": Value.parse(first),
  })),

  new Rule("rounded-tl-{first}-{second}", ({ first, second }) => ({
    "border-top-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-tr-{first}", ({ first }) => ({
    "border-top-right-radius": Value.parse(first),
  })),

  new Rule("rounded-tr-{first}-{second}", ({ first, second }) => ({
    "border-top-right-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-bl-{first}", ({ first }) => ({
    "border-bottom-left-radius": Value.parse(first),
  })),

  new Rule("rounded-bl-{first}-{second}", ({ first, second }) => ({
    "border-bottom-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-br-{first}", ({ first }) => ({
    "border-bottom-right-radius": Value.parse(first),
  })),

  new Rule("rounded-br-{first}-{second}", ({ first, second }) => ({
    "border-bottom-right-radius": `${Value.parse(first)} ${Value.parse(
      second
    )}`,
  })),

  new Rule("rounded-s-{first}", ({ first }) => ({
    "border-start-start-radius": Value.parse(first),
    "border-start-end-radius": Value.parse(first),
  })),

  new Rule("rounded-s-{first}-{second}", ({ first, second }) => ({
    "border-start-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-start-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-e-{first}", ({ first }) => ({
    "border-end-start-radius": Value.parse(first),
    "border-end-end-radius": Value.parse(first),
  })),

  new Rule("rounded-e-{first}-{second}", ({ first, second }) => ({
    "border-end-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-end-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-ss-{first}", ({ first }) => ({
    "border-start-start-radius": Value.parse(first),
  })),

  new Rule("rounded-ss-{first}-{second}", ({ first, second }) => ({
    "border-start-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-se-{first}", ({ first }) => ({
    "border-start-end-radius": Value.parse(first),
  })),

  new Rule("rounded-se-{first}-{second}", ({ first, second }) => ({
    "border-start-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-es-{first}", ({ first }) => ({
    "border-end-start-radius": Value.parse(first),
  })),

  new Rule("rounded-es-{first}-{second}", ({ first, second }) => ({
    "border-end-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-ee-{first}", ({ first }) => ({
    "border-end-end-radius": Value.parse(first),
  })),

  new Rule("rounded-ee-{first}-{second}", ({ first, second }) => ({
    "border-end-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-{first}", ({ first }) => ({
    "border-radius": Value.parse(first),
  })),

  new Rule("rounded-{first}-{second}", ({ first, second }) => ({
    "border-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("rounded-{first}-{second}-{third}", ({ first, second, third }) => ({
    "border-radius": `${Value.parse(first)} ${Value.parse(
      second
    )} ${Value.parse(third)}`,
  })),

  new Rule(
    "rounded-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "border-radius": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} ${Value.parse(fourth)}`,
    })
  ),

  // border inline start

  ...createUtilities(
    [
      ["border-inline-s-solid", "solid"],
      ["border-inline-s-dashed", "dashed"],
      ["border-inline-s-dotted", "dotted"],
      ["border-inline-s-double", "double"],
      ["border-inline-s-hidden", "hidden"],
      ["border-inline-s-none", "none"],
    ],
    "border-inline-start-style"
  ),

  new Rule("border-inline-s-style-{value}", ({ value }) => ({
    "border-inline-start-style": value,
  })),

  new Rule("border-inline-s-{value}", ({ value }) => ({
    "border-inline-start-width": Value.parse(value),
  })),

  // border inline end

  ...createUtilities(
    [
      ["border-inline-e-solid", "solid"],
      ["border-inline-e-dashed", "dashed"],
      ["border-inline-e-dotted", "dotted"],
      ["border-inline-e-double", "double"],
      ["border-inline-e-hidden", "hidden"],
      ["border-inline-e-none", "none"],
    ],
    "border-inline-end-style"
  ),

  new Rule("border-inline-e-style-{value}", ({ value }) => ({
    "border-inline-end-style": value,
  })),

  new Rule("border-inline-e-{value}", ({ value }) => ({
    "border-inline-end-width": Value.parse(value),
  })),

  // border inline

  ...createUtilities(
    [
      ["border-inline-solid", "solid"],
      ["border-inline-dashed", "dashed"],
      ["border-inline-dotted", "dotted"],
      ["border-inline-double", "double"],
      ["border-inline-hidden", "hidden"],
      ["border-inline-none", "none"],
    ],
    "border-inline-style"
  ),

  new Rule("border-inline-style-{value}", ({ value }) => ({
    "border-inline-style": value,
  })),

  new Rule("border-inline-{value}", ({ value }) => ({
    "border-inline-width": Value.parse(value),
  })),

  // border block start

  ...createUtilities(
    [
      ["border-block-s-solid", "solid"],
      ["border-block-s-dashed", "dashed"],
      ["border-block-s-dotted", "dotted"],
      ["border-block-s-double", "double"],
      ["border-block-s-hidden", "hidden"],
      ["border-block-s-none", "none"],
    ],
    "border-block-start-style"
  ),

  new Rule("border-block-s-style-{value}", ({ value }) => ({
    "border-block-start-style": value,
  })),

  new Rule("border-block-s-{value}", ({ value }) => ({
    "border-block-start-width": Value.parse(value),
  })),

  // border block end

  ...createUtilities(
    [
      ["border-block-e-solid", "solid"],
      ["border-block-e-dashed", "dashed"],
      ["border-block-e-dotted", "dotted"],
      ["border-block-e-double", "double"],
      ["border-block-e-hidden", "hidden"],
      ["border-block-e-none", "none"],
    ],
    "border-block-end-style"
  ),

  new Rule("border-block-e-style-{value}", ({ value }) => ({
    "border-block-end-style": value,
  })),

  new Rule("border-block-e-{value}", ({ value }) => ({
    "border-block-end-width": Value.parse(value),
  })),

  // border block

  ...createUtilities(
    [
      ["border-block-solid", "solid"],
      ["border-block-dashed", "dashed"],
      ["border-block-dotted", "dotted"],
      ["border-block-double", "double"],
      ["border-block-hidden", "hidden"],
      ["border-block-none", "none"],
    ],
    "border-block-style"
  ),

  new Rule("border-block-style-{value}", ({ value }) => ({
    "border-block-style": value,
  })),

  new Rule("border-block-{value}", ({ value }) => ({
    "border-block-width": Value.parse(value),
  })),

  // border x

  ...createUtilities(
    [
      ["border-x-solid", "solid"],
      ["border-x-dashed", "dashed"],
      ["border-x-dotted", "dotted"],
      ["border-x-double", "double"],
      ["border-x-hidden", "hidden"],
      ["border-x-none", "none"],
    ],
    ["border-left-style", "border-right-style"]
  ),

  new Rule("border-x-style-{value}", ({ value }) => ({
    "border-left-style": value,
    "border-right-style": value,
  })),

  new Rule("border-x-{value}", ({ value }) => ({
    "border-left-width": Value.parse(value),
    "border-right-width": Value.parse(value),
  })),

  // border y

  ...createUtilities(
    [
      ["border-y-solid", "solid"],
      ["border-y-dashed", "dashed"],
      ["border-y-dotted", "dotted"],
      ["border-y-double", "double"],
      ["border-y-hidden", "hidden"],
      ["border-y-none", "none"],
    ],
    ["border-top-style", "border-bottom-style"]
  ),

  new Rule("border-y-style-{value}", ({ value }) => ({
    "border-top-style": value,
    "border-bottom-style": value,
  })),

  new Rule("border-y-{value}", ({ value }) => ({
    "border-top-width": Value.parse(value),
    "border-bottom-width": Value.parse(value),
  })),

  // border top

  ...createUtilities(
    [
      ["border-t-solid", "solid"],
      ["border-t-dashed", "dashed"],
      ["border-t-dotted", "dotted"],
      ["border-t-double", "double"],
      ["border-t-hidden", "hidden"],
      ["border-t-none", "none"],
    ],
    "border-top-style"
  ),

  new Rule("border-t-style-{value}", ({ value }) => ({
    "border-top-style": value,
  })),

  new Rule("border-t-{value}", ({ value }) => ({
    "border-top-width": Value.parse(value),
  })),

  // border bottom

  ...createUtilities(
    [
      ["border-b-solid", "solid"],
      ["border-b-dashed", "dashed"],
      ["border-b-dotted", "dotted"],
      ["border-b-double", "double"],
      ["border-b-hidden", "hidden"],
      ["border-b-none", "none"],
    ],
    "border-bottom-style"
  ),

  new Rule("border-b-style-{value}", ({ value }) => ({
    "border-bottom-style": value,
  })),

  new Rule("border-b-{value}", ({ value }) => ({
    "border-bottom-width": Value.parse(value),
  })),

  // border left

  ...createUtilities(
    [
      ["border-l-solid", "solid"],
      ["border-l-dashed", "dashed"],
      ["border-l-dotted", "dotted"],
      ["border-l-double", "double"],
      ["border-l-hidden", "hidden"],
      ["border-l-none", "none"],
    ],
    "border-left-style"
  ),

  new Rule("border-l-style-{value}", ({ value }) => ({
    "border-left-style": value,
  })),

  new Rule("border-l-{value}", ({ value }) => ({
    "border-left-width": Value.parse(value),
  })),

  // border right

  ...createUtilities(
    [
      ["border-r-solid", "solid"],
      ["border-r-dashed", "dashed"],
      ["border-r-dotted", "dotted"],
      ["border-r-double", "double"],
      ["border-r-hidden", "hidden"],
      ["border-r-none", "none"],
    ],
    "border-right-style"
  ),

  new Rule("border-r-style-{value}", ({ value }) => ({
    "border-right-style": value,
  })),

  new Rule("border-r-{value}", ({ value }) => ({
    "border-right-width": Value.parse(value),
  })),

  // border

  ...createUtilities(
    [
      ["border-solid", "solid"],
      ["border-dashed", "dashed"],
      ["border-dotted", "dotted"],
      ["border-double", "double"],
      ["border-hidden", "hidden"],
      ["border-none", "none"],
    ],
    "border-style"
  ),

  new Rule("border-style-{value}", ({ value }) => ({
    "border-style": value,
  })),

  new Rule("border-{value}", ({ value }) => ({
    "border-width": Value.parse(value),
  })),

  // outline style

  ...createUtilities(
    [
      ["outline-auto", "auto"],
      ["outline-none", "none"],
      ["outline-solid", "solid"],
      ["outline-dashed", "dashed"],
      ["outline-dotted", "dotted"],
      ["outline-double", "double"],
    ],
    "outline-style"
  ),

  new Rule("outline-style-{value}", ({ value }) => ({
    "outline-style": value,
  })),

  // outline offset

  new Rule("outline-offset-{value}", ({ value }) => ({
    "outline-offset": Value.parse(value),
  })),

  // outline width

  new Rule("outline-{value}", ({ value }) => ({
    "outline-width": Value.parse(value),
  })),

  // box shadow

  new Rule("box-shadow-{first}", ({ first }) => ({ "box-shadow": first })),

  new Rule("box-shadow-{first}-{second}", ({ first, second }) => ({
    "box-shadow": `${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-box-shadow-color)`,
  })),

  new Rule(
    "box-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "box-shadow": `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} var(--paletto-box-shadow-color)`,
    })
  ),

  new Rule(
    "box-shadow-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "box-shadow": `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)} var(--paletto-box-shadow-color)`,
    })
  ),

  new Rule(
    "box-shadow-{first}-{second}-{third}-{fourth}-{fifth}",
    ({ first, second, third, fourth, fifth }) => ({
      "box-shadow": `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)} ${Value.parse(
        fifth
      )} var(--paletto-box-shadow-color)`,
    })
  ),

  // opacity

  new Rule("opacity-{value}", ({ value }) => ({ opacity: value })),

  // mix blend mode

  new Rule("mix-blend-{value}", ({ value }) => ({
    "mix-blend-mode": value,
  })),

  // background blend mode

  new Rule("bg-blend-{value}", ({ value }) => ({
    "background-blend-mode": value,
  })),

  // filter

  new Rule("filter-{value}", ({ value }) => ({ filter: value })),

  // blur

  new Rule("blur-{value}", ({ value }) => ({
    filter: `blur(${Value.parse(value)})`,
  })),

  // brightness

  new Rule("brightness-{value}", ({ value }) => ({
    filter: `brightness(${value})`,
  })),

  // contrast

  new Rule("contrast-{value}", ({ value }) => ({
    filter: `contrast(${value})`,
  })),

  // drop shadow

  new Rule("drop-shadow-{first}-{second}", ({ first, second }) => ({
    filter: `drop-shadow(${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-drop-shadow-color))`,
  })),

  new Rule(
    "drop-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      filter: `drop-shadow(${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} var(--paletto-drop-shadow-color))`,
    })
  ),

  // grayscale

  new Rule("grayscale-{value}", ({ value }) => ({
    filter: `grayscale(${value})`,
  })),

  // hue rotate

  new Rule("hue-rotate-{value}", ({ value }) => ({
    filter: `hue-rotate(${value})`,
  })),

  // invert

  new Rule("invert-{value}", ({ value }) => ({
    filter: `invert(${value})`,
  })),

  // saturate

  new Rule("saturate-{value}", ({ value }) => ({
    filter: `saturate(${value})`,
  })),

  // sepia

  new Rule("sepia-{value}", ({ value }) => ({ filter: `sepia(${value})` })),

  // backdrop filter

  new Rule("backdrop-filter-{value}", ({ value }) => ({
    "backdrop-filter": value,
  })),

  // backdrop blur

  new Rule("backdrop-blur-{value}", ({ value }) => ({
    "backdrop-filter": `blur(${Value.parse(value)})`,
  })),

  // backdrop brightness

  new Rule("backdrop-brightness-{value}", ({ value }) => ({
    "backdrop-filter": `brightness(${value})`,
  })),

  // backdrop contrast

  new Rule("backdrop-contrast-{value}", ({ value }) => ({
    "backdrop-filter": `contrast(${value})`,
  })),

  // backdrop drop shadow

  new Rule("backdrop-drop-shadow-{first}-{second}", ({ first, second }) => ({
    "backdrop-filter": `drop-shadow(${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-backdrop-drop-shadow-color))`,
  })),

  new Rule(
    "backdrop-drop-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "backdrop-filter": `drop-shadow(${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} var(--paletto-backdrop-drop-shadow-color))`,
    })
  ),

  // backdrop grayscale

  new Rule("backdrop-grayscale-{value}", ({ value }) => ({
    "backdrop-filter": `grayscale(${value})`,
  })),

  // backdrop hue rotate

  new Rule("backdrop-hue-rotate-{value}", ({ value }) => ({
    "backdrop-filter": `hue-rotate(${value})`,
  })),

  // backdrop invert

  new Rule("backdrop-invert-{value}", ({ value }) => ({
    "backdrop-filter": `invert(${value})`,
  })),

  // backdrop saturate

  new Rule("backdrop-saturate-{value}", ({ value }) => ({
    "backdrop-filter": `saturate(${value})`,
  })),

  // backdrop sepia

  new Rule("backdrop-sepia-{value}", ({ value }) => ({
    "backdrop-filter": `sepia(${value})`,
  })),

  // transition property

  new Rule("transition-property-{value}", ({ value }) => ({
    "transition-property": value,
  })),

  // transition timing function

  ...createUtilities(
    [
      ["transition-linear", "linear"],
      ["transition-ease-in", "ease-in"],
      ["transition-ease-out", "ease-out"],
      ["transition-ease-in-out", "ease-in-out"],
    ],
    "transition-timing-function"
  ),

  new Rule("transition-timing-{value}", ({ value }) => ({
    "transition-timing-function": value,
  })),

  // transition delay

  new Rule("transition-delay-{value}", ({ value }) => ({
    "transition-delay": value,
  })),

  // transition duration

  new Rule("transition-duration-{value}", ({ value }) => ({
    "transition-duration": value,
  })),

  // transition

  new Rule("transition-{first}", ({ first }) => ({ transition: first })),

  new Rule("transition-{first}-{second}", ({ first, second }) => ({
    transition: `${first} ${second}`,
  })),

  new Rule(
    "transition-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      transition: `${first} ${second} ${third}`,
    })
  ),

  new Rule(
    "transition-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      transition: `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // animate

  new Rule("animate-spin", { animation: "spin 1s linear infinite" }),

  new Rule("animate-ping", {
    animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  }),

  new Rule("animate-pulse", {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  }),

  new Rule("animate-bounce", { animation: "bounce 1s infinite" }),

  // animation delay

  new Rule("animation-delay-{value}", ({ value }) => ({
    "animation-delay": value,
  })),

  // animation direction

  new Rule("animation-direction-{value}", ({ value }) => ({
    "animation-direction": value,
  })),

  // animation duration

  new Rule("animation-duration-{value}", ({ value }) => ({
    "animation-duration": value,
  })),

  // animation fill mode

  new Rule("animation-fill-{value}", ({ value }) => ({
    "animation-fill-mode": value,
  })),

  // animation iteration count

  new Rule("animation-iteration-{value}", ({ value }) => ({
    "animation-iteration-count": value,
  })),

  // animation name

  new Rule("animation-name-{value}", ({ value }) => ({
    "animation-name": value,
  })),

  // animation play state

  new Rule("animation-play-{value}", ({ value }) => ({
    "animation-play-state": value,
  })),

  // animation timeline

  new Rule("animation-timeline-{value}", ({ value }) => ({
    "animation-timeline": value,
  })),

  // animation timing

  new Rule("animation-timing-{value}", ({ value }) => ({
    "animation-timing-function": value,
  })),

  // animation

  new Rule("animation-{first}", ({ first }) => ({ animation: first })),

  new Rule("animation-{first}-{second}", ({ first, second }) => ({
    animation: `${first} ${second}`,
  })),

  new Rule(
    "animation-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      animation: `${first} ${second} ${third}`,
    })
  ),

  new Rule(
    "animation-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      animation: `${first} ${second} ${third} ${fourth}`,
    })
  ),

  new Rule(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}",
    ({ first, second, third, fourth, fifth }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth}`,
    })
  ),

  new Rule(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}",
    ({ first, second, third, fourth, fifth, sixth }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth} ${sixth}`,
    })
  ),

  new Rule(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}-{seventh}",
    ({ first, second, third, fourth, fifth, sixth, seventh }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth} ${sixth} ${seventh}`,
    })
  ),

  new Rule(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}-{seventh}-{eighth}",
    ({ first, second, third, fourth, fifth, sixth, seventh, eighth }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth} ${sixth} ${seventh} ${eighth}`,
    })
  ),

  new Rule(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}-{seventh}-{eighth}-{ninth}",
    ({
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth,
    }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth} ${sixth} ${seventh} ${eighth} ${ninth}`,
    })
  ),

  // transform

  new Rule("transform-{value}", ({ value }) => ({ transform: value })),

  // transform origin

  new Rule("transform-origin-{first}", ({ first }) => ({
    "transform-origin": Value.parse(first),
  })),

  new Rule("transform-origin-{first}-{second}", ({ first, second }) => ({
    "transform-origin": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule(
    "transform-origin-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "transform-origin": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)}`,
    })
  ),

  // transform box

  new Rule("transform-box-{value}", ({ value }) => ({
    "transform-box": value,
  })),

  // transform style

  new Rule("transform-style-{value}", ({ value }) => ({
    "transform-style": value,
  })),

  // scale

  new Rule("scale-x-{value}", ({ value }) => ({
    transform: `scaleX(${value})`,
  })),

  new Rule("scale-y-{value}", ({ value }) => ({
    transform: `scaleY(${value})`,
  })),

  new Rule("scale-z-{value}", ({ value }) => ({
    transform: `scaleZ(${value})`,
  })),

  new Rule("scale-3d-{first}-{second}-{third}", ({ first, second, third }) => ({
    transform: `scale3d(${first}, ${second}, ${third})`,
  })),

  new Rule("scale-{first}", ({ first }) => ({
    transform: `scale(${first})`,
  })),

  new Rule("scale-{first}-{second}", ({ first, second }) => ({
    transform: `scale(${first}, ${second})`,
  })),

  // rotate

  new Rule("rotate-x-{value}", ({ value }) => ({
    transform: `rotateX(${value})`,
  })),

  new Rule("rotate-y-{value}", ({ value }) => ({
    transform: `rotateY(${value})`,
  })),

  new Rule("rotate-z-{value}", ({ value }) => ({
    transform: `rotateZ(${value})`,
  })),

  new Rule(
    "rotate-3d-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      transform: `rotate3d(${first}, ${second}, ${third}, ${fourth})`,
    })
  ),

  new Rule("rotate-{value}", ({ value }) => ({
    transform: `rotate(${value})`,
  })),

  // translate

  new Rule("translate-x-{value}", ({ value }) => ({
    transform: `translateX(${Value.parse(value)})`,
  })),

  new Rule("translate-y-{value}", ({ value }) => ({
    transform: `translateY(${Value.parse(value)})`,
  })),

  new Rule("translate-z-{value}", ({ value }) => ({
    transform: `translateZ(${Value.parse(value)})`,
  })),

  new Rule(
    "translate-3d-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      transform: `translate3d(${Value.parse(first)}, ${Value.parse(
        second
      )}, ${Value.parse(third)})`,
    })
  ),

  new Rule("translate-{first}", ({ first }) => ({
    transform: `translate(${Value.parse(first)})`,
  })),

  new Rule("translate-{first}-{second}", ({ first, second }) => ({
    transform: `translate(${Value.parse(first)}, ${Value.parse(second)})`,
  })),

  // perspective

  new Rule("perspective-{value}", ({ value }) => ({
    transform: `perspective(${Value.parse(value)})`,
  })),

  // skew

  new Rule("skew-x-{value}", ({ value }) => ({
    transform: `skewX(${value})`,
  })),

  new Rule("skew-y-{value}", ({ value }) => ({
    transform: `skewY(${value})`,
  })),

  new Rule("skew-{first}", ({ first }) => ({
    transform: `skew(${first})`,
  })),

  new Rule("skew-{first}-{second}", ({ first, second }) => ({
    transform: `skew(${first}, ${second})`,
  })),

  // matrix

  new Rule(
    "matrix-3d-{a}-{b}-{c}-{d}-{e}-{f}-{g}-{h}-{i}-{j}-{k}-{l}-{m}-{n}-{o}-{p}",
    ({ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p }) => ({
      transform: `matrix3d(${a}, ${b}, ${c}, ${d}, ${e}, ${f}, ${g}, ${h}, ${i}, ${j}, ${k}, ${l}, ${m}, ${n}, ${o}, ${p})`,
    })
  ),

  new Rule(
    "matrix-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}",
    ({ first, second, third, fourth, fifth, sixth }) => ({
      transform: `matrix(${first}, ${second}, ${third}, ${fourth}, ${fifth}, ${sixth})`,
    })
  ),

  // appearance

  new Rule("appearance-{value}", ({ value }) => ({ appearance: value })),

  // cursor

  new Rule("cursor-{value}", ({ value }) => ({ cursor: value })),

  // pointer events

  new Rule("pointer-events-{value}", ({ value }) => ({
    "pointer-events": value,
  })),

  // resize

  new Rule("resize-{value}", ({ value }) => ({ resize: value })),

  // scroll behavior

  new Rule("scroll-behavior-{value}", ({ value }) => ({
    "scroll-behavior": value,
  })),

  // scroll margin inline

  new Rule("scroll-m-inline-s-{value}", ({ value }) => ({
    "scroll-margin-inline-start": Value.parse(value),
  })),

  new Rule("scroll-m-inline-e-{value}", ({ value }) => ({
    "scroll-margin-inline-end": Value.parse(value),
  })),

  new Rule("scroll-m-inline-{first}", ({ first }) => ({
    "scroll-margin-inline": Value.parse(first),
  })),

  new Rule("scroll-m-inline-{first}-{second}", ({ first, second }) => ({
    "scroll-margin-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll margin block

  new Rule("scroll-m-block-s-{value}", ({ value }) => ({
    "scroll-margin-block-start": Value.parse(value),
  })),

  new Rule("scroll-m-block-e-{value}", ({ value }) => ({
    "scroll-margin-block-end": Value.parse(value),
  })),

  new Rule("scroll-m-block-{first}", ({ first }) => ({
    "scroll-margin-block": Value.parse(first),
  })),

  new Rule("scroll-m-block-{first}-{second}", ({ first, second }) => ({
    "scroll-margin-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll margin

  new Rule("scroll-m-{first}", ({ first }) => ({
    "scroll-margin": Value.parse(first),
  })),

  new Rule("scroll-m-{first}-{second}", ({ first, second }) => ({
    "scroll-margin": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("scroll-m-{first}-{second}-{third}", ({ first, second, third }) => ({
    "scroll-margin": `${Value.parse(first)} ${Value.parse(
      second
    )} ${Value.parse(third)}`,
  })),

  new Rule(
    "scroll-m-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "scroll-margin": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} ${Value.parse(fourth)}`,
    })
  ),

  new Rule("scroll-mt-{value}", ({ value }) => ({
    "scroll-margin-top": Value.parse(value),
  })),

  new Rule("scroll-mb-{value}", ({ value }) => ({
    "scroll-margin-bottom": Value.parse(value),
  })),

  new Rule("scroll-ml-{value}", ({ value }) => ({
    "scroll-margin-left": Value.parse(value),
  })),

  new Rule("scroll-mr-{value}", ({ value }) => ({
    "scroll-margin-right": Value.parse(value),
  })),

  new Rule("scroll-mx-{value}", ({ value }) => ({
    "scroll-margin-left": Value.parse(value),
    "scroll-margin-right": Value.parse(value),
  })),

  new Rule("scroll-my-{value}", ({ value }) => ({
    "scroll-margin-top": Value.parse(value),
    "scroll-margin-bottom": Value.parse(value),
  })),

  // scroll padding inline

  new Rule("scroll-p-inline-s-{value}", ({ value }) => ({
    "scroll-padding-inline-start": Value.parse(value),
  })),

  new Rule("scroll-p-inline-e-{value}", ({ value }) => ({
    "scroll-padding-inline-end": Value.parse(value),
  })),

  new Rule("scroll-p-inline-{first}", ({ first }) => ({
    "scroll-padding-inline": Value.parse(first),
  })),

  new Rule("scroll-p-inline-{first}-{second}", ({ first, second }) => ({
    "scroll-padding-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll padding block

  new Rule("scroll-p-block-s-{value}", ({ value }) => ({
    "scroll-padding-block-start": Value.parse(value),
  })),

  new Rule("scroll-p-block-e-{value}", ({ value }) => ({
    "scroll-padding-block-end": Value.parse(value),
  })),

  new Rule("scroll-p-block-{first}", ({ first }) => ({
    "scroll-padding-block": Value.parse(first),
  })),

  new Rule("scroll-p-block-{first}-{second}", ({ first, second }) => ({
    "scroll-padding-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll padding

  new Rule("scroll-p-{first}", ({ first }) => ({
    "scroll-padding": Value.parse(first),
  })),

  new Rule("scroll-p-{first}-{second}", ({ first, second }) => ({
    "scroll-padding": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Rule("scroll-p-{first}-{second}-{third}", ({ first, second, third }) => ({
    "scroll-padding": `${Value.parse(first)} ${Value.parse(
      second
    )} ${Value.parse(third)}`,
  })),

  new Rule(
    "scroll-p-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "scroll-padding": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} ${Value.parse(fourth)}`,
    })
  ),

  new Rule("scroll-pt-{value}", ({ value }) => ({
    "scroll-padding-top": Value.parse(value),
  })),

  new Rule("scroll-pb-{value}", ({ value }) => ({
    "scroll-padding-bottom": Value.parse(value),
  })),

  new Rule("scroll-pl-{value}", ({ value }) => ({
    "scroll-padding-left": Value.parse(value),
  })),

  new Rule("scroll-pr-{value}", ({ value }) => ({
    "scroll-padding-right": Value.parse(value),
  })),

  new Rule("scroll-px-{value}", ({ value }) => ({
    "scroll-padding-left": Value.parse(value),
    "scroll-padding-right": Value.parse(value),
  })),

  new Rule("scroll-py-{value}", ({ value }) => ({
    "scroll-padding-top": Value.parse(value),
    "scroll-padding-bottom": Value.parse(value),
  })),

  // scroll snap align

  new Rule("scroll-align-{first}", ({ first }) => ({
    "scroll-snap-align": first,
  })),

  new Rule("scroll-align-{first}-{second}", ({ first, second }) => ({
    "scroll-snap-align": `${first} ${second}`,
  })),

  // scroll snap stop

  new Rule("scroll-stop-{value}", ({ value }) => ({
    "scroll-snap-stop": value,
  })),

  // scroll snap type

  new Rule("scroll-type-{first}", ({ first }) => ({
    "scroll-snap-type": first,
  })),

  new Rule("scroll-type-{first}-{second}", ({ first, second }) => ({
    "scroll-snap-type": `${first} ${second}`,
  })),

  // touch action

  new Rule("touch-action-{value}", ({ value }) => ({
    "touch-action": value,
  })),

  // user select

  new Rule("user-select-{value}", ({ value }) => ({ "user-select": value })),

  // will change

  new Rule("will-change-{value}", ({ value }) => ({ "will-change": value })),
];

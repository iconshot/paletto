const Utility = require("./Utility");
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

  return pairs.map((pair) => new Utility(pair[0], createObject(pair[1])));
}

module.exports = [
  // font family

  new Utility("font-sans", {
    "font-family":
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  }),

  new Utility("font-serif", {
    "font-family":
      'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  }),

  new Utility("font-mono", {
    "font-family":
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  }),

  // font style

  new Utility("font-style-{first}", ({ first }) => ({ "font-style": first })),

  new Utility("font-style-{first}-{second}", ({ first, second }) => ({
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

  new Utility("font-weight-{value}", ({ value }) => ({ "font-weight": value })),

  // font size

  new Utility("font-size-{value}", ({ value }) => ({
    "font-size": Value.parse(value),
  })),

  // letter spacing

  new Utility("letter-spacing-{value}", ({ value }) => ({
    "letter-spacing": Value.parse(value),
  })),

  // line height

  new Utility("line-height-{value}", ({ value }) => ({
    "line-height": Value.parse(value),
  })),

  // line break

  new Utility("line-break-{value}", ({ value }) => ({ "line-break": value })),

  // list style position

  ...createUtilities(
    [
      ["list-inside", "inside"],
      ["list-outside", "outside"],
    ],
    "list-style-position"
  ),

  new Utility("list-position-{value}", ({ value }) => ({
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

  new Utility("list-type-{value}", ({ value }) => ({
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

  new Utility("text-align-{value}", ({ value }) => ({ "text-align": value })),

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

  new Utility("text-decoration-line-{first}", ({ first }) => ({
    "text-decoration-line": first,
  })),

  new Utility("text-decoration-line-{first}-{second}", ({ first, second }) => ({
    "text-decoration-line": `${first} ${second}`,
  })),

  new Utility(
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

  new Utility("text-decoration-style-{value}", ({ value }) => ({
    "text-decoration-style": value,
  })),

  // text decoration thickness

  new Utility("text-decoration-thickness-{value}", ({ value }) => ({
    "text-decoration-thickness": Value.parse(value),
  })),

  // text underline offset

  new Utility("text-underline-offset-{value}", ({ value }) => ({
    "text-underline-offset": Value.parse(value),
  })),

  // text underline position

  new Utility("text-underline-position-{first}", ({ first }) => ({
    "text-underline-position": first,
  })),

  new Utility(
    "text-underline-position-{first}-{second}",
    ({ first, second }) => ({
      "text-underline-position": `${first} ${second}`,
    })
  ),

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

  new Utility("text-transform-{value}", ({ value }) => ({
    "text-transform": value,
  })),

  // text overflow

  new Utility("text-truncate", {
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

  new Utility("text-overflow-{first}", ({ first }) => ({
    "text-overflow": first,
  })),

  new Utility("text-overflow-{first}-{second}", ({ first, second }) => ({
    "text-overflow": `${first} ${second}`,
  })),

  // text indent

  new Utility("text-indent-{first}", ({ first }) => ({
    "text-indent": Value.parse(first),
  })),

  new Utility("text-indent-{first}-{second}", ({ first, second }) => ({
    "text-indent": `${Value.parse(first)} ${second}`,
  })),

  new Utility(
    "text-indent-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "text-indent": `${Value.parse(first)} ${second} ${third}`,
    })
  ),

  // vertical align

  new Utility("vertical-align-{value}", ({ value }) => ({
    "vertical-align": Value.parse(value),
  })),

  // white space

  new Utility("white-space-{first}", ({ first }) => ({ "white-space": first })),

  new Utility("white-space-{first}-{second}", ({ first, second }) => ({
    "white-space": `${first} ${second}`,
  })),

  // overflow wrap

  new Utility("overflow-wrap-{value}", ({ value }) => ({
    "overflow-wrap": value,
  })),

  // word break

  new Utility("word-break-{value}", ({ value }) => ({ "word-break": value })),

  // hyphens

  new Utility("hyphens-{value}", ({ value }) => ({ hyphens: value })),

  // content

  new Utility("content-{value}", ({ value }) => ({ content: value })),

  // text shadow

  new Utility("text-shadow-{first}", ({ first }) => ({ "text-shadow": first })),

  new Utility("text-shadow-{first}-{second}", ({ first, second }) => ({
    "text-shadow": `${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-text-shadow-color)`,
  })),

  new Utility(
    "text-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "text-shadow": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} var(--paletto-text-shadow-color)`,
    })
  ),

  // aspect ratio

  new Utility("aspect-{first}", ({ first }) => ({ "aspect-ratio": first })),

  new Utility("aspect-{first}-{second}", ({ first, second }) => ({
    "aspect-ratio": `${first} ${second}`,
  })),

  // columns

  new Utility("columns-num-{first}", ({ first }) => ({ columns: first })),

  new Utility("columns-num-{first}-{second}", ({ first, second }) => ({
    columns: `${first} ${second}`,
  })),

  new Utility("columns-{first}", ({ first }) => ({
    columns: Value.parse(first),
  })),

  new Utility("columns-{first}-{second}", ({ first, second }) => ({
    columns: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // break after

  new Utility("break-after-{value}", ({ value }) => ({ "break-after": value })),

  // break before

  new Utility("break-before-{value}", ({ value }) => ({
    "break-before": value,
  })),

  // break inside

  new Utility("break-inside-{value}", ({ value }) => ({
    "break-inside": value,
  })),

  // writing mode

  new Utility("writing-mode-{value}", ({ value }) => ({
    "writing-mode": value,
  })),

  // direction

  new Utility("direction-{value}", ({ value }) => ({ direction: value })),

  // box decoration

  new Utility("box-decoration-{value}", ({ value }) => ({
    "box-decoration-break": value,
  })),

  // box sizing

  new Utility("box-sizing-{value}", ({ value }) => ({ "box-sizing": value })),

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
  ].map((value) => new Utility(value, { display: value })),

  new Utility("display-{first}", ({ first }) => ({ display: first })),

  new Utility("display-{first}-{second}", ({ first, second }) => ({
    display: `${first} ${second}`,
  })),

  // float

  new Utility("float-{value}", ({ value }) => ({ float: value })),

  // clear

  new Utility("clear-{value}", ({ value }) => ({ clear: value })),

  // isolation

  new Utility("isolation-{value}", ({ value }) => ({ isolation: value })),

  // object fit

  new Utility("object-fit-{value}", ({ value }) => ({ "object-fit": value })),

  // object position

  new Utility("object-position-{first}", ({ first }) => ({
    "object-position": Value.parse(first),
  })),

  new Utility("object-position-{first}-{second}", ({ first, second }) => ({
    "object-position": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility(
    "object-position-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "object-position": `${first} ${Value.parse(
        second
      )} ${third} ${Value.parse(fourth)}`,
    })
  ),

  // overflow

  new Utility("overflow-x-{value}", ({ value }) => ({ "overflow-x": value })),

  new Utility("overflow-y-{value}", ({ value }) => ({ "overflow-y": value })),

  new Utility("overflow-{first}", ({ first }) => ({ overflow: first })),

  new Utility("overflow-{first}-{second}", ({ first, second }) => ({
    overflow: `${first} ${second}`,
  })),

  // overscroll behavior

  new Utility("overscroll-x-{value}", ({ value }) => ({
    "overscroll-behavior-x": value,
  })),

  new Utility("overscroll-y-{value}", ({ value }) => ({
    "overscroll-behavior-y": value,
  })),

  new Utility("overscroll-{first}", ({ first }) => ({
    "overscroll-behavior": first,
  })),

  new Utility("overscroll-{first}-{second}", ({ first, second }) => ({
    "overscroll-behavior": `${first} ${second}`,
  })),

  // position

  ...["static", "relative", "absolute", "fixed", "sticky"].map(
    (value) => new Utility(value, { position: value })
  ),

  new Utility("position-{value}", ({ value }) => ({ position: value })),

  // inset inline

  new Utility("inset-inline-s-{value}", ({ value }) => ({
    "inset-inline-start": Value.parse(value),
  })),

  new Utility("inset-inline-e-{value}", ({ value }) => ({
    "inset-inline-end": Value.parse(value),
  })),

  new Utility("inset-inline-{first}", ({ first }) => ({
    "inset-inline": Value.parse(first),
  })),

  new Utility("inset-inline-{first}-{second}", ({ first, second }) => ({
    "inset-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // inset block

  new Utility("inset-block-s-{value}", ({ value }) => ({
    "inset-block-start": Value.parse(value),
  })),

  new Utility("inset-block-e-{value}", ({ value }) => ({
    "inset-block-end": Value.parse(value),
  })),

  new Utility("inset-block-{first}", ({ first }) => ({
    "inset-block": Value.parse(first),
  })),

  new Utility("inset-block-{first}-{second}", ({ first, second }) => ({
    "inset-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // inset

  new Utility("inset-{first}", ({ first }) => ({ inset: Value.parse(first) })),

  new Utility("inset-{first}-{second}", ({ first, second }) => ({
    inset: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("inset-{first}-{second}-{third}", ({ first, second, third }) => ({
    inset: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(third)}`,
  })),

  new Utility(
    "inset-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      inset: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)}`,
    })
  ),

  // top, bottom, right, left

  new Utility("top-{value}", ({ value }) => ({ top: Value.parse(value) })),

  new Utility("bottom-{value}", ({ value }) => ({
    bottom: Value.parse(value),
  })),

  new Utility("right-{value}", ({ value }) => ({ right: Value.parse(value) })),

  new Utility("left-{value}", ({ value }) => ({ left: Value.parse(value) })),

  // visibility

  new Utility("visibility-{value}", ({ value }) => ({ visibility: value })),

  // z-index

  new Utility("z-{value}", ({ value }) => ({ "z-index": value })),

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

  new Utility("flex-direction-{value}", ({ value }) => ({
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

  new Utility("flex-wrap-{value}", ({ value }) => ({ "flex-wrap": value })),

  // flex flow

  new Utility("flex-flow-{first}", ({ first }) => ({ "flex-flow": first })),

  new Utility("flex-flow-{first}-{second}", ({ first, second }) => ({
    "flex-flow": `${first} ${second}`,
  })),

  // flex grow

  new Utility("flex-grow-{value}", ({ value }) => ({ "flex-grow": value })),

  // flex shrink

  new Utility("flex-shrink-{value}", ({ value }) => ({ "flex-shrink": value })),

  // flex basis

  new Utility("flex-basis-{value}", ({ value }) => ({
    "flex-basis": Value.parse(value),
  })),

  // flex

  new Utility("flex-all", { flex: "1 1 0" }),

  new Utility("flex-auto", { flex: "1 1 auto" }),

  new Utility("flex-initial", { flex: "0 1 auto" }),

  new Utility("flex-{first}-{second}-{third}", ({ first, second, third }) => ({
    flex: `${first} ${second} ${Value.parse(third)}`,
  })),

  // order

  new Utility("order-{value}", ({ value }) => ({ order: value })),

  // gap

  new Utility("gap-{first}", ({ first }) => ({ gap: Value.parse(first) })),

  new Utility("gap-{first}-{second}", ({ first, second }) => ({
    gap: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("column-gap-{value}", ({ value }) => ({
    "column-gap": Value.parse(value),
  })),

  new Utility("row-gap-{value}", ({ value }) => ({
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

  new Utility("justify-content-{first}", ({ first }) => ({
    "justify-content": first,
  })),

  new Utility("justify-content-{first}-{second}", ({ first, second }) => ({
    "justify-content": `${first} ${second}`,
  })),

  // justify items

  new Utility("justify-items-{first}", ({ first }) => ({
    "justify-items": first,
  })),

  new Utility("justify-items-{first}-{second}", ({ first, second }) => ({
    "justify-items": `${first} ${second}`,
  })),

  // justify self

  new Utility("justify-self-{first}", ({ first }) => ({
    "justify-self": first,
  })),

  new Utility("justify-self-{first}-{second}", ({ first, second }) => ({
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

  new Utility("align-items-{first}", ({ first }) => ({
    "align-items": first,
  })),

  new Utility("align-items-{first}-{second}", ({ first, second }) => ({
    "align-items": `${first} ${second}`,
  })),

  // align content

  new Utility("align-content-{first}", ({ first }) => ({
    "align-content": first,
  })),

  new Utility("align-content-{first}-{second}", ({ first, second }) => ({
    "align-content": `${first} ${second}`,
  })),

  // align self

  new Utility("align-self-{first}", ({ first }) => ({ "align-self": first })),

  new Utility("align-self-{first}-{second}", ({ first, second }) => ({
    "align-self": `${first} ${second}`,
  })),

  // place content

  new Utility("place-content-{first}", ({ first }) => ({
    "place-content": first,
  })),

  new Utility("place-content-{first}-{second}", ({ first, second }) => ({
    "place-content": `${first} ${second}`,
  })),

  new Utility(
    "place-content-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "place-content": `${first} ${second} ${third}`,
    })
  ),

  new Utility(
    "place-content-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "place-content": `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // place items

  new Utility("place-items-{first}", ({ first }) => ({ "place-items": first })),

  new Utility("place-items-{first}-{second}", ({ first, second }) => ({
    "place-items": `${first} ${second}`,
  })),

  new Utility(
    "place-items-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "place-items": `${first} ${second} ${third}`,
    })
  ),

  new Utility(
    "place-items-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "place-items": `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // place self

  new Utility("place-self-{first}", ({ first }) => ({ "place-self": first })),

  new Utility("place-self-{first}-{second}", ({ first, second }) => ({
    "place-self": `${first} ${second}`,
  })),

  new Utility(
    "place-self-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "place-self": `${first} ${second} ${third}`,
    })
  ),

  new Utility(
    "place-self-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "place-self": `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // margin inline

  new Utility("m-inline-s-{value}", ({ value }) => ({
    "margin-inline-start": Value.parse(value),
  })),

  new Utility("m-inline-e-{value}", ({ value }) => ({
    "margin-inline-end": Value.parse(value),
  })),

  new Utility("m-inline-{first}", ({ first }) => ({
    "margin-inline": Value.parse(first),
  })),

  new Utility("m-inline-{first}-{second}", ({ first, second }) => ({
    "margin-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // margin block

  new Utility("m-block-s-{value}", ({ value }) => ({
    "margin-block-start": Value.parse(value),
  })),

  new Utility("m-block-e-{value}", ({ value }) => ({
    "margin-block-end": Value.parse(value),
  })),

  new Utility("m-block-{first}", ({ first }) => ({
    "margin-block": Value.parse(first),
  })),

  new Utility("m-block-{first}-{second}", ({ first, second }) => ({
    "margin-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // margin

  new Utility("m-{first}", ({ first }) => ({ margin: Value.parse(first) })),

  new Utility("m-{first}-{second}", ({ first, second }) => ({
    margin: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("m-{first}-{second}-{third}", ({ first, second, third }) => ({
    margin: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
      third
    )}`,
  })),

  new Utility(
    "m-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      margin: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)}`,
    })
  ),

  new Utility("mt-{value}", ({ value }) => ({
    "margin-top": Value.parse(value),
  })),

  new Utility("mb-{value}", ({ value }) => ({
    "margin-bottom": Value.parse(value),
  })),

  new Utility("ml-{value}", ({ value }) => ({
    "margin-left": Value.parse(value),
  })),

  new Utility("mr-{value}", ({ value }) => ({
    "margin-right": Value.parse(value),
  })),

  new Utility("mx-{value}", ({ value }) => ({
    "margin-left": Value.parse(value),
    "margin-right": Value.parse(value),
  })),

  new Utility("my-{value}", ({ value }) => ({
    "margin-top": Value.parse(value),
    "margin-bottom": Value.parse(value),
  })),

  // padding inline

  new Utility("p-inline-s-{value}", ({ value }) => ({
    "padding-inline-start": Value.parse(value),
  })),

  new Utility("p-inline-e-{value}", ({ value }) => ({
    "padding-inline-end": Value.parse(value),
  })),

  new Utility("p-inline-{first}", ({ first }) => ({
    "padding-inline": Value.parse(first),
  })),

  new Utility("p-inline-{first}-{second}", ({ first, second }) => ({
    "padding-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // padding block

  new Utility("p-block-s-{value}", ({ value }) => ({
    "padding-block-start": Value.parse(value),
  })),

  new Utility("p-block-e-{value}", ({ value }) => ({
    "padding-block-end": Value.parse(value),
  })),

  new Utility("p-block-{first}", ({ first }) => ({
    "padding-block": Value.parse(first),
  })),

  new Utility("p-block-{first}-{second}", ({ first, second }) => ({
    "padding-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // padding

  new Utility("p-{first}", ({ first }) => ({ padding: Value.parse(first) })),

  new Utility("p-{first}-{second}", ({ first, second }) => ({
    padding: `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("p-{first}-{second}-{third}", ({ first, second, third }) => ({
    padding: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
      third
    )}`,
  })),

  new Utility(
    "p-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      padding: `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)}`,
    })
  ),

  new Utility("pt-{value}", ({ value }) => ({
    "padding-top": Value.parse(value),
  })),

  new Utility("pb-{value}", ({ value }) => ({
    "padding-bottom": Value.parse(value),
  })),

  new Utility("pl-{value}", ({ value }) => ({
    "padding-left": Value.parse(value),
  })),

  new Utility("pr-{value}", ({ value }) => ({
    "padding-right": Value.parse(value),
  })),

  new Utility("px-{value}", ({ value }) => ({
    "padding-left": Value.parse(value),
    "padding-right": Value.parse(value),
  })),

  new Utility("py-{value}", ({ value }) => ({
    "padding-top": Value.parse(value),
    "padding-bottom": Value.parse(value),
  })),

  // width

  new Utility("w-{value}", ({ value }) => ({ width: Value.parse(value) })),

  // min width

  new Utility("min-w-{value}", ({ value }) => ({
    "min-width": Value.parse(value),
  })),

  // max width

  new Utility("max-w-{value}", ({ value }) => ({
    "max-width": Value.parse(value),
  })),

  // height

  new Utility("h-{value}", ({ value }) => ({ height: Value.parse(value) })),

  // min height

  new Utility("min-h-{value}", ({ value }) => ({
    "min-height": Value.parse(value),
  })),

  // max height

  new Utility("max-h-{value}", ({ value }) => ({
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

  new Utility("bg-attachment-{value}", ({ value }) => ({
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

  new Utility("bg-clip-{value}", ({ value }) => ({ "background-clip": value })),

  // background origin

  ...createUtilities(
    [
      ["bg-origin-border", "border-box"],
      ["bg-origin-padding", "padding-box"],
      ["bg-origin-content", "content-box"],
    ],
    "background-origin"
  ),

  new Utility("bg-origin-{value}", ({ value }) => ({
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

  new Utility("bg-position-{first}", ({ first }) => ({
    "background-position": Value.parse(first),
  })),

  new Utility("bg-position-{first}-{second}", ({ first, second }) => ({
    "background-position": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility(
    "bg-position-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "background-position": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)}`,
    })
  ),

  new Utility(
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

  new Utility("bg-repeat-{first}", ({ first }) => ({
    "background-repeat": first,
  })),

  new Utility("bg-repeat-{first}-{second}", ({ first, second }) => ({
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

  new Utility("bg-size-{first}", ({ first }) => ({
    "background-size": Value.parse(first),
  })),

  new Utility("bg-size-{first}-{second}", ({ first, second }) => ({
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

  new Utility("bg-image-{value}", ({ value }) => ({
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

  new Utility("border-collapse-{value}", ({ value }) => ({
    "border-collapse": value,
  })),

  // border spacing

  new Utility("border-spacing-{first}", ({ first }) => ({
    "border-spacing": Value.parse(first),
  })),

  new Utility("border-spacing-{first}-{second}", ({ first, second }) => ({
    "border-spacing": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // table layout

  new Utility("table-{value}", ({ value }) => ({ "table-layout": value })),

  // caption side

  new Utility("caption-{value}", ({ value }) => ({ "caption-side": value })),

  // border radius

  new Utility("rounded-t-{first}", ({ first }) => ({
    "border-top-left-radius": Value.parse(first),
    "border-top-right-radius": Value.parse(first),
  })),

  new Utility("rounded-t-{first}-{second}", ({ first, second }) => ({
    "border-top-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-top-right-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-b-{first}", ({ first }) => ({
    "border-bottom-left-radius": Value.parse(first),
    "border-bottom-right-radius": Value.parse(first),
  })),

  new Utility("rounded-b-{first}-{second}", ({ first, second }) => ({
    "border-bottom-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-bottom-right-radius": `${Value.parse(first)} ${Value.parse(
      second
    )}`,
  })),

  new Utility("rounded-r-{first}", ({ first }) => ({
    "border-top-right-radius": Value.parse(first),
    "border-bottom-right-radius": Value.parse(first),
  })),

  new Utility("rounded-r-{first}-{second}", ({ first, second }) => ({
    "border-top-right-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-bottom-right-radius": `${Value.parse(first)} ${Value.parse(
      second
    )}`,
  })),

  new Utility("rounded-l-{first}", ({ first }) => ({
    "border-top-left-radius": Value.parse(first),
    "border-bottom-left-radius": Value.parse(first),
  })),

  new Utility("rounded-l-{first}-{second}", ({ first, second }) => ({
    "border-top-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-bottom-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-tl-{first}", ({ first }) => ({
    "border-top-left-radius": Value.parse(first),
  })),

  new Utility("rounded-tl-{first}-{second}", ({ first, second }) => ({
    "border-top-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-tr-{first}", ({ first }) => ({
    "border-top-right-radius": Value.parse(first),
  })),

  new Utility("rounded-tr-{first}-{second}", ({ first, second }) => ({
    "border-top-right-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-bl-{first}", ({ first }) => ({
    "border-bottom-left-radius": Value.parse(first),
  })),

  new Utility("rounded-bl-{first}-{second}", ({ first, second }) => ({
    "border-bottom-left-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-br-{first}", ({ first }) => ({
    "border-bottom-right-radius": Value.parse(first),
  })),

  new Utility("rounded-br-{first}-{second}", ({ first, second }) => ({
    "border-bottom-right-radius": `${Value.parse(first)} ${Value.parse(
      second
    )}`,
  })),

  new Utility("rounded-s-{first}", ({ first }) => ({
    "border-start-start-radius": Value.parse(first),
    "border-start-end-radius": Value.parse(first),
  })),

  new Utility("rounded-s-{first}-{second}", ({ first, second }) => ({
    "border-start-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-start-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-e-{first}", ({ first }) => ({
    "border-end-start-radius": Value.parse(first),
    "border-end-end-radius": Value.parse(first),
  })),

  new Utility("rounded-e-{first}-{second}", ({ first, second }) => ({
    "border-end-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
    "border-end-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-ss-{first}", ({ first }) => ({
    "border-start-start-radius": Value.parse(first),
  })),

  new Utility("rounded-ss-{first}-{second}", ({ first, second }) => ({
    "border-start-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-se-{first}", ({ first }) => ({
    "border-start-end-radius": Value.parse(first),
  })),

  new Utility("rounded-se-{first}-{second}", ({ first, second }) => ({
    "border-start-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-es-{first}", ({ first }) => ({
    "border-end-start-radius": Value.parse(first),
  })),

  new Utility("rounded-es-{first}-{second}", ({ first, second }) => ({
    "border-end-start-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-ee-{first}", ({ first }) => ({
    "border-end-end-radius": Value.parse(first),
  })),

  new Utility("rounded-ee-{first}-{second}", ({ first, second }) => ({
    "border-end-end-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility("rounded-{first}", ({ first }) => ({
    "border-radius": Value.parse(first),
  })),

  new Utility("rounded-{first}-{second}", ({ first, second }) => ({
    "border-radius": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility(
    "rounded-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "border-radius": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)}`,
    })
  ),

  new Utility(
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

  new Utility("border-inline-s-style-{value}", ({ value }) => ({
    "border-inline-start-style": value,
  })),

  new Utility("border-inline-s-{value}", ({ value }) => ({
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

  new Utility("border-inline-e-style-{value}", ({ value }) => ({
    "border-inline-end-style": value,
  })),

  new Utility("border-inline-e-{value}", ({ value }) => ({
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

  new Utility("border-inline-style-{value}", ({ value }) => ({
    "border-inline-style": value,
  })),

  new Utility("border-inline-{value}", ({ value }) => ({
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

  new Utility("border-block-s-style-{value}", ({ value }) => ({
    "border-block-start-style": value,
  })),

  new Utility("border-block-s-{value}", ({ value }) => ({
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

  new Utility("border-block-e-style-{value}", ({ value }) => ({
    "border-block-end-style": value,
  })),

  new Utility("border-block-e-{value}", ({ value }) => ({
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

  new Utility("border-block-style-{value}", ({ value }) => ({
    "border-block-style": value,
  })),

  new Utility("border-block-{value}", ({ value }) => ({
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

  new Utility("border-x-style-{value}", ({ value }) => ({
    "border-left-style": value,
    "border-right-style": value,
  })),

  new Utility("border-x-{value}", ({ value }) => ({
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

  new Utility("border-y-style-{value}", ({ value }) => ({
    "border-top-style": value,
    "border-bottom-style": value,
  })),

  new Utility("border-y-{value}", ({ value }) => ({
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

  new Utility("border-t-style-{value}", ({ value }) => ({
    "border-top-style": value,
  })),

  new Utility("border-t-{value}", ({ value }) => ({
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

  new Utility("border-b-style-{value}", ({ value }) => ({
    "border-bottom-style": value,
  })),

  new Utility("border-b-{value}", ({ value }) => ({
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

  new Utility("border-l-style-{value}", ({ value }) => ({
    "border-left-style": value,
  })),

  new Utility("border-l-{value}", ({ value }) => ({
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

  new Utility("border-r-style-{value}", ({ value }) => ({
    "border-right-style": value,
  })),

  new Utility("border-r-{value}", ({ value }) => ({
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

  new Utility("border-style-{value}", ({ value }) => ({
    "border-style": value,
  })),

  new Utility("border-{value}", ({ value }) => ({
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

  new Utility("outline-style-{value}", ({ value }) => ({
    "outline-style": value,
  })),

  // outline offset

  new Utility("outline-offset-{value}", ({ value }) => ({
    "outline-offset": Value.parse(value),
  })),

  // outline width

  new Utility("outline-{value}", ({ value }) => ({
    "outline-width": Value.parse(value),
  })),

  // box shadow

  new Utility("box-shadow-{first}", ({ first }) => ({ "box-shadow": first })),

  new Utility("box-shadow-{first}-{second}", ({ first, second }) => ({
    "box-shadow": `${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-box-shadow-color)`,
  })),

  new Utility(
    "box-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "box-shadow": `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} var(--paletto-box-shadow-color)`,
    })
  ),

  new Utility(
    "box-shadow-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "box-shadow": `${Value.parse(first)} ${Value.parse(second)} ${Value.parse(
        third
      )} ${Value.parse(fourth)} var(--paletto-box-shadow-color)`,
    })
  ),

  new Utility(
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

  new Utility("opacity-{value}", ({ value }) => ({ opacity: value })),

  // mix blend mode

  new Utility("mix-blend-{value}", ({ value }) => ({
    "mix-blend-mode": value,
  })),

  // background blend mode

  new Utility("bg-blend-{value}", ({ value }) => ({
    "background-blend-mode": value,
  })),

  // filter

  new Utility("filter-{value}", ({ value }) => ({ filter: value })),

  // blur

  new Utility("blur-{value}", ({ value }) => ({
    filter: `blur(${Value.parse(value)})`,
  })),

  // brightness

  new Utility("brightness-{value}", ({ value }) => ({
    filter: `brightness(${value})`,
  })),

  // contrast

  new Utility("contrast-{value}", ({ value }) => ({
    filter: `contrast(${value})`,
  })),

  // drop shadow

  new Utility("drop-shadow-{first}-{second}", ({ first, second }) => ({
    filter: `drop-shadow(${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-drop-shadow-color))`,
  })),

  new Utility(
    "drop-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      filter: `drop-shadow(${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} var(--paletto-drop-shadow-color))`,
    })
  ),

  // grayscale

  new Utility("grayscale-{value}", ({ value }) => ({
    filter: `grayscale(${value})`,
  })),

  // hue rotate

  new Utility("hue-rotate-{value}", ({ value }) => ({
    filter: `hue-rotate(${value})`,
  })),

  // invert

  new Utility("invert-{value}", ({ value }) => ({
    filter: `invert(${value})`,
  })),

  // saturate

  new Utility("saturate-{value}", ({ value }) => ({
    filter: `saturate(${value})`,
  })),

  // sepia

  new Utility("sepia-{value}", ({ value }) => ({ filter: `sepia(${value})` })),

  // backdrop filter

  new Utility("backdrop-filter-{value}", ({ value }) => ({
    "backdrop-filter": value,
  })),

  // backdrop blur

  new Utility("backdrop-blur-{value}", ({ value }) => ({
    "backdrop-filter": `blur(${Value.parse(value)})`,
  })),

  // backdrop brightness

  new Utility("backdrop-brightness-{value}", ({ value }) => ({
    "backdrop-filter": `brightness(${value})`,
  })),

  // backdrop contrast

  new Utility("backdrop-contrast-{value}", ({ value }) => ({
    "backdrop-filter": `contrast(${value})`,
  })),

  // backdrop drop shadow

  new Utility("backdrop-drop-shadow-{first}-{second}", ({ first, second }) => ({
    "backdrop-filter": `drop-shadow(${Value.parse(first)} ${Value.parse(
      second
    )} var(--paletto-backdrop-drop-shadow-color))`,
  })),

  new Utility(
    "backdrop-drop-shadow-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "backdrop-filter": `drop-shadow(${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} var(--paletto-backdrop-drop-shadow-color))`,
    })
  ),

  // backdrop grayscale

  new Utility("backdrop-grayscale-{value}", ({ value }) => ({
    "backdrop-filter": `grayscale(${value})`,
  })),

  // backdrop hue rotate

  new Utility("backdrop-hue-rotate-{value}", ({ value }) => ({
    "backdrop-filter": `hue-rotate(${value})`,
  })),

  // backdrop invert

  new Utility("backdrop-invert-{value}", ({ value }) => ({
    "backdrop-filter": `invert(${value})`,
  })),

  // backdrop saturate

  new Utility("backdrop-saturate-{value}", ({ value }) => ({
    "backdrop-filter": `saturate(${value})`,
  })),

  // backdrop sepia

  new Utility("backdrop-sepia-{value}", ({ value }) => ({
    "backdrop-filter": `sepia(${value})`,
  })),

  // transition property

  new Utility("transition-property-{value}", ({ value }) => ({
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

  new Utility("transition-timing-{value}", ({ value }) => ({
    "transition-timing-function": value,
  })),

  // transition delay

  new Utility("transition-delay-{value}", ({ value }) => ({
    "transition-delay": value,
  })),

  // transition duration

  new Utility("transition-duration-{value}", ({ value }) => ({
    "transition-duration": value,
  })),

  // transition

  new Utility("transition-{first}", ({ first }) => ({ transition: first })),

  new Utility("transition-{first}-{second}", ({ first, second }) => ({
    transition: `${first} ${second}`,
  })),

  new Utility(
    "transition-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      transition: `${first} ${second} ${third}`,
    })
  ),

  new Utility(
    "transition-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      transition: `${first} ${second} ${third} ${fourth}`,
    })
  ),

  // animate

  new Utility("animate-spin", { animation: "spin 1s linear infinite" }),

  new Utility("animate-ping", {
    animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  }),

  new Utility("animate-pulse", {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  }),

  new Utility("animate-bounce", { animation: "bounce 1s infinite" }),

  // animation delay

  new Utility("animation-delay-{value}", ({ value }) => ({
    "animation-delay": value,
  })),

  // animation direction

  new Utility("animation-direction-{value}", ({ value }) => ({
    "animation-direction": value,
  })),

  // animation duration

  new Utility("animation-duration-{value}", ({ value }) => ({
    "animation-duration": value,
  })),

  // animation fill mode

  new Utility("animation-fill-{value}", ({ value }) => ({
    "animation-fill-mode": value,
  })),

  // animation iteration count

  new Utility("animation-iteration-{value}", ({ value }) => ({
    "animation-iteration-count": value,
  })),

  // animation name

  new Utility("animation-name-{value}", ({ value }) => ({
    "animation-name": value,
  })),

  // animation play state

  new Utility("animation-play-{value}", ({ value }) => ({
    "animation-play-state": value,
  })),

  // animation timeline

  new Utility("animation-timeline-{value}", ({ value }) => ({
    "animation-timeline": value,
  })),

  // animation timing

  new Utility("animation-timing-{value}", ({ value }) => ({
    "animation-timing-function": value,
  })),

  // animation

  new Utility("animation-{first}", ({ first }) => ({ animation: first })),

  new Utility("animation-{first}-{second}", ({ first, second }) => ({
    animation: `${first} ${second}`,
  })),

  new Utility(
    "animation-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      animation: `${first} ${second} ${third}`,
    })
  ),

  new Utility(
    "animation-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      animation: `${first} ${second} ${third} ${fourth}`,
    })
  ),

  new Utility(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}",
    ({ first, second, third, fourth, fifth }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth}`,
    })
  ),

  new Utility(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}",
    ({ first, second, third, fourth, fifth, sixth }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth} ${sixth}`,
    })
  ),

  new Utility(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}-{seventh}",
    ({ first, second, third, fourth, fifth, sixth, seventh }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth} ${sixth} ${seventh}`,
    })
  ),

  new Utility(
    "animation-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}-{seventh}-{eighth}",
    ({ first, second, third, fourth, fifth, sixth, seventh, eighth }) => ({
      animation: `${first} ${second} ${third} ${fourth} ${fifth} ${sixth} ${seventh} ${eighth}`,
    })
  ),

  new Utility(
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

  new Utility("transform-{value}", ({ value }) => ({ transform: value })),

  // transform origin

  new Utility("transform-origin-{first}", ({ first }) => ({
    "transform-origin": Value.parse(first),
  })),

  new Utility("transform-origin-{first}-{second}", ({ first, second }) => ({
    "transform-origin": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility(
    "transform-origin-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "transform-origin": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)}`,
    })
  ),

  // transform box

  new Utility("transform-box-{value}", ({ value }) => ({
    "transform-box": value,
  })),

  // transform style

  new Utility("transform-style-{value}", ({ value }) => ({
    "transform-style": value,
  })),

  // scale

  new Utility("scale-x-{value}", ({ value }) => ({
    transform: `scaleX(${value})`,
  })),

  new Utility("scale-y-{value}", ({ value }) => ({
    transform: `scaleY(${value})`,
  })),

  new Utility("scale-z-{value}", ({ value }) => ({
    transform: `scaleZ(${value})`,
  })),

  new Utility(
    "scale-3d-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      transform: `scale3d(${first}, ${second}, ${third})`,
    })
  ),

  new Utility("scale-{first}", ({ first }) => ({
    transform: `scale(${first})`,
  })),

  new Utility("scale-{first}-{second}", ({ first, second }) => ({
    transform: `scale(${first}, ${second})`,
  })),

  // rotate

  new Utility("rotate-x-{value}", ({ value }) => ({
    transform: `rotateX(${value})`,
  })),

  new Utility("rotate-y-{value}", ({ value }) => ({
    transform: `rotateY(${value})`,
  })),

  new Utility("rotate-z-{value}", ({ value }) => ({
    transform: `rotateZ(${value})`,
  })),

  new Utility(
    "rotate-3d-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      transform: `rotate3d(${first}, ${second}, ${third}, ${fourth})`,
    })
  ),

  new Utility("rotate-{value}", ({ value }) => ({
    transform: `rotate(${value})`,
  })),

  // translate

  new Utility("translate-x-{value}", ({ value }) => ({
    transform: `translateX(${Value.parse(value)})`,
  })),

  new Utility("translate-y-{value}", ({ value }) => ({
    transform: `translateY(${Value.parse(value)})`,
  })),

  new Utility("translate-z-{value}", ({ value }) => ({
    transform: `translateZ(${Value.parse(value)})`,
  })),

  new Utility(
    "translate-3d-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      transform: `translate3d(${Value.parse(first)}, ${Value.parse(
        second
      )}, ${Value.parse(third)})`,
    })
  ),

  new Utility("translate-{first}", ({ first }) => ({
    transform: `translate(${Value.parse(first)})`,
  })),

  new Utility("translate-{first}-{second}", ({ first, second }) => ({
    transform: `translate(${Value.parse(first)}, ${Value.parse(second)})`,
  })),

  // perspective

  new Utility("perspective-{value}", ({ value }) => ({
    transform: `perspective(${Value.parse(value)})`,
  })),

  // skew

  new Utility("skew-x-{value}", ({ value }) => ({
    transform: `skewX(${value})`,
  })),

  new Utility("skew-y-{value}", ({ value }) => ({
    transform: `skewY(${value})`,
  })),

  new Utility("skew-{first}", ({ first }) => ({
    transform: `skew(${first})`,
  })),

  new Utility("skew-{first}-{second}", ({ first, second }) => ({
    transform: `skew(${first}, ${second})`,
  })),

  // matrix

  new Utility(
    "matrix-3d-{a}-{b}-{c}-{d}-{e}-{f}-{g}-{h}-{i}-{j}-{k}-{l}-{m}-{n}-{o}-{p}",
    ({ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p }) => ({
      transform: `matrix3d(${a}, ${b}, ${c}, ${d}, ${e}, ${f}, ${g}, ${h}, ${i}, ${j}, ${k}, ${l}, ${m}, ${n}, ${o}, ${p})`,
    })
  ),

  new Utility(
    "matrix-{first}-{second}-{third}-{fourth}-{fifth}-{sixth}",
    ({ first, second, third, fourth, fifth, sixth }) => ({
      transform: `matrix(${first}, ${second}, ${third}, ${fourth}, ${fifth}, ${sixth})`,
    })
  ),

  // appearance

  new Utility("appearance-{value}", ({ value }) => ({ appearance: value })),

  // cursor

  new Utility("cursor-{value}", ({ value }) => ({ cursor: value })),

  // pointer events

  new Utility("pointer-events-{value}", ({ value }) => ({
    "pointer-events": value,
  })),

  // resize

  new Utility("resize-{value}", ({ value }) => ({ resize: value })),

  // scroll behavior

  new Utility("scroll-behavior-{value}", ({ value }) => ({
    "scroll-behavior": value,
  })),

  // scroll margin inline

  new Utility("scroll-m-inline-s-{value}", ({ value }) => ({
    "scroll-margin-inline-start": Value.parse(value),
  })),

  new Utility("scroll-m-inline-e-{value}", ({ value }) => ({
    "scroll-margin-inline-end": Value.parse(value),
  })),

  new Utility("scroll-m-inline-{first}", ({ first }) => ({
    "scroll-margin-inline": Value.parse(first),
  })),

  new Utility("scroll-m-inline-{first}-{second}", ({ first, second }) => ({
    "scroll-margin-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll margin block

  new Utility("scroll-m-block-s-{value}", ({ value }) => ({
    "scroll-margin-block-start": Value.parse(value),
  })),

  new Utility("scroll-m-block-e-{value}", ({ value }) => ({
    "scroll-margin-block-end": Value.parse(value),
  })),

  new Utility("scroll-m-block-{first}", ({ first }) => ({
    "scroll-margin-block": Value.parse(first),
  })),

  new Utility("scroll-m-block-{first}-{second}", ({ first, second }) => ({
    "scroll-margin-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll margin

  new Utility("scroll-m-{first}", ({ first }) => ({
    "scroll-margin": Value.parse(first),
  })),

  new Utility("scroll-m-{first}-{second}", ({ first, second }) => ({
    "scroll-margin": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility(
    "scroll-m-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "scroll-margin": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)}`,
    })
  ),

  new Utility(
    "scroll-m-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "scroll-margin": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} ${Value.parse(fourth)}`,
    })
  ),

  new Utility("scroll-mt-{value}", ({ value }) => ({
    "scroll-margin-top": Value.parse(value),
  })),

  new Utility("scroll-mb-{value}", ({ value }) => ({
    "scroll-margin-bottom": Value.parse(value),
  })),

  new Utility("scroll-ml-{value}", ({ value }) => ({
    "scroll-margin-left": Value.parse(value),
  })),

  new Utility("scroll-mr-{value}", ({ value }) => ({
    "scroll-margin-right": Value.parse(value),
  })),

  new Utility("scroll-mx-{value}", ({ value }) => ({
    "scroll-margin-left": Value.parse(value),
    "scroll-margin-right": Value.parse(value),
  })),

  new Utility("scroll-my-{value}", ({ value }) => ({
    "scroll-margin-top": Value.parse(value),
    "scroll-margin-bottom": Value.parse(value),
  })),

  // scroll padding inline

  new Utility("scroll-p-inline-s-{value}", ({ value }) => ({
    "scroll-padding-inline-start": Value.parse(value),
  })),

  new Utility("scroll-p-inline-e-{value}", ({ value }) => ({
    "scroll-padding-inline-end": Value.parse(value),
  })),

  new Utility("scroll-p-inline-{first}", ({ first }) => ({
    "scroll-padding-inline": Value.parse(first),
  })),

  new Utility("scroll-p-inline-{first}-{second}", ({ first, second }) => ({
    "scroll-padding-inline": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll padding block

  new Utility("scroll-p-block-s-{value}", ({ value }) => ({
    "scroll-padding-block-start": Value.parse(value),
  })),

  new Utility("scroll-p-block-e-{value}", ({ value }) => ({
    "scroll-padding-block-end": Value.parse(value),
  })),

  new Utility("scroll-p-block-{first}", ({ first }) => ({
    "scroll-padding-block": Value.parse(first),
  })),

  new Utility("scroll-p-block-{first}-{second}", ({ first, second }) => ({
    "scroll-padding-block": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  // scroll padding

  new Utility("scroll-p-{first}", ({ first }) => ({
    "scroll-padding": Value.parse(first),
  })),

  new Utility("scroll-p-{first}-{second}", ({ first, second }) => ({
    "scroll-padding": `${Value.parse(first)} ${Value.parse(second)}`,
  })),

  new Utility(
    "scroll-p-{first}-{second}-{third}",
    ({ first, second, third }) => ({
      "scroll-padding": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)}`,
    })
  ),

  new Utility(
    "scroll-p-{first}-{second}-{third}-{fourth}",
    ({ first, second, third, fourth }) => ({
      "scroll-padding": `${Value.parse(first)} ${Value.parse(
        second
      )} ${Value.parse(third)} ${Value.parse(fourth)}`,
    })
  ),

  new Utility("scroll-pt-{value}", ({ value }) => ({
    "scroll-padding-top": Value.parse(value),
  })),

  new Utility("scroll-pb-{value}", ({ value }) => ({
    "scroll-padding-bottom": Value.parse(value),
  })),

  new Utility("scroll-pl-{value}", ({ value }) => ({
    "scroll-padding-left": Value.parse(value),
  })),

  new Utility("scroll-pr-{value}", ({ value }) => ({
    "scroll-padding-right": Value.parse(value),
  })),

  new Utility("scroll-px-{value}", ({ value }) => ({
    "scroll-padding-left": Value.parse(value),
    "scroll-padding-right": Value.parse(value),
  })),

  new Utility("scroll-py-{value}", ({ value }) => ({
    "scroll-padding-top": Value.parse(value),
    "scroll-padding-bottom": Value.parse(value),
  })),

  // scroll snap align

  new Utility("scroll-align-{first}", ({ first }) => ({
    "scroll-snap-align": first,
  })),

  new Utility("scroll-align-{first}-{second}", ({ first, second }) => ({
    "scroll-snap-align": `${first} ${second}`,
  })),

  // scroll snap stop

  new Utility("scroll-stop-{value}", ({ value }) => ({
    "scroll-snap-stop": value,
  })),

  // scroll snap type

  new Utility("scroll-type-{first}", ({ first }) => ({
    "scroll-snap-type": first,
  })),

  new Utility("scroll-type-{first}-{second}", ({ first, second }) => ({
    "scroll-snap-type": `${first} ${second}`,
  })),

  // touch action

  new Utility("touch-action-{value}", ({ value }) => ({
    "touch-action": value,
  })),

  // user select

  new Utility("user-select-{value}", ({ value }) => ({ "user-select": value })),

  // will change

  new Utility("will-change-{value}", ({ value }) => ({ "will-change": value })),
];

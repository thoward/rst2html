# rst2html

A JavaScript library that renders reStructuredText to HTML.

It also uses Jest as unit testing.

## Testing

A Jest task is set up and configured to run the test case contained in
"lib/rst2html.rst.js":

```js
npm run test
```

## Building

You can build a minimized version of the RST2HTML module on your local machine
by invoking the webpack task. See "webpack.config.js" for configuration
details, but the build itself is straightforward:

```js
npm run build
```

## Installation

```js
npm install rst2html --save
```

## Documentation

The "docs" task will build documentation for this package and place it into the
"public" folder. This can then be opened in your local web browser by
double-clicking the "public/index.html" file.

```js
npm run docs
```

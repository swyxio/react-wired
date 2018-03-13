# react-wired

> react wired

[![NPM](https://img.shields.io/npm/v/react-wired.svg)](https://www.npmjs.com/package/react-wired) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-wired
```

## Usage

```jsx
import React, { Component } from "react";

import MyComponent from "react-wired";

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

## License

MIT © [sw-yx](https://github.com/sw-yx)

scaffolded with the amazing `create-react-library`: <https://hackernoon.com/publishing-baller-react-modules-2b039d84bce7>

## Other resources used

<https://stackoverflow.com/questions/41970342/whats-the-difference-between-this-and-this-in-polymer>

## notes for local development

```bash
# run example to start developing your new component against
npm link # the link commands are important for local development
# npm install # disregard any warnings about missing peer dependencies
npm start # runs rollup with watch flag

# (in another tab, run the example create-react-app)
cd example
npm link react-wired
# npm install
npm start # runs create-react-app hot-reload dev server
```

# Conversion TodoList

this list is from https://www.webcomponents.org/author/wiredjs

[x] checkbox
[x] button
[ ] slider
[ ] menu-bar
[ ] menu-item
[ ] icon-button (not doing this for now because iron-icon)
[x] textarea
[x] input
[ ] listbox
[x] toggle
[x] radio
[ ] radio-group
[ ] combo
[ ] card
[ ] item
[x] progress
[x] spinner

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

import {
  WiredButton,
  WiredInput,
  WiredRadio,
  WiredToggle,
  WiredTextArea,
  WiredProgress,
  WiredSpinner,
  WiredCheckBox
} from "react-wired";

export default class App extends Component {
  state = {
    toggle: true,
    value: "",
    counter: 0
  };
  toggleState = () => this.setState({ toggle: !this.state.toggle, counter: this.state.counter + 1 });
  handleChange = e => this.setState({ value: e.target.value });
  render() {
    const { toggle, value, counter } = this.state;
    return (
      <div>
        <ExampleComponent text="Wired.JS components in React" />
        <div>
          <WiredButton text="hello" elevation={1} onClick={() => alert("hi")} />
        </div>
        <div>
          <WiredButton text="world" elevation={2} onClick={this.toggleState} />
        </div>
        <div>
          <WiredButton
            text="this toggles the states below"
            elevation={3}
            disabled={toggle}
            onClick={() => alert("hi")}
          />
        </div>
        <div>
          <WiredInput placeholder="potato" disabled={toggle} onChange={e => console.log(e.target.value)} />
        </div>
        <div>
          <WiredRadio checked={toggle} onClick={this.toggleState} text="radio that works" />
        </div>
        <div>
          <WiredRadio checked={toggle} disabled onClick={this.toggleState} text="disabled radio " />
        </div>
        <div>
          <WiredToggle checked={toggle} onClick={this.toggleState} /> test
        </div>
        <div>
          <WiredToggle checked={toggle} disabled onClick={this.toggleState} /> test
        </div>
        <div>
          <WiredCheckBox checked={toggle} onClick={this.toggleState} text="text" />
        </div>
        <div>
          <WiredCheckBox checked={toggle} disabled onClick={this.toggleState} text="text" />
        </div>
        <div>
          <WiredSpinner active={toggle} />
          <WiredSpinner active={toggle} thickness={2} />
        </div>
        <div>
          <WiredTextArea placeholder="placeholder" value={value} onChange={this.handleChange} />
        </div>
        <div>
          <WiredTextArea placeholder="Enter text" rows="3" value={value} onChange={this.handleChange} />
        </div>
        <div>
          <WiredTextArea value={value} rows="2" disabled onChange={this.handleChange} />
        </div>
        <div>
          <WiredProgress max={100} min={0} progressLabel="%" value={counter} percentage />
        </div>
        <div>
          <WiredProgress max={100} min={0} progressLabel="%" value={counter} />
        </div>
      </div>
    );
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

* [x] checkbox
* [x] button
* [ ] slider
* [ ] menu-bar
* [ ] menu-item
* [ ] icon-button (not doing this for now because iron-icon)
* [x] textarea
* [x] input
* [ ] listbox
* [x] toggle
* [x] radio
* [ ] radio-group
* [ ] combo
* [ ] card
* [ ] item
* [x] progress
* [x] spinner

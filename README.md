# react-wired

> because your compnents look a little more human if they were hand drawn!

![like this](https://pbs.twimg.com/media/DYX7x-vWsAEhcTJ.jpg)

`react-wired` reimplements [wired-js](https://www.webcomponents.org/author/wiredjs) in pure React. This component library is in ACTIVE DEVELOPMENT and is seeking contribution help.

[![NPM](https://img.shields.io/npm/v/react-wired.svg)](https://www.npmjs.com/package/react-wired) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Known bugs:

* the slider is known to be buggy. for some reason it becomes somwhat unresponsive after the initial interaction. have to figure out what is wrong.

# Conversion TodoList

this list is from https://www.webcomponents.org/author/wiredjs - we need help on finishing off the rest. does not use react-polymer because i dont really know polymer

* [x] checkbox
* [x] button
* [x] slider
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

## Example Usage in your project

```bash
npm install --save react-wired
```

this code below generates the screenshot you saw above

```jsx
import React, { Component } from "react";

import ExampleComponent, {
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
      <div className="demoAppLayout">
        <ExampleComponent text="Wired.JS components in React" />
        <WiredButton text="hello" elevation={1} onClick={() => alert("hi")} />
        <WiredButton text="this toggles the states below" elevation={2} onClick={this.toggleState} />
        <WiredButton text="alerts 'hi' " elevation={3} disabled={toggle} onClick={() => alert("hi")} />
        <WiredInput placeholder="potato" disabled={toggle} onChange={e => console.log(e.target.value)} />
        <WiredRadio checked={toggle} onClick={this.toggleState} text="radio that works" />
        <WiredRadio checked={toggle} disabled onClick={this.toggleState} text="disabled radio " />
        <WiredToggle checked={toggle} onClick={this.toggleState} /> test
        <WiredToggle checked={toggle} disabled onClick={this.toggleState} /> test
        <WiredCheckBox checked={toggle} onClick={this.toggleState} text="text" />
        <WiredCheckBox checked={toggle} disabled onClick={this.toggleState} text="text" />
        <WiredSpinner active={toggle} />
        <WiredSpinner active={toggle} thickness={2} />
        <WiredTextArea placeholder="placeholder" value={value} onChange={this.handleChange} />
        <WiredTextArea placeholder="Enter text" rows="3" value={value} onChange={this.handleChange} />
        <WiredTextArea value={value} rows="2" disabled onChange={this.handleChange} />
        <WiredProgress max={50} min={0} progressLabel="%" value={counter} percentage />
        <WiredProgress max={100} min={0} progressLabel="potato" value={counter} />
      </div>
    );
  }
}
```

This exact code can be seen in this repo itself inside `/example` where there is a create-react-app instance that uses the local build of `react-wired` - see dev instructions

## Instructions for local development of this library

for publishing to npm, not for immediate use in other projects

```bash
# run example to start developing your new component against
npm link # the link commands are important for local development
# npm install # first time only; also, disregard any warnings about missing peer dependencies
npm start # runs rollup with watch flag

# (in another tab, run the example create-react-app)
cd example
npm link react-wired
# npm install # first time only
npm start # runs create-react-app hot-reload dev server
```

## License

MIT © [sw-yx](https://github.com/sw-yx)

scaffolded with the amazing `create-react-library`: <https://hackernoon.com/publishing-baller-react-modules-2b039d84bce7>

## Other resources used

<https://stackoverflow.com/questions/41970342/whats-the-difference-between-this-and-this-in-polymer>

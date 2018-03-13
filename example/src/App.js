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

import React, { Component } from "react";

import ExampleComponent, {
  WiredButton,
  WiredInput,
  WiredRadio,
  WiredToggle,
  WiredTextArea,
  WiredProgress,
  WiredSpinner,
  WiredCheckBox,
  WiredSlider
} from "react-wired";

export default class App extends Component {
  state = {
    toggle: true,
    value: "",
    counter: 0
  };
  toggleState = () => this.setState({ toggle: !this.state.toggle, counter: this.state.counter + 1 });
  handleChange = e => this.setState({ value: e.target.value });
  handleSlider = newValue => this.setState({ counter: newValue });
  render() {
    const { toggle, value, counter } = this.state;
    return (
      <div className="demoAppLayout">
        <ExampleComponent text="Wired.JS components in React" />
        <span />
        <WiredButton text="this toggles the states below" elevation={2} onClick={this.toggleState} />
        <WiredButton text="alerts 'hi' " elevation={3} disabled={toggle} onClick={() => alert("hi")} />
        <WiredInput placeholder="potato" disabled={toggle} onChange={e => console.log(e.target.value)} />
        <WiredRadio checked={toggle} onClick={this.toggleState} text="radio that works" />
        <WiredRadio checked={toggle} disabled onClick={this.toggleState} text="disabled radio " />
        <div>
          <WiredToggle checked={toggle} onClick={this.toggleState} /> test
        </div>
        <div>
          <WiredToggle checked={toggle} disabled onClick={this.toggleState} /> test
        </div>
        <WiredCheckBox checked={toggle} onClick={this.toggleState} text="text" />
        <WiredCheckBox checked={toggle} disabled onClick={this.toggleState} text="text" />
        <WiredSpinner active={toggle} />
        <WiredSpinner active={toggle} thickness={2} />
        TextArea
        <WiredTextArea placeholder="placeholder" value={value} onChange={this.handleChange} />
        <WiredTextArea placeholder="Enter text" rows="3" value={value} onChange={this.handleChange} />
        <WiredTextArea value={value} rows="2" disabled onChange={this.handleChange} />
        <WiredProgress max={50} min={0} progressLabel="%" value={counter} percentage />
        <WiredProgress max={100} min={0} progressLabel="potato" value={counter} />
        <WiredSlider min={1} max={50} value={counter} onChangeStart={console.log} onChange={this.handleSlider} />
        <WiredSlider min={1} max={50} value={counter} disabled />
      </div>
    );
  }
}

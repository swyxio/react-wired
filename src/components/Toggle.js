import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

const StyledDiv = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;

  .disabled {
    opacity: 0.4 !important;
    cursor: default;
    pointer-events: none;
  }
  .disabled svg {
    background: rgba(0, 0, 0, 0.07);
  }
  svg {
    display: block;
  }

  path {
    stroke: currentColor;
    stroke-width: 0.7;
    fill: transparent;
  }
  .unchecked {
    fill: var(--wired-toggle-off-color, gray);
  }
  .checked {
    fill: var(--wired-toggle-on-color, rgb(63, 81, 181));
  }
`;

export class Toggle extends React.Component {
  componentDidMount() {
    const { disabled, height = 32 } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
    const s = { width: height * 2.5, height: height };
    this.svg.setAttribute("width", s.width);
    this.svg.setAttribute("height", s.height);
    _WIRES_.rectangle(this.svg, 0, 0, s.width, s.height);
    this.knob = _WIRES_.ellipse(this.svg, s.height / 2, s.height / 2, s.height, s.height);
    this.knobOffset = s.width - s.height;
    this.knob.style.transition = "all 0.3s ease";
    this._updateKnob();
  }
  componentDidUpdate() {
    const { disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
    this._updateKnob();
  }

  _updateKnob() {
    this.knob.style.transform = this.props.checked ? "translateX(" + this.knobOffset + "px)" : "";
    const cl = this.knob.classList;
    if (this.props.checked) {
      cl.remove("unchecked");
      cl.add("checked");
    } else {
      cl.remove("checked");
      cl.add("unchecked");
    }
  }
  render() {
    const { onClick, disabled } = this.props;
    return (
      <StyledDiv innerRef={x => (this.me = x)} onClick={!disabled ? onClick : undefined}>
        <svg id="svg" ref={x => (this.svg = x)} />
      </StyledDiv>
    );
  }
}

export default Toggle;

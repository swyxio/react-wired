import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  padding: 5px;
  font-family: sans-serif;

  &:active path {
    transform: scale(0.97) translate(1.5%, 1.5%);
  }
  .disabled {
    opacity: 0.6 !important;
    cursor: default;
    pointer-events: none;
  }
  .disabled svg {
    background: rgba(0, 0, 0, 0.07);
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
  svg {
    display: block;
  }
  path {
    stroke: currentColor;
    stroke-width: 0.7;
    fill: transparent;
  }

  input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
`;

export class Input extends React.Component {
  componentDidMount() {
    const { elevation, disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
    var s = this.me.getBoundingClientRect();
    this.svg.setAttribute("width", s.width);
    this.svg.setAttribute("height", s.height);
    _WIRES_.rectangle(this.svg, 0, 0, s.width, s.height);
  }
  componentDidUpdate() {
    const { disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
  }
  render() {
    // const { text } = this.props;
    return (
      <StyledDiv innerRef={x => (this.me = x)}>
        <input ref={x => (this.span = x)} {...this.props} />
        <div className="overlay">
          <svg id="svg" ref={x => (this.svg = x)} />
        </div>
      </StyledDiv>
    );
  }
}

export default Input;

import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

const StyledDiv = styled.div`
  display: inline-block;
  font-family: inherit;
  cursor: pointer;
  padding: 8px 10px;
  position: relative;
  text-align: center;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  display: inline-flex;

  &:active path {
    transform: scale(0.97) translate(1.5%, 1.5%);
  }
  .disabled {
    opacity: 0.6 !important;
    background: rgba(0, 0, 0, 0.07);
    cursor: default;
    pointer-events: none;
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
    transition: transform 0.05s ease;
  }
`;

export class Button extends React.Component {
  componentDidMount() {
    const { elevation, disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
    var s = this.me.getBoundingClientRect();
    var elev = Math.min(Math.max(1, elevation), 5);
    var w = s.width + (elev - 1) * 2;
    var h = s.height + (elev - 1) * 2;
    this.svg.setAttribute("width", w);
    this.svg.setAttribute("height", h);
    _WIRES_.rectangle(this.svg, 0, 0, s.width, s.height);
    for (var i = 1; i < elev; i++) {
      _WIRES_.line(this.svg, i * 2, s.height + i * 2, s.width + i * 2, s.height + i * 2).style.opacity =
        (85 - i * 10) / 100;
      _WIRES_.line(this.svg, s.width + i * 2, s.height + i * 2, s.width + i * 2, i * 2).style.opacity =
        (85 - i * 10) / 100;
      _WIRES_.line(this.svg, i * 2, s.height + i * 2, s.width + i * 2, s.height + i * 2).style.opacity =
        (85 - i * 10) / 100;
      _WIRES_.line(this.svg, s.width + i * 2, s.height + i * 2, s.width + i * 2, i * 2).style.opacity =
        (85 - i * 10) / 100;
    }
  }
  componentDidUpdate() {
    const { disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
  }
  render() {
    const { text, onClick, disabled } = this.props;
    return (
      <StyledDiv innerRef={x => (this.me = x)} onClick={!disabled ? onClick : undefined}>
        <span ref={x => (this.span = x)}>{text}</span>
        <div className="overlay">
          <svg id="svg" ref={x => (this.svg = x)} />
        </div>
      </StyledDiv>
    );
  }
}

export default Button;

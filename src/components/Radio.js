import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

const StyledDiv = styled.div`
  display: block;
  font-family: inherit;

  .disabled {
    opacity: 0.45 !important;
    cursor: default;
    pointer-events: none;
  }

  #container {
    display: inline-block;
    white-space: nowrap;
  }
  .inline {
    display: inline-block;
    vertical-align: middle;
  }
  #checkPanel {
    cursor: pointer;
  }
  svg {
    display: block;
  }
  path {
    stroke: var(--wired-radio-icon-color, currentColor);
    stroke-width: 0.7;
    fill: transparent;
  }
  .filledPath {
    fill: var(--wired-radio-icon-color, currentColor);
  }
`;

export class Radio extends React.Component {
  componentDidMount() {
    const { disabled, iconSize = 24 } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");

    var s = { width: iconSize, height: iconSize };
    this.svg.setAttribute("width", s.width);
    this.svg.setAttribute("height", s.height);
    _WIRES_.ellipse(this.svg, s.width / 2, s.height / 2, s.width, s.height);
    const iw = Math.max(s.width * 0.6, 5);
    const ih = Math.max(s.height * 0.6, 5);
    const n = _WIRES_.ellipse(this.svg, s.width / 2, s.height / 2, iw, ih);
    n.classList.add("filledPath");
    this._dot = n;
    this._updateCheckVisibility();
  }
  componentDidUpdate() {
    const { disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
    this._updateCheckVisibility();
  }

  _updateCheckVisibility() {
    const { checked } = this.props;
    this._dot.style.display = checked ? "" : "none";
  }

  render() {
    const { text, onClick, disabled } = this.props;
    return (
      <StyledDiv id="container" innerRef={x => (this.me = x)} onClick={!disabled ? onClick : undefined}>
        <div className="inline" id="checkPanel">
          <svg id="svg" ref={x => (this.svg = x)} />
        </div>
        <div className="inline">{text}</div>
      </StyledDiv>
    );
  }
}

export default Radio;

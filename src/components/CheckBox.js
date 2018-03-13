import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

const StyledDiv = styled.div`
  display: block;
  font-family: inherit;

  .disabled {
    opacity: 0.6 !important;
    cursor: default;
    pointer-events: none;
  }

  .disabled svg {
    background: rgba(0, 0, 0, 0.07);
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
    stroke: var(--wired-checkbox-icon-color, currentColor);
    stroke-width: 0.7;
  }
`;

export class CheckBox extends React.Component {
  componentDidMount() {
    const { disabled, iconSize = 24 } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");

    var s = { width: iconSize, height: iconSize };
    this.svg.setAttribute("width", s.width);
    this.svg.setAttribute("height", s.height);
    _WIRES_.rectangle(this.svg, 0, 0, s.width, s.height);
    this._checkpaths = [];
    this._checkpaths.push(_WIRES_.line(this.svg, s.width * 0.3, s.height * 0.4, s.width * 0.5, s.height * 0.7));
    this._checkpaths.push(_WIRES_.line(this.svg, s.width * 0.5, s.height * 0.7, s.width + 5, -5));
    this._checkpaths.forEach(d => {
      d.style.strokeWidth = 2.5;
    });
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
    if (checked) {
      this._checkpaths.forEach(d => {
        d.style.display = "";
      });
    } else {
      this._checkpaths.forEach(d => {
        d.style.display = "none";
      });
    }
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

export default CheckBox;

import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 0;
  line-height: 1;
  width: 42px;
  height: 42px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box !important;
  color: #5c81f9;

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
    fill: currentColor;
  }
`;

export class Spinner extends React.Component {
  componentDidMount() {
    this._relayout();
    this._onActiveChange();
  }
  componentDidUpdate() {
    this._relayout();
    this._onActiveChange();
  }

  _clearNode(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }
  _relayout() {
    const { thickness = 6 } = this.props;
    this._clearNode(this.svg);
    var s = this.me.getBoundingClientRect();
    this.svg.setAttribute("width", s.width);
    this.svg.setAttribute("height", s.height);
    var center = [s.width / 2, s.height / 2];
    var orad = Math.min(s.width / 2, s.height / 2) - 2;
    var irad = orad - thickness;
    var points = [];
    var radMax = 1.5 * Math.PI;
    var radSegment = radMax / 8;
    var first = [];
    for (var i = 0; i < 9; i++) {
      let x = center[0] + orad * Math.cos(radSegment * i);
      let y = center[1] + orad * Math.sin(radSegment * i);
      x = _WIRES_._getOffset(x - 1, x + 1);
      y = _WIRES_._getOffset(y - 1, y + 1);
      points.push([x, y]);
      first.push([x, y]);
    }
    for (var i = 0; i < 9; i++) {
      let x = center[0] + irad * Math.cos(radMax - radSegment * i);
      let y = center[1] + irad * Math.sin(radMax - radSegment * i);
      x = _WIRES_._getOffset(x - 1, x + 1);
      y = _WIRES_._getOffset(y - 1, y + 1);
      points.push([x, y]);
    }
    for (var i = 0; i < 2; i++) {
      points.push([first[i][0], first[i][1]]);
    }
    var wpath = _WIRES_._curve(points);
    var pnode = _WIRES_._svgNode("path", { d: wpath.value });
    this.svg.appendChild(pnode);
  }

  _onActiveChange() {
    if (this.props.active) {
      if (!this._spinning) {
        this._spinning = true;
        this._spinStart = 0;
        var _step = timestamp => {
          if (!this._spinning) {
            this._spinStart = 0;
            return;
          }
          if (!this._spinStart) {
            this._spinStart = timestamp;
          }
          var progress = (timestamp - this._spinStart) / 1500;
          this.overlay.style.transform = "rotate(" + 360 * progress + "deg)";
          if (progress >= 1) {
            this._spinStart = 0;
          }
          requestAnimationFrame(_step);
        };
        requestAnimationFrame(_step);
      }
    } else {
      if (this._spinning) {
        this._spinning = false;
      }
    }
  }
  render() {
    // const { onClick, disabled } = this.props;
    return (
      <StyledDiv innerRef={x => (this.me = x)}>
        <div className="overlay" ref={x => (this.overlay = x)}>
          <svg id="svg" ref={x => (this.svg = x)} />
        </div>
      </StyledDiv>
    );
  }
}

export default Spinner;

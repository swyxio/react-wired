import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 400px;
  height: 42px;
  font-family: sans-serif;

  svg {
    display: block;
  }
  path {
    stroke: currentColor;
    stroke-width: 0.7;
    fill: transparent;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
  .labelContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .progressLabel {
    color: var(--wired-progress-label-color, #000);
    font-size: var(--wired-progress-font-size, 18px);
  }
  .progbox {
    fill: var(--wired-progress-color, rgba(0, 0, 200, 0.1));
    stroke-opacity: 0.6;
    stroke-width: 0.4;
  }
`;

export class Progress extends React.Component {
  componentDidMount() {
    // const { elevation, disabled } = this.props;
    this.relayout();
  }

  relayout() {
    this._clearNode(this.svg);
    var s = this.me.getBoundingClientRect();
    this.svg.setAttribute("width", s.width);
    this.svg.setAttribute("height", s.height);
    _WIRES_.rectangle(this.svg, 0, 0, s.width, s.height);
    let pct = 0;

    const { max, min, value } = this.props;
    if (max > min) {
      pct = (value - min) / (max - min);
      const progWidth = s.width * Math.max(0, Math.min(pct, 100));
      const progBox = _WIRES_.polygon(this.svg, [[0, 0], [progWidth, 0], [progWidth, s.height], [0, s.height]]);
      progBox.classList.add("progbox");
    }
  }

  _clearNode(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }

  componentDidUpdate() {
    this.relayout();
  }
  render() {
    let { percentage, max, min, progressLabel, value } = this.props;

    // implement the percentage logic somehow
    if (percentage) {
      if (max == min) {
        progressLabel = "%";
      } else {
        var pct = Math.floor((value - min) / (max - min) * 100);
        // console.log("pct", this.value - this.min);
        progressLabel = pct + "%";
      }
    } else {
      progressLabel = value;
    }
    // end weird percentage logic

    return (
      <StyledDiv innerRef={x => (this.me = x)}>
        <div className="overlay">
          <svg id="svg" ref={x => (this.svg = x)} />
        </div>
        <div className="overlay labelContainer">
          <div className="progressLabel">{progressLabel}</div>
        </div>
      </StyledDiv>
    );
  }
}

export default Progress;

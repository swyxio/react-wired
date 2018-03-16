import React from "react";
import styled from "styled-components";
import RangeSlider from "react-rangeslider";

import { _WIRES_ } from "../wired-lib";

// this slider is known to be buggy. for some reason it becomes somwhat unresponsive after the initial interaction. have to figure out what is wrong.

const WrapperDiv = styled.div`
  .rangeslider {
    margin: 20px 0;
    position: relative;
    background: #e6e6e6;
    -ms-touch-action: none;
    touch-action: none;
  }
  .rangeslider,
  .rangeslider .rangeslider__fill {
    display: block;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .rangeslider .rangeslider__handle {
    background: rgba(0, 0, 0, 0);
    border: 1px solid #ccc;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 -1px 3px rgba(0, 0, 0, 0.4);
  }
  .rangeslider .rangeslider__handle .rangeslider__active {
    opacity: 1;
  }
  .rangeslider .rangeslider__handle-tooltip {
    width: 40px;
    height: 40px;
    text-align: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    font-size: 14px;
    transition: all 0.1s ease-in;
    border-radius: 4px;
    display: inline-block;
    color: #fff;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  .rangeslider .rangeslider__handle-tooltip span {
    margin-top: 12px;
    display: inline-block;
    line-height: 100%;
  }
  .rangeslider .rangeslider__handle-tooltip:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
  }

  // begin imporeted stuff
  display: inline-block;
  position: relative;
  width: 300px;
  height: 40px;
  box-sizing: border-box;

  .disabled {
    opacity: 0.45 !important;
    cursor: default;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.07);
    border-radius: 5px;
  }
  .disabled .knob {
    pointer-events: none !important;
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
    stroke-width: 0.7;
    fill: transparent;
  }
  .knob {
    pointer-events: auto;
    fill: var(--wired-slider-knob-zero-color, gray);
    stroke: var(--wired-slider-knob-zero-color, gray);
    transition: transform 0.15s ease;
    cursor: pointer;
  }
  .hasValue {
    fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
    stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
  }
  .bar {
    stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
  }
  .expanded {
    transform: scale(1.3) translate(-15%, -15%);
  }
`;
const StyledRangeSlider = styled(RangeSlider)`
  background-color: red;
`;

export class Slider extends React.Component {
  // componentDidMount() {
  //   console.log("sldkjl", this.me);
  //   // this.me.classList.add("overlay");
  // }
  componentDidMount() {
    console.log("sldkjl", this.rangeslider);
    this.disabled = this.props.disabled;
    this.min = this.props.min;
    this.value = this.props.value;
    this.max = this.props.max;
    this.knobRadius = this.props.knobRadius || 10;
    this.relayout();
    // const { onChange, onChangeStart, onChangeComplete, value, min, max } = this.props;
    this._knob.addEventListener("touchmove", event => {
      // const newValue = this.rangeslider.getValueFromPosition(this.rangeslider.position(event));
      console.log("touchmove");
      if (!this.disabled) this.rangeslider.handleDrag(event);
    });
    this._knob.addEventListener("mousedown", event => {
      console.log("mousedown");
      if (!this.disabled) this.rangeslider.handleStart(event);
    });
    this._knob.addEventListener("touchend", event => {
      console.log("touchend");
      if (!this.disabled) this.rangeslider.handleEnd(event);
    });
    this._knob.addEventListener("keydown", event => {
      console.log("keydown");
      if (!this.disabled) this.rangeslider.handleKeyDown(event);
    });

    this.me.addEventListener("mouseup", event => {
      console.log("mouseup");
      if (!this.disabled) this.rangeslider.handleEnd(event);
    });

    this.me.addEventListener("touchstart", event => {
      console.log("touchstart");
      if (!this.disabled) this.rangeslider.handleStart(event);
    });
  }

  relayout() {
    // if (this.disabled) this.svg.classList.add("disabled");
    // else this.svg.classList.remove("disabled");
    this._clearNode(this.svg);
    var s = this.me.getBoundingClientRect();
    this.svg.setAttribute("width", s.width);
    this.svg.setAttribute("height", s.height);
    let radius = this.knobRadius || 10;
    this._barWidth = s.width - 2 * radius;
    this._bar = _WIRES_.line(this.svg, radius, s.height / 2, s.width - radius, s.height / 2);
    this._bar.classList.add("bar");
    this._knobGroup = _WIRES_._svgNode("g");
    this.svg.appendChild(this._knobGroup);
    this._knob = _WIRES_.ellipse(this._knobGroup, radius, s.height / 2, radius * 2, radius * 2);
    this._knob.classList.add("knob");
    this._onValueChange();
  }

  _clearNode(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }

  _onValueChange() {
    if (!this._knob) {
      return;
    }
    let pct = 0;
    if (this.max > this.min) {
      pct = Math.min(1, Math.max((this.value - this.min) / (this.max - this.min), 0));
    }
    this._pct = pct;
    if (pct) {
      this._knob.classList.add("hasValue");
    } else {
      this._knob.classList.remove("hasValue");
    }
    let knobOffset = pct * this._barWidth;
    this._knobGroup.style.transform = "translateX(" + Math.round(knobOffset) + "px)";
  }

  componentDidUpdate() {
    this.disabled = this.props.disabled;
    this.min = this.props.min;
    this.value = this.props.value;
    this.max = this.props.max;
    this.knobRadius = this.props.knobRadius || 10;
    this.relayout();
  }
  render() {
    const { onChange, onChangeStart, onChangeComplete, value, min, max } = this.props;
    return (
      <WrapperDiv>
        <div className="overlay" ref={x => (this.me = x)}>
          <svg id="svg" ref={x => (this.svg = x)} />
        </div>
        <StyledRangeSlider
          min={min}
          max={max}
          value={value}
          onChangeStart={onChangeStart}
          onChange={onChange}
          onChangeComplete={onChangeComplete}
          innerRef={x => (this.rangeslider = x)}
        />
      </WrapperDiv>
    );
  }
}

export default Slider;

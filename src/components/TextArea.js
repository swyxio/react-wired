import React from "react";
import styled from "styled-components";

import { _WIRES_ } from "../wired-lib";

// https://github.com/wiredjs/wired-textarea/blob/master/wired-textarea.html
const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  padding: 5px;
  font-family: sans-serif;
  width: 400px;
  -moz-appearance: textarea;
  -webkit-appearance: textarea;

  .disabled {
    opacity: 0.6 !important;
    cursor: default;
    pointer-events: none;
  }
  .disabled svg {
    background: rgba(0, 0, 0, 0.07);
  }

  .fit {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .overlay {
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
  .mirror-text {
    visibility: hidden;
    word-wrap: break-word;
  }
  textarea {
    position: relative;
    outline: none;
    border: none;
    resize: none;
    background: inherit;
    color: inherit;
    width: 100%;
    height: 100%;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    text-align: inherit;
    padding: 5px;
  }
`;

export class TextArea extends React.Component {
  componentDidMount() {
    const { disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
    this._relayout();
    this._valueChanged();
  }

  _needsLayout() {
    var s = this.me.getBoundingClientRect();
    if (s.height != this._prevHeight) {
      this._relayout();
    }
  }

  _relayout() {
    this._clearNode(this.svg);
    var s = this.me.getBoundingClientRect();
    this.svg.setAttribute("width", s.width + 5);
    this.svg.setAttribute("height", s.height);
    _WIRES_.rectangle(this.svg, 0, 0, s.width + 5, s.height);
  }

  _clearNode(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }

  _constrain(tokens) {
    const { maxRows, rows } = this.props;
    var _tokens;
    tokens = tokens || [""];
    if (maxRows > 0 && tokens.length > maxRows) {
      _tokens = tokens.slice(0, maxRows);
    } else {
      _tokens = tokens.slice(0);
    }
    while (rows > 0 && _tokens.length < rows) {
      _tokens.push("");
    }
    return _tokens.join("<br/>") + "&#160;";
  }

  _valueChanged = value => {
    // var textarea = this.textarea;
    // if (!textarea) {
    //   return;
    // }
    // if (textarea.value !== value) {
    //   textarea.value = !(value || value === 0) ? '' : value;
    // }
    this.mirror.innerHTML = this._valueForMirror();
    setTimeout(() => {
      this._needsLayout();
    }, 10);
  };
  _valueForMirror() {
    var input = this.textarea;
    if (!input) {
      return;
    }
    this.tokens =
      input && input.value
        ? input.value
            .replace(/&/gm, "&amp;")
            .replace(/"/gm, "&quot;")
            .replace(/'/gm, "&#39;")
            .replace(/</gm, "&lt;")
            .replace(/>/gm, "&gt;")
            .split("\n")
        : [""];
    return this._constrain(this.tokens);
  }
  _updateCached() {
    this.mirror.innerHTML = this._constrain(this.tokens);
  }
  componentDidUpdate() {
    const { disabled } = this.props;
    if (disabled) this.svg.classList.add("disabled");
    else this.svg.classList.remove("disabled");
    this._valueChanged();
  }
  render() {
    return (
      <StyledDiv innerRef={x => (this.me = x)}>
        <div id="mirror" className="mirror-text" ref={x => (this.mirror = x)}>
          &#160;
        </div>
        <div className="fit">
          <textarea id="textarea" {...this.props} ref={x => (this.textarea = x)} />
        </div>
        <div className="fit overlay">
          <svg id="svg" ref={x => (this.svg = x)} />
        </div>
      </StyledDiv>
    );
  }
}

export default TextArea;

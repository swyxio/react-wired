/**
 * @class ExampleComponent
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

// https://stackoverflow.com/questions/41993445/exporting-a-function-on-typescript-declaration-or-statement-expected
import Button from "./components/Button";
export const WiredButton = Button;
import Input from "./components/Input";
export const WiredInput = Input;
import Radio from "./components/Radio";
export const WiredRadio = Radio;
import Toggle from "./components/Toggle";
export const WiredToggle = Toggle;
import TextArea from "./components/TextArea";
export const WiredTextArea = TextArea;
import Progress from "./components/Progress";
export const WiredProgress = Progress;
import Spinner from "./components/Spinner";
export const WiredSpinner = Spinner;
import CheckBox from "./components/CheckBox";
export const WiredCheckBox = CheckBox;

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const { text } = this.props;

    return <div className={styles.test}>Example Component: {text}</div>;
  }
}

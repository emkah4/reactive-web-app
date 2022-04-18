import React, { useState } from "react";

import RangeSlider from "react-bootstrap-range-slider";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SliderWithInputFormControl = (props) => {
  return (
    <Form.Group className="mb-3" as={Row}>
      <Form.Label style={{ textAlign: "left", font: "bold" }} column sm="3">
        {props.children}
      </Form.Label>
      <Col sm="1" className="border border-black my-auto" style={{ font: "bold"}}>
        {props.durationValue} minutes
      </Col>
      <Col sm="8">
        <RangeSlider
          min={120}
          max={720}
          step={10}
          value={props.durationValue}
          onChange={props.onDurationChange}
          onAfterChange={props.onFinalDurationChange}
        />
      </Col>
    </Form.Group>
  );
};

export default SliderWithInputFormControl;

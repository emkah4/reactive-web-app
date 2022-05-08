import React from "react";
import ReactDOM from "react-dom";

// Components bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import RichTextEditor from "../../RichTextEditor/RichTextEditor"

const EventEditPopup = (props) => {
  return ReactDOM.createPortal(
    <React.Fragment>
      <Modal show={props.show} onHide={props.onClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{props.title} {props.event_id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="textareaForm">
            <RichTextEditor id={props.event_id}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageForm">
            <Form.Label>Attatch an image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="groupSelectForm">
            <Form.Label>Select groups participating</Form.Label>
            {props.groups.map((group) => (
              <Form key={group.id}>
                <Form.Check
                  label={`${group.group_name}`}
                  type="switch"
                  id={group.group_id}
                />
              </Form>
            ))}
          </Form.Group>

          {/* <Form.Label>Set length of the task</Form.Label>
          <InputGroup className="mb-3" controlId="lengthInput">
            <FormControl />
            <InputGroup.Text>hours</InputGroup.Text>
            <FormControl />
            <InputGroup.Text>minutes</InputGroup.Text>
          </InputGroup> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.onClose}>
            Discard
          </Button>
          <Button variant="outline-success" onClick={props.onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>,
    document.getElementById("overlay-root")
  );
};

export default EventEditPopup;

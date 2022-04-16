import ReactDOM from "react-dom";
import React from 'react'

// Components bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"

const AddPeoplePopup = (props) => {
    return ReactDOM.createPortal(
        <React.Fragment>
          <Modal show={props.show} onHide={props.onClose} backdrop="static">
            <Modal.Header>
              <Modal.Title>Add people to department!</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Group's name"
                    // value={newTeam}
                    // onChange={onSetNewTeamName}
                />
                <Button
                    variant="outline-success"
                    id="button-addon2"
                    // onClick={onAddNewTeam}
                >
                    Add a person to the group
                </Button>
                </InputGroup>
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
    )
}

export default AddPeoplePopup
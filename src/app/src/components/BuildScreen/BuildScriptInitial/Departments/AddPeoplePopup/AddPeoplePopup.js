import ReactDOM from "react-dom";
import React, { useState } from 'react'

import styles from "./AddPeoplePopup.module.css"

// Components bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"

const AddPeoplePopup = (props) => {

    const [newMember, setNewMember] = useState('');

    let peopleList = props.data.dept_people;

    const onAddNewMember = () => {
      peopleList.push(newMember);
    }

    return ReactDOM.createPortal(
        <React.Fragment>
          <Modal show={props.show} onHide={props.onClose} backdrop="static">
            <Modal.Header>
              <Modal.Title>Add members of team "{props.data.dept_name}"</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Name"
                    value={newMember}
                    onChange={e => setNewMember(e.target.value)}
                />
                <Button
                    variant="outline-success"
                    id="button-addon2"
                    onClick={onAddNewMember}
                >
                    Add a person to the group
                </Button>
                </InputGroup>
                <div className={styles.people}></div>
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
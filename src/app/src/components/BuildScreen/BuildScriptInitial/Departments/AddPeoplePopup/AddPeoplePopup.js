import ReactDOM from "react-dom";
import React, { useState } from "react";

import styles from "./AddPeoplePopup.module.css";

// Components bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AddPeoplePopup = (props) => {
  const membersList = props.data.group_members;

  const [newMember, setNewMember] = useState(""); // NEW MEMBER FROM INPUT
  const [members, setMembers] = useState(membersList); // LIST OF ALL PEOPLE
  const [newPeople, setNewPeople] = useState([]); // LIST OF NEWLY ADDED PEOPLE

  const onAddNewMember = () => {
    if (!newMember == "") {
      setNewMember("");
      setMembers((prevMembers) => {
        return [...prevMembers, newMember]; // we set the full list of people for display purposes
      });
      setNewPeople((prevMembers) => {
        return [...prevMembers, newMember]; // we set only the new people added to be pushed via handlePeopleData function
      });
    }
  };

  const handlePeopleData = () => {
    newPeople.forEach((element) => {
      props.data.group_members.push(element);
    });
  };

  function handleEnterSubmit(target) {
    if (target.charCode == 13) {
      onAddNewMember();
    }
  }

  return ReactDOM.createPortal(
    <React.Fragment>
      <Modal show={props.show} onHide={props.onClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>
            Add members to the{" "}
            <b>
              <i>{props.data.group_title}</i>
            </b>{" "}
            team!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Name"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              onKeyPress={handleEnterSubmit}
            />
            <Button
              variant="outline-success"
              id="button-addon2"
              onClick={onAddNewMember}
            >
              Add a person to the group
            </Button>
          </InputGroup>
          <div className={styles.people}>
            {members.map((member) => (
              <p className={styles.person} key={Math.random().toString()}>
                {member}
              </p>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.onClose}>
            Discard
          </Button>
          <Button
            variant="outline-success"
            onClick={() => {
              props.onClose();
              handlePeopleData();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>,
    document.getElementById("overlay-root")
  );
};

export default AddPeoplePopup;

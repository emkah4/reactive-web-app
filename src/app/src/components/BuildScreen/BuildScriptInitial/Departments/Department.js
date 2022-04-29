import React, { useState } from "react";
import styles from "./Department.module.css";
import AddPeoplePopup from "./AddPeoplePopup/AddPeoplePopup";
import ListGroup from "react-bootstrap/ListGroup";

const Departments = (props) => {
  const listOfPeople = props.data.dept_people;
  const [showModal, setShowModal] = useState(false);
  const [membersList, setMembersList] = useState(listOfPeople);

  const handleModalShow = (event) => {
    setShowModal(true);
    console.log("Show " + showModal);
  };

  const handleModalClose = () => {
    setShowModal(false);
    console.log("Close");
  };

  return (
    <React.Fragment>
      <ListGroup.Item key={props.data.dept_id} action onClick={handleModalShow}>
        <h3>{props.data.dept_name}</h3>
        {membersList.length === 0 && (
          <small>No members yet, click to add!</small>
        )}
      </ListGroup.Item>

      {showModal && (
        <AddPeoplePopup
          show={showModal}
          onClose={handleModalClose}
          data={props.data}
        ></AddPeoplePopup>
      )}
    </React.Fragment>
  );
};

export default Departments;

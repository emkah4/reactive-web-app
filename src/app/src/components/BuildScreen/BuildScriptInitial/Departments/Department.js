import React, { useState } from "react";
import AddPeoplePopup from "./AddPeoplePopup/AddPeoplePopup";
import ListGroup from "react-bootstrap/ListGroup";

const Departments = (props) => {
  const listOfPeople = props.data.group_members;
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = (event) => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <ListGroup.Item key={Math.random()} action onClick={handleModalShow}>
        <h3>{props.data.group_title}</h3>
        {listOfPeople.length === 0 && (
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

import React, { useState } from 'react'
import styles from './Department.module.css'
import AddPeoplePopup from './AddPeoplePopup/AddPeoplePopup'

const Departments = (props) => {

  const [showModal, setShowModal] = useState(false);

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
      <div className={styles.container} onClick={handleModalShow}>
        {props.data.dept_name}
      </div>
      
      {showModal && (
        <AddPeoplePopup
          show={showModal}
          onClose={handleModalClose}
          data={props.data}
        ></AddPeoplePopup>
      )}
    </React.Fragment>
  );
}

export default Departments
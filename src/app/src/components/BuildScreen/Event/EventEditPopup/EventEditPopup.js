import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Styles
import styles from "./EventEditPopup.module.css";

// Components bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import { Spinner } from "react-bootstrap";

// Axios Private
import useAxiosPrivate from "../../../../shared/hooks/useAxiosPrivate";

// Constants
const EDIT_EVENT_URL = "/events/edit_event";
const GET_EVENT_DATA_URL = "/events/get_event/";

const EventEditPopup = (props) => {
  // Axios private
  const axiosPrivate = useAxiosPrivate();
  // Data about inputs
  const [eventData, setEventData] = useState({});
  const [dataPresent, setDataPresent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchedEventContent, setFetchedEventContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const compiled_url = GET_EVENT_DATA_URL + props.event_id;
      try {
        const response = await axiosPrivate.get(compiled_url);
        if (response) {
          setFetchedEventContent(response.data.event.event_text);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Function for saving rich text
  const saveRichText = (value) => {
    setEventData({
      event_id: parseInt(props.event_id),
      property_key: "event_text",
      property_value: value,
    });
    if (value) {
      setDataPresent(true);
    } else {
      setDataPresent(false);
    }
  };

  // Function for handling data submition to database
  const onDataSubmit = async () => {
    setLoading(true);
    const response = await axiosPrivate.patch(
      EDIT_EVENT_URL,
      JSON.stringify(eventData)
    );
    const data = await response.data;
    const timeout = setTimeout(() => {
      setLoading(false);
      props.onClose();
    }, 3000);
    clearTimeout(timeout);
    props.onClose();
  };
  return ReactDOM.createPortal(
    <React.Fragment>
      <Modal show={props.show} onHide={props.onClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        {loading ? (
          <Modal.Body className={styles.loadingBody}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Form.Group className="mb-3" controlId="textareaForm">
              <RichTextEditor
                id={props.event_id}
                onTextSave={saveRichText}
                content={fetchedEventContent}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageForm" disabled>
              <Form.Label>Attatch an image</Form.Label>
              <Form.Control type="file" disabled />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="groupSelectForm">
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
          </Form.Group> */}

            {/* <Form.Label>Set length of the task</Form.Label>
          <InputGroup className="mb-3" controlId="lengthInput">
            <FormControl />
            <InputGroup.Text>hours</InputGroup.Text>
            <FormControl />
            <InputGroup.Text>minutes</InputGroup.Text>
          </InputGroup> */}
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.onClose}>
            Discard
          </Button>
          <Button
            variant="outline-success"
            onClick={onDataSubmit}
            disabled={!dataPresent}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>,
    document.getElementById("overlay-root")
  );
};

export default EventEditPopup;

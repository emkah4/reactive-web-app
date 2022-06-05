import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Axios
import { axiosDownload } from "../../../../api/axios";

// Styles
import styles from "./EventEditPopup.module.css";

// Components bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import { Spinner, Alert } from "react-bootstrap";

// Axios Private
import useAxiosPrivate from "../../../../shared/hooks/useAxiosPrivate";

// Constants
const EDIT_EVENT_URL = "/events/edit_event";
const GET_EVENT_DATA_URL = "/events/get_event/";
const FILE_UPLOAD_URL = "/events/file_upload";
const ALLOWED_DATA_TYPES = [
  "image/png",
  "image/jpeg",
  "application/x-sh",
  "text/plain",
];

const EventEditPopup = (props) => {
  // Axios private
  const axiosPrivate = useAxiosPrivate();
  // Data about inputs
  const [eventData, setEventData] = useState({});
  const [eventFile, setEventFile] = useState(null);
  const [eventFileError, setEventFileError] = useState(null);
  const [dataPresent, setDataPresent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchedEventContent, setFetchedEventContent] = useState(null);
  const [fetchedFile, setFetchedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const compiled_url = GET_EVENT_DATA_URL + props.event_id;
      try {
        const response = await axiosPrivate.get(compiled_url);
        if (response) {
          setFetchedEventContent(response.data.event.event_text);
          console.log(response);
          if (response.data.event?.filename) {
            setFetchedFile(response.data.event);
          }
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
    if (data?.id !== null && eventFile !== null) {
      let formData = new FormData();
      formData.append("eventFile", eventFile);
      formData.append("event_id", props.event_id);
      const fileUploadResponse = await axiosPrivate.post(
        FILE_UPLOAD_URL,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const soutData = await fileUploadResponse;
    }
    const timeout = setTimeout(() => {
      setLoading(false);
      props.onClose();
    }, 500);
  };

  const handleFileUpload = (event) => {
    setEventFileError(null);
    if (event.target.files[0].size > 3000000) {
      event.target.value = "";
      setEventFileError("File is larger than 3mb. Please upload small file");
    } else if (!ALLOWED_DATA_TYPES.includes(event.target.files[0].type)) {
      setEventFileError(
        "This file type is not allowed. Allowed file types: .jpeg, .png, .sh, .txt"
      );
      event.target.value = "";
    } else {
      setEventFile(event.target.files[0]);
    }
  };

  // Function for downloading file
  const handleUploadDownload = async () => {
    if (fetchedFile) {
      let finalFileName;
      switch (fetchedFile.filetype) {
        case "image/png":
          finalFileName = "uploadedFile.png";
          break;
        case "image/jpeg":
          finalFileName = "uploadedFile.jpeg";
          break;
        case "application/x-sh":
          finalFileName = "uploadedFile.sh";
          break;
        case "text/plain":
          finalFileName = "uploadedFile.txt";
          break;
        default:
          finalFileName = "uploadedFile";
          break;
      }
      const response = await axiosDownload.get(`/${fetchedFile.filename}`, {
        responseType: "blob",
      });

      console.log(response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", finalFileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
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

            {eventFileError !== null ? (
              <Alert
                key={Math.random()}
                variant="danger"
                // className={styles.form_allert}
              >
                {eventFileError}
              </Alert>
            ) : (
              ""
            )}

            {fetchedFile !== null ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleUploadDownload();
                }}
              >
                Download uploaded file
              </a>
            ) : (
              <Form.Group className="mb-3" controlId="imageForm">
                <Form.Label>Attatch a file</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            )}
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

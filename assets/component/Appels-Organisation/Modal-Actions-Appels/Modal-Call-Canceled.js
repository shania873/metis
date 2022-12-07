import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
function ModalCallCanceled(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (e) => {
    // console.log("content", content);
    // console.log("goalsSelected", JSON.stringify(goalsSelected));
    // console.log("contactsSelected", JSON.stringify(contactsSelected));
    // console.log("dureeValue", dureeValue);
    // console.log("patiId", props.defaultValueGoalsValue.pati_id);

    // let formGetInfos = new FormData();
    // let date = new Date(0);
    // date.setMinutes(dureeValue); // specify value for SECONDS here
    // let timeString = date.toISOString().substring(11, 19);
    // console.log(timeString);
    let formGetInfos = new FormData();
    formGetInfos.append("goal", props.goal.id);
    formGetInfos.append("contact", props.contact.id);

    formGetInfos.append("patientId", props.goal.pati_id);
    formGetInfos.append("user_id", auth.auth.idUser);
    console.log(props);
    axios({
      method: "post",
      url: "/api/setCallsCanceledByContacts",
      data: formGetInfos,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    }).then(function (response) {
      props.onChangeResponse(response.data);
      console.log(response);
      setShow(false);
    });
  };

  return (
    <>
      <a onClick={handleShow}>Signaler appel Annulée</a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attention !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous certain de vouloir annuler cette action ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCallCanceled;

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCancel,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Editor from "./Editor-Reports";
import InputPlaceList from "./Input-Place-List";
import InputContactList from "./Input-Contact-List";
import InputTypeList from "./Input-Type-List";

function AddActivitiesByReport(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().id;
  var formData = new FormData();
  formData.append("id", 106);
  //   formData.append("pathString", props.link);
  const [contacts, setContacts] = useState(null);
  const [places, setPlaces] = useState(null);
  const [elementsOpt, setElementsOpt] = useState(null);
  const [idPatient, setIdPatient] = useState(id);
  const [typeForm, setTypeForm] = useState(null);
  const [type, setType] = useState(null);
  const [descriptionForm, setDescriptionForm] = useState(null);
  const handleClose = () => setShow(false);
  const [editFormActivities, setEditFormActivities] = useState([
    props.formActivitiesEdit,
  ]);

  const [idEditFormActivities, setIdEditFormActivities] = useState([
    props?.formActivitiesEdit?.act_id,
  ]);

  const [value, setValueForm] = useState();
  const [contact, setValueContactForm] = useState();
  const [place, setValuePlaceForm] = useState();
  const [description, setValueDescription] = useState();

  const handleShow = () => setShow(true);
  useEffect(() => {
    axios({
      method: "post",
      url: "/api/suggestionsById",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        setType(response);
      })
      .catch(function (response) {});
  }, [idPatient]);

  function handleChangeContacts(e) {
    console.log(e);
    setValueContactForm(e);
  }

  function handleChangePlaces(e) {
    console.log(e);
    setValuePlaceForm(e);
  }

  const onSend = (e) => {
    console.log(contact, place, descriptionForm, typeForm);

    let formData = new FormData();
    formData.append("contact", contact);
    formData.append("place", place);
    formData.append("descriptionForm", descriptionForm);
    formData.append("typeForm", typeForm);
    // formData.append("descriptionSantee", descriptionSantee);
    // formData.append("valueConsommation", valueConsommation);
    // formData.append("descriptionConsommation", descriptionConsommation);

    console.log(formData);
  };
  return (
    <>
      <Button onClick={handleShow}>
        {" "}
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>Ajouter une activitée</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addSoins-form">
            <Form.Label htmlFor="inputValue" className="uk-form-label">
              Type
            </Form.Label>
            <select
              size="lg"
              className="uk-select"
              required={true}
              onChange={(e) => setTypeForm(e.target.value)}
              // value={props.formActivitiesEdit?.type}
            >
              <option>Choissisez le type</option>
              {type?.data?.map((el, id) => (
                <>{el.value && <option value={el?.id}>{el?.value}</option>}</>
              ))}
            </select>

            <Form.Label htmlFor="inputValue" className="uk-form-label">
              Description
            </Form.Label>
            <Form.Control
              type="text"
              id="inputValueSpécifique"
              className="uk-input"
              aria-describedby="valueSpécifique"
              // defaultValue={props.formActivitiesEdit?.description}
              onChange={(e) => setDescriptionForm(e.target.value)}
            />

            <InputContactList
              contacts={props?.contacts}
              // contacts={props?.contacts}
              onChange={handleChangeContacts}
              // defaultValue={
              //   props.formActivitiesEdit?.contact &&
              //   props.formActivitiesEdit?.contact
              //     ? props.formActivitiesEdit?.contact
              //     : null
              // }
            ></InputContactList>

            <InputPlaceList
              places={props?.places}
              onChange={handleChangePlaces}
              // defaultValue={
              //   props.formActivitiesEdit?.place &&
              //   props.formActivitiesEdit?.place
              //     ? props.formActivitiesEdit?.place
              //     : null
              // }
            ></InputPlaceList>
            <button onClick={(e) => onSend()}>Envoyer</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddActivitiesByReport;

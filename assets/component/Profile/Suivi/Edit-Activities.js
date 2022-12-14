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

function EditActivities(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().id;
  var formData = new FormData();
  formData.append("id", 108);
  //   formData.append("pathString", props.link);
  const [contacts, setContacts] = useState(null);
  const [places, setPlaces] = useState(null);
  const [elementsOpt, setElementsOpt] = useState(null);
  const [isErrorType, setIsErrorType] = useState();
  const [isErrorDescription, setIsErrorDescription] = useState();
  const [idPatient, setIdPatient] = useState(id);
  const [typeForm, setTypeForm] = useState(
    props.activity?.sugg?.id ? props.activity?.sugg?.id : null
  );
  const [type, setType] = useState(null);
  const [descriptionForm, setDescriptionForm] = useState(
    props.activity?.description ? props.activity?.description : null
  );
  const handleClose = () => setShow(false);
  const [editFormActivities, setEditFormActivities] = useState([
    props.formActivitiesEdit,
  ]);

  const [idEditFormActivities, setIdEditFormActivities] = useState([
    props?.formActivitiesEdit?.act_id,
  ]);

  const [value, setValueForm] = useState();
  const [contact, setValueContactForm] = useState(
    props.activity?.contacts ? props.activity?.contacts : null
  );
  const [place, setValuePlaceForm] = useState(
    props.activity?.places ? props.activity?.places : null
  );
  const [description, setValueDescription] = useState();

  const handleShow = () => setShow(true);

  function handleChangeContacts(e) {
    setValueContactForm(e);
  }

  function handleChangePlaces(e) {
    setValuePlaceForm(e);
  }

  const onSend = (isErrorType, isErrorDescription) => {
    let formData = new FormData();
    formData.append("contact", JSON.stringify(contact));
    formData.append("place", JSON.stringify(place));
    formData.append("description", descriptionForm);
    formData.append("type", typeForm);

    formData.append("idRepport", props.report.id);
    formData.append("idActivity", props.activity.id);

    if (typeForm === null || typeForm === "defaultValue") {
      setIsErrorType(true);
    } else {
      setIsErrorType(false);
    }

    if (descriptionForm === null || descriptionForm === "") {
      setIsErrorDescription(true);
    } else {
      setIsErrorDescription(false);
    }

    let validationType =
      typeForm === null || typeForm === "defaultValue" ? true : false;
    let validationDescription =
      descriptionForm === null || descriptionForm === "" ? true : false;

    if (validationType === false && validationDescription === false) {
      axios({
        method: "post",
        url: "/api/editActivitiesToReport",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.auth.accessToken}`,
        },
      })
        .then(function (response) {
          props.onChangeActivities(true);
          setShow(false);
        })
        .catch(function (response) {});
    }
  };

  return (
    <>
      <Button onClick={handleShow}>
        {" "}
        <FontAwesomeIcon icon={faEdit} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>Ajouter une activit??e</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addSoins-form">
            <Form.Label htmlFor="inputValue" className="uk-form-label">
              Type
            </Form.Label>
            {/* selectActivities={selectActivities}
                        selectSoins={selectSoins} */}
            <select
              size="lg"
              className="uk-select"
              required={true}
              onChange={(e) => setTypeForm(e.target.value)}
              defaultValue={
                props.activity?.sugg?.id ? props.activity?.sugg?.id : typeForm
              }
            >
              <option value={"defaultValue"}>Choissisez le type</option>
              {props?.select?.data?.map((el, id) => (
                <>{el.value && <option value={el?.id}>{el?.value}</option>}</>
              ))}
            </select>

            <Form.Label htmlFor="inputValue" className="uk-form-label">
              Description
            </Form.Label>
            <Form.Control
              type="text"
              id="inputValueSp??cifique"
              className="uk-input"
              aria-describedby="valueSp??cifique"
              defaultValue={props.activity?.description}
              onChange={(e) => setDescriptionForm(e.target.value)}
            />

            <InputContactList
              contacts={props?.contacts}
              // contacts={props?.contacts}
              onChange={handleChangeContacts}
              defaultValue={
                props.activity?.contacts ? props.activity?.contacts : null
              }
            ></InputContactList>

            <InputPlaceList
              places={props?.places}
              onChange={handleChangePlaces}
              defaultValue={
                props.activity?.places ? props.activity?.places : null
              }
            ></InputPlaceList>
            <button
              onClick={(e) => onSend(isErrorType, isErrorDescription)}
              // disabled={isErrorType && isErrorDescription}
            >
              Envoyer
            </button>
          </div>
          {isErrorType && <p>Type Obligatoire</p>}
          {isErrorDescription && <p>Description Obligatoire</p>}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditActivities;

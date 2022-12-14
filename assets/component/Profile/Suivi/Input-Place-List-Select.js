import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCancel,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Editor from "./Editor-Reports";
import AddActivitiesByReport from "./Add-ActivitiesByReports";
import AddIndicateursByReport from "./Indicateurs-Form-AddReports/Add-IndicateursByReports";
import AddSoinsByReport from "./Add-SoinsByReports";
function InputPlaceListSelect(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().id;
  var formData = new FormData();
  formData.append("id", 57);
  //   formData.append("pathString", props.link);
  const [contacts, setContacts] = useState(null);
  const [showAccesSoins, setAccesSoins] = useState(false);
  const [showActivities, setActivities] = useState(false);
  const [showIndicateurs, setChoiceIndicateurs] = useState(false);
  const [idPatient, setIdPatient] = useState(id);
  const [type, setType] = useState(null);
  const [places, setPlaces] = useState(null);
  const [placeValue, setPlaceValue] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {}, [idPatient]);
  const onChangePlaceValue = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <>
      <Form.Label htmlFor="inputValue" className="uk-form-label">
        Lieu
      </Form.Label>

      <Form.Select
        size="lg"
        className="mb-4 uk-select"
        defaultValue={props.defaultValue || placeValue}
        onChange={(e) => onChangePlaceValue(e)}
      >
        <option>Choissisez le lieu</option>
        {props?.places?.data?.map((el, id) => (
          <>{el?.lastname && <option value={el.id}>{el?.lastname}</option>}</>
        ))}
      </Form.Select>
    </>
  );
}

export default InputPlaceListSelect;

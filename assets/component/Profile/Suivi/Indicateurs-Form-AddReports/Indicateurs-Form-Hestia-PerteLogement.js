import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCancel,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Editor from "../Editor-Reports";

function IndicateursFormHestiaPerteLogement(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().id;
  var formData = new FormData();
  formData.append("id", 57);
  //   formData.append("pathString", props.link);

  const [contacts, setContacts] = useState(null);
  const [places, setPlaces] = useState(null);
  const [elementsOpt, setElementsOpt] = useState(null);
  const [idPatient, setIdPatient] = useState(id);
  const [typeCVCSelected, setTypeCVCSelected] = useState(null);

  const [type, setType] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [vetementsDescription, setDescriptionVetements] = useState(
  //   props?.editForm && props.editForm[2]?.comment
  //     ? props.form[2]?.comment
  //     : null
  // );
  useEffect(() => {}, [idPatient]);

  const [idBailleur, setidBailleur] = useState();
  const [idVoisinage, setidVoisinage] = useState();

  const [idHygiene, setidHygiene] = useState();

  const [voisinageSelected, setVoisinageSelected] = useState();
  const [descriptionVoisinage, setDescriptionVoisinage] = useState();

  const [hygieneSelected, setHygieneSelected] = useState();
  const [descriptionHygiene, setDescriptionHygiene] = useState();

  const [bailleurSelected, setBailleurSelected] = useState();
  const [descriptionBailleur, setDescriptionBailleur] = useState();

  const onChangeDescriptionHygiene = (e) => {
    setDescriptionHygiene(e.target.value);
  };
  const onChangeDescriptionVoisinage = (e) => {
    setDescriptionVoisinage(e.target.value);
  };
  const choiceBailleur = (e) => {
    setBailleurSelected(e);
  };

  const choiceTypeCVC = (e) => {
    setTypeCVCSelected(e.target.value);
  };

  const choiceVoisinage = (e) => {
    setVoisinageSelected(e);
  };

  const choiceHygiene = (e) => {
    setHygieneSelected(e);
  };

  const onChangeDescriptionBailleur = (e) => {
    setDescriptionBailleur(e.target.value);
  };
  //   /api/getContacts
  const onSend = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="addSoins-form">
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" className="uk-form-label">
            Voisinage
          </Form.Label>
          <Form.Check
            inline
            label="Conflits de voisinage (0)"
            onClick={(e) => choiceVoisinage("0")}
            name="group4"
            type={"radio"}
            id={`inline-radio-13`}
          />
          <Form.Check
            inline
            label="Conflits de voisinage mais gérés (1)"
            name="group4"
            onClick={(e) => choiceVoisinage("1")}
            type={"radio"}
            id={`inline-radio-14`}
          />
          <Form.Check
            inline
            label="Absence de conflits de voisinage (2)"
            name="group4"
            onClick={(e) => choiceVoisinage("2")}
            type={"radio"}
            id={`inline-radio-15`}
          />
          <Form.Check
            inline
            label="Bonne entente avec le voisinage (3)"
            name="group4"
            onClick={(e) => choiceVoisinage("3")}
            type={"radio"}
            id={`inline-radio-16`}
          />
          <Form.Label htmlFor="inputValue" className="uk-form-label">
            Commentaire
          </Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            rows={3}
            onChange={(e) => onChangeDescriptionVoisinage(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" className="uk-form-label">
            Hygiène logement
          </Form.Label>
          <Form.Check
            inline
            label="Si cumule au moins 2 éléments : Présence d’odeurs nauséabondes, nuisibles, altération du matériel, accumulation (0)"
            onClick={(e) => choiceHygiene("0")}
            name="group5"
            type={"radio"}
            id={`inline-radio-17`}
          />
          <Form.Check
            inline
            label="Présence d’odeurs nauséabondes OU nuisibles OU altération du matériel OU accumulation (1)"
            name="group5"
            onClick={(e) => choiceHygiene("1")}
            type={"radio"}
            id={`inline-radio-18`}
          />
          <Form.Check
            inline
            label="Logement relativement propre et entretenu mais pas impeccable ou aides familiales limitées (2)"
            name="group5"
            onClick={(e) => choiceHygiene("2")}
            type={"radio"}
            id={`inline-radio-19`}
          />
          <Form.Check
            inline
            label="Logement impeccable et/ou aides familiales régulières et fonctionnelles (3)"
            name="group5"
            onClick={(e) => choiceHygiene("3")}
            type={"radio"}
            id={`inline-radio-20`}
          />
          <Form.Label htmlFor="inputValue" className="uk-form-label">
            Commentaire
          </Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            rows={3}
            onChange={(e) => onChangeDescriptionHygiene(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" className="uk-form-label">
            Bailleur
          </Form.Label>
          <Form.Check
            inline
            label="Absence de paiement du loyer (0)"
            onClick={(e) => choiceBailleur("0")}
            name="group6"
            type={"radio"}
            id={`inline-radio-21`}
          />
          <Form.Check
            inline
            label="La personne paie son loyer mais aucune garantie de régularité ou de manière erronée (1)"
            name="group6"
            onClick={(e) => choiceBailleur("1")}
            type={"radio"}
            id={`inline-radio-22`}
          />
          <Form.Check
            inline
            label="Quelqu’un est garant du paiement du loyer mais personne n’est garant de la signature des baux (2)"
            name="group6"
            onClick={(e) => choiceBailleur("2")}
            type={"radio"}
            id={`inline-radio-23`}
          />
          <Form.Check
            inline
            label="Garantie du paiement du loyer et de la signature des baux (3)"
            name="group6"
            onClick={(e) => choiceBailleur("3")}
            type={"radio"}
            id={`inline-radio-24`}
          />
          <Form.Label
            htmlFor="inputValue"
            className="uk-form-label"
            onChange={(e) => onChangeDescriptionBailleur(e)}
          >
            Commentaire
          </Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            rows={3}
            onChange={(e) => onChangeDescriptionBailleur(e)}
          ></textarea>
          <button onClick={(e) => onSend(e)}>Envoyer</button>
        </div>
      </div>
    </>
  );
}

export default IndicateursFormHestiaPerteLogement;

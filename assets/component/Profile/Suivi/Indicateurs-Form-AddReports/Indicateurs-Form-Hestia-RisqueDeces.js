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

function IndicateursFormHestiaRisqueDeces(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().id;
  var formData = new FormData();
  formData.append("id", 57);

  const [idPatient, setIdPatient] = useState(id);

  const [idSecuritee, setidSecuritee] = useState(
    props?.editForm && props?.editForm[0]?.id ? props?.editForm[0]?.id : null
  );
  const [idSantee, setidSantee] = useState(
    props?.editForm && props?.editForm[1]?.id ? props?.editForm[1]?.id : null
  );

  const [idConsommation, setidConsommation] = useState(
    props?.editForm && props?.editForm[2]?.id ? props?.editForm[2]?.id : null
  );

  const [valueSecuritee, setChoiceSecuriteeSelected] = useState(
    props?.editForm && props?.editForm[0]?.value
      ? props?.editForm[0]?.value
      : null
  );
  const [descriptionSecuritee, setDescriptionSecuriteeSelected] = useState(
    props?.editForm && props?.editForm[0]?.comment
      ? props?.editForm[0]?.comment
      : null
  );

  const [valueSantee, setChoiceSanteeSelected] = useState(
    props?.editForm && props.editForm[1]?.value
      ? props.editForm[1]?.value
      : null
  );
  const [descriptionSantee, setDescriptionSanteeSelected] = useState(
    props?.editForm && props.editForm[1]?.comment
      ? props.editForm[1]?.comment
      : null
  );

  const [valueConsommation, setChoiceConsommationSelected] = useState(
    props?.editForm && props.editForm[2]?.value
      ? Number(props.editForm[2]?.value)
      : null
  );
  const [descriptionConsommation, setDescriptionConsommationSelected] =
    useState(
      props?.editForm && props?.editForm[2]?.comment
        ? props?.editForm[2]?.comment
        : null
    );

  const choiceSecuritee = (valueSecuritee) => {
    setChoiceSecuriteeSelected(valueSecuritee);
  };

  const onChangeDescriptionSecuritee = (e) => {
    setDescriptionSecuriteeSelected(e.target.value);
  };

  const choiceSantee = (valueSantee) => {
    setChoiceSanteeSelected(valueSantee);
  };

  const onChangeDescriptionSantee = (e) => {
    setDescriptionSanteeSelected(e);
  };

  const choiceConsommation = (valueConsommation) => {
    setChoiceConsommationSelected(valueConsommation);
  };

  const onChangeDescriptionConsommation = (e) => {
    setDescriptionConsommationSelected(e.target.value);
  };
  //   /api/getContacts

  console.log(props.editForm);

  props.onChange([
    {
      id: props.id,
      id_secur: idSecuritee,
      id_sant: idSantee,
      id_conso: idConsommation,
      valueSecuritee: valueSecuritee,
      descriptionSecuritee: descriptionSecuritee,
      valueSantee: valueSantee,
      descriptionSantee: descriptionSantee,
      valueConsommation: valueConsommation,
      descriptionConsommation: descriptionConsommation,
    },
  ]);
  return (
    <>
      <div className="addSoins-form">
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            Sécurité
          </Form.Label>
          <Form.Check
            inline
            label="Le logement est insalubre ET mal utilisé par la personne (0)"
            onClick={(e) => choiceSecuritee("0")}
            name="group7"
            defaultChecked={
              props.editForm && props?.editForm[0]?.value === 0 ? true : false
            }
            type={"radio"}
            id={`inline-radio-25`}
          />
          <Form.Check
            inline
            label="Le logement est insalubre OU mal utilisé par la personne (1)"
            name="group7"
            defaultChecked={
              props.editForm && props?.editForm[0]?.value === 1 ? true : false
            }
            onClick={(e) => choiceSecuritee("1")}
            type={"radio"}
            id={`inline-radio-26`}
          />
          <Form.Check
            inline
            label="Le logement est bien utilisé par la personne mais seulement partiellement sain et fonctionnel (2)"
            name="group7"
            onClick={(e) => choiceSecuritee("2")}
            type={"radio"}
            defaultChecked={
              props.editForm && props?.editForm[0]?.value === 2 ? true : false
            }
            id={`inline-radio-27`}
          />
          <Form.Check
            inline
            label="Le logement est sain et totalement fonctionnel et la personne l'utilise correctement (3)"
            name="group7"
            onClick={(e) => choiceSecuritee("3")}
            type={"radio"}
            defaultChecked={
              props.editForm && props?.editForm[0]?.value === 3 ? true : false
            }
            id={`inline-radio-28`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={
              props?.editForm && props?.editForm[0]?.comment
                ? props?.editForm[0]?.comment
                : ""
            }
            onChange={(e) => onChangeDescriptionSecuritee(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            Santé
          </Form.Label>
          <Form.Check
            inline
            label="La personne refuse les soins, ne prend pas son traitement et n’a aucun contact extérieur (porte fermée) (0)"
            onClick={(e) => choiceSantee("0")}
            name="group8"
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 0 ? true : false
            }
            type={"radio"}
            id={`inline-radio-29`}
          />
          <Form.Check
            inline
            label="La personne accepte le contact mais refuse les soins et ne prend pas son traitement (1)"
            name="group8"
            onClick={(e) => choiceSantee("1")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 1 ? true : false
            }
            id={`inline-radio-30`}
          />
          <Form.Check
            inline
            label="La personne accepte le contact, accepte certains soins ou prend son traitement mais pas suffisamment régulièrement pour se maintenir en bonne santé (2)"
            name="group8"
            onClick={(e) => choiceSantee("2")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 2 ? true : false
            }
            id={`inline-radio-31`}
          />
          <Form.Check
            inline
            label="La personne a un bon lien avec son médecin traitant et/ou infirmière à domicile ou est autonome dans sa prise de traitement (3)"
            name="group8"
            onClick={(e) => choiceSantee("3")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 3 ? true : false
            }
            id={`inline-radio-32`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={
              props.editForm && props.editForm[1]?.comment
                ? props.editForm[1]?.comment
                : ""
            }
            onChange={(e) => onChangeDescriptionSantee(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            Consommation
          </Form.Label>
          <Form.Check
            inline
            label="La personne a une ou plusieurs dépendances et ne gère pas du tout : elle consomme massivement et se met en danger (ne se rend pas compte du problème) (0)"
            onClick={(e) => choiceConsommation("0")}
            name="group9"
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 0 ? true : false
            }
            id={`inline-radio-33`}
          />
          <Form.Check
            inline
            label="La personne a une ou plusieurs dépendances, en a conscience mais n'est pas prête ou n'a pas envie d'envisager un changement (1)"
            name="group9"
            onClick={(e) => choiceConsommation("1")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 1 ? true : false
            }
            id={`inline-radio-34`}
          />
          <Form.Check
            inline
            label="La personne a une ou plusieurs dépendances mais elle la/les gère et cela ne pose pas de problème majeur d'un point de vue de sa santé/sécurité ou ne les gère pas mais est prête à modifier sa consommation (2)"
            name="group9"
            onClick={(e) => choiceConsommation("2")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 2 ? true : false
            }
            id={`inline-radio-35`}
          />
          <Form.Check
            inline
            label="Absence totale de consommation(s) - Abstinence (3)"
            name="group9"
            onClick={(e) => choiceConsommation("3")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 3 ? true : false
            }
            id={`inline-radio-36`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={
              props?.editForm && props?.editForm?.length > 0
                ? props?.editForm[2]?.comment
                : ""
            }
            onChange={(e) => onChangeDescriptionConsommation(e)}
          />
        </div>
      </div>
    </>
  );
}

export default IndicateursFormHestiaRisqueDeces;

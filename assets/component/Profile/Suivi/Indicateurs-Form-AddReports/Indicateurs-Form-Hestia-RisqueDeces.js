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

  const [idSecuritee, setidSecuritee] = useState();
  const [idSantee, setidSantee] = useState();

  const [idConsommation, setidConsommation] = useState();

  const [isValueSecuritee, setIsValueSecuritee] = useState(false);
  const [isValueSantee, setIsValueSantee] = useState(false);
  const [isValueConsommation, setIsValueConsommation] = useState(false);

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
    props?.editForm && props?.editForm[1]?.comment
      ? props?.editForm[1]?.comment
      : null
  );

  const [valueConsommation, setChoiceConsommationSelected] = useState(
    props?.editForm && props.editForm[2]?.value
      ? props.editForm[2]?.value
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
    setDescriptionSanteeSelected(e.target.value);
  };

  const choiceConsommation = (valueConsommation) => {
    setChoiceConsommationSelected(valueConsommation);
  };

  const onChangeDescriptionConsommation = (e) => {
    setDescriptionConsommationSelected(e.target.value);
  };

  const onSend = (e) => {
    let formData = new FormData();
    formData.append("valueSecuritee", valueSecuritee);
    formData.append("descriptionSecuritee", descriptionSecuritee);
    formData.append("valueSantee", valueSantee);
    formData.append("descriptionSantee", descriptionSantee);
    formData.append("valueConsommation", valueConsommation);
    formData.append("descriptionConsommation", descriptionConsommation);
    formData.append("idRepport", props.report.id);

    if (valueSecuritee === null) {
      setIsValueSecuritee(true);
    } else {
      setIsValueSecuritee(false);
    }
    if (valueSantee === null) {
      setIsValueSantee(true);
    } else {
      setIsValueSantee(false);
    }
    if (valueConsommation === null) {
      setIsValueConsommation(true);
    } else {
      setIsValueConsommation(false);
    }

    if (
      valueSecuritee !== null &&
      valueSantee !== null &&
      valueConsommation !== null
    ) {
      axios({
        method: "post",
        url: "/api/addIndicatorsHestiaDeces",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.auth.accessToken}`,
        },
      })
        .then(function (response) {
          props.onChangeIndicators(true);
          setShow(false);
          reload();
        })
        .catch(function (response) {});
    }
  };
  const onSendEdit = (e) => {
    let formData = new FormData();
    formData.append("valueSecuritee", valueSecuritee);
    formData.append("descriptionSecuritee", descriptionSecuritee);
    formData.append("valueSantee", valueSantee);
    formData.append("descriptionSantee", descriptionSantee);
    formData.append("valueConsommation", valueConsommation);
    formData.append("descriptionConsommation", descriptionConsommation);
    formData.append("idRepport", props.report.id);
    formData.append(
      "idIndicateurs",
      JSON.stringify(props.editForm.map((e) => e.id))
    );
    formData.append("idRapport", props.report.id);
    formData.append("idIndicatorsGroups", props.idIndicators);

    // const [isValueSecuritee, setIsValueSecuritee] = useState(false);
    // const [isValueSantee, setIsValueSantee] = useState(false);
    // const [isValueConsommation, setIsValueConsommation] = useState(false);
    if (valueSecuritee === null) {
      setIsValueSecuritee(true);
    } else {
      setIsValueSecuritee(false);
    }
    if (valueSantee === null) {
      setIsValueSantee(true);
    } else {
      setIsValueSantee(false);
    }
    if (valueConsommation === null) {
      setIsValueConsommation(true);
    } else {
      setIsValueConsommation(false);
    }

    if (
      valueSecuritee !== null &&
      valueSantee !== null &&
      valueConsommation !== null
    ) {
      axios({
        method: "post",
        url: "/api/editIndicatorsHestiaDeces",
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.auth.accessToken}`,
        },
      })
        .then(function (response) {
          props.onChangeIndicators(true);
          setShow(false);
          reload();
        })
        .catch(function (response) {});
    }
  };
  const handleClose = () => {
    setShow(false);
    reload();
  };
  return (
    <>
      <div className="addSoins-form">
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            S??curit??
          </Form.Label>
          <Form.Check
            inline
            label="Le logement est insalubre ET mal utilis?? par la personne (0)"
            onClick={(e) => choiceSecuritee("0")}
            name="group7"
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[0]?.value === 0 ? true : false
            }
            id={`inline-radio-25`}
          />
          <Form.Check
            inline
            label="Le logement est insalubre OU mal utilis?? par la personne (1)"
            name="group7"
            onClick={(e) => choiceSecuritee("1")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[0]?.value === 1 ? true : false
            }
            id={`inline-radio-26`}
          />
          <Form.Check
            inline
            label="Le logement est bien utilis?? par la personne mais seulement partiellement sain et fonctionnel (2)"
            name="group7"
            onClick={(e) => choiceSecuritee("2")}
            type={"radio"}
            defaultChecked={
              props.editForm && props.editForm[0]?.value === 2 ? true : false
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
              props.editForm && props.editForm[0]?.value === 3 ? true : false
            }
            id={`inline-radio-28`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            defaultValue={
              props?.editForm && props?.editForm[0]?.comment
                ? props?.editForm[0]?.comment
                : ""
            }
            rows={3}
            onChange={(e) => onChangeDescriptionSecuritee(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            Sant??
          </Form.Label>
          <Form.Check
            inline
            label="La personne refuse les soins, ne prend pas son traitement et n???a aucun contact ext??rieur (porte ferm??e) (0)"
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
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 1 ? true : false
            }
            onClick={(e) => choiceSantee("1")}
            type={"radio"}
            id={`inline-radio-30`}
          />
          <Form.Check
            inline
            label="La personne accepte le contact, accepte certains soins ou prend son traitement mais pas suffisamment r??guli??rement pour se maintenir en bonne sant?? (2)"
            name="group8"
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 2 ? true : false
            }
            onClick={(e) => choiceSantee("2")}
            type={"radio"}
            id={`inline-radio-31`}
          />
          <Form.Check
            inline
            label="La personne a un bon lien avec son m??decin traitant et/ou infirmi??re ?? domicile ou est autonome dans sa prise de traitement (3)"
            name="group8"
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 3 ? true : false
            }
            onClick={(e) => choiceSantee("3")}
            type={"radio"}
            id={`inline-radio-32`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            defaultValue={
              props?.editForm && props?.editForm[1]?.comment
                ? props?.editForm[1]?.comment
                : ""
            }
            rows={3}
            onChange={(e) => onChangeDescriptionSantee(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            Consommation
          </Form.Label>
          <Form.Check
            inline
            label="La personne a une ou plusieurs d??pendances et ne g??re pas du tout : elle consomme massivement et se met en danger (ne se rend pas compte du probl??me) (0)"
            onClick={(e) => choiceConsommation("0")}
            name="group9"
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 0 ? true : false
            }
            type={"radio"}
            id={`inline-radio-33`}
          />
          <Form.Check
            inline
            label="La personne a une ou plusieurs d??pendances, en a conscience mais n'est pas pr??te ou n'a pas envie d'envisager un changement (1)"
            name="group9"
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 1 ? true : false
            }
            onClick={(e) => choiceConsommation("1")}
            type={"radio"}
            id={`inline-radio-34`}
          />
          <Form.Check
            inline
            label="La personne a une ou plusieurs d??pendances mais elle la/les g??re et cela ne pose pas de probl??me majeur d'un point de vue de sa sant??/s??curit?? ou ne les g??re pas mais est pr??te ?? modifier sa consommation (2)"
            name="group9"
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 2 ? true : false
            }
            onClick={(e) => choiceConsommation("2")}
            type={"radio"}
            id={`inline-radio-35`}
          />
          <Form.Check
            inline
            label="Absence totale de consommation(s) - Abstinence (3)"
            name="group9"
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 3 ? true : false
            }
            onClick={(e) => choiceConsommation("3")}
            type={"radio"}
            id={`inline-radio-36`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            defaultValue={
              props?.editForm && props?.editForm[2]?.comment
                ? props?.editForm[2]?.comment
                : ""
            }
            rows={3}
            onChange={(e) => onChangeDescriptionConsommation(e)}
          />
          {props.isEdit ? (
            <button onClick={(e) => onSendEdit(e)}>Envoyer</button>
          ) : (
            <button onClick={(e) => onSend(e)}>Envoyer</button>
          )}
        </div>

        {isValueSecuritee && <p>Score du securit??e manquant</p>}
        {isValueSantee && <p>Score du sant??e manquant</p>}
        {isValueConsommation && <p>Score de consommation manquant</p>}
      </div>
    </>
  );
}

export default IndicateursFormHestiaRisqueDeces;

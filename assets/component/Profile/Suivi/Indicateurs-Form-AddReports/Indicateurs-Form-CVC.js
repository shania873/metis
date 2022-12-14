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

function IndicateursFormCVC(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().id;
  var formData = new FormData();
  formData.append("id", 57);

  const [idPatient, setIdPatient] = useState(id);

  const [idCorps, setidCorps] = useState();
  const [idVetements, setidVetements] = useState();

  const [idComportement, setidComportement] = useState();

  // isCorpsScore
  // isVetementsScore
  // isComportementScore
  const [isCorpsScore, setIsCorpsScore] = useState(false);
  const [isVetementsScore, setIsVetementsScore] = useState(false);
  const [isComportementScore, setIsComportementScore] = useState(false);

  const [corpsScore, setCorpsScore] = useState(
    props?.editForm && props?.editForm[0]?.value
      ? props?.editForm[0]?.value
      : null
  );
  const [corpsDescription, setDescriptionCorps] = useState(
    props?.editForm && props?.editForm[0]?.comment
      ? props?.editForm[0]?.comment
      : null
  );

  const [vetementsScore, setVetementsScore] = useState(
    props?.editForm && props.editForm[1]?.value
      ? props.editForm[1]?.value
      : null
  );
  const [vetementsDescription, setDescriptionVetements] = useState(
    props?.editForm && props?.editForm[1]?.comment
      ? props?.editForm[1]?.comment
      : null
  );

  const [comportementScore, setComportementScore] = useState(
    props?.editForm && props.editForm[2]?.value
      ? props.editForm[2]?.value
      : null
  );
  const [comportementDescription, setDescriptionComportement] = useState(
    props?.editForm && props?.editForm[2]?.comment
      ? props?.editForm[2]?.comment
      : null
  );

  useEffect(() => {}, [idPatient]);

  function choiceCorps(corpsScore) {
    setCorpsScore(corpsScore);
  }

  const onChangeDescriptionCorps = (e) => {
    setDescriptionCorps(e.target.value);
  };

  const choiceVetements = (e) => {
    setVetementsScore(e);
  };

  const onChangeDescriptionVetements = (e) => {
    setDescriptionVetements(e.target.value);
  };

  const choiceComportement = (e) => {
    setComportementScore(e);
  };

  const onChangeDescriptionComportement = (e) => {
    setDescriptionComportement(e.target.value);
  };
  // onSendEdit
  const onSendEdit = (e) => {
    let formData = new FormData();

    if (corpsScore === null) {
      setIsCorpsScore(true);
    }
    if (vetementsScore === null) {
      setIsVetementsScore(true);
    }
    if (comportementScore === null) {
      setIsComportementScore(true);
    }

    formData.append("corpsScore", corpsScore);
    formData.append("corpsDescription", corpsDescription);
    formData.append("vetementsScore", vetementsScore);
    formData.append("vetementsDescription", vetementsDescription);
    formData.append("comportementScore", comportementScore);
    formData.append("comportementDescription", comportementDescription);
    formData.append("idRepport", props.report.id);
    formData.append(
      "idIndicateurs",
      JSON.stringify(props.editForm.map((e) => e.id))
    );
    formData.append("idRapport", props.report.id);
    formData.append("idIndicatorsGroups", props.idIndicators);

    if (
      corpsScore !== null &&
      vetementsScore !== null &&
      comportementScore !== null
    ) {
      axios({
        method: "post",
        url: "/api/editIndicatorsCVC",
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
  const onSend = (e) => {
    if (corpsScore === null) {
      setIsCorpsScore(true);
    } else {
      setIsCorpsScore(false);
    }
    if (vetementsScore === null) {
      setIsVetementsScore(true);
    } else {
      setIsVetementsScore(false);
    }
    if (comportementScore === null) {
      setIsComportementScore(true);
    } else {
      setIsComportementScore(false);
    }

    if (
      corpsScore !== null &&
      vetementsScore !== null &&
      comportementScore !== null
    ) {
      let formData = new FormData();
      formData.append("corpsScore", corpsScore);
      formData.append("corpsDescription", corpsDescription);
      formData.append("vetementsScore", vetementsScore);
      formData.append("vetementsDescription", vetementsDescription);
      formData.append("comportementScore", comportementScore);
      formData.append("comportementDescription", comportementDescription);
      formData.append("idRepport", props.report.id);
      axios({
        method: "post",
        url: "/api/addIndicatorsCVC",
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
            Corps
          </Form.Label>
          <Form.Check
            inline
            label="Salet?? apparente avec parasites OU salet?? apparente avec odeurs (0)"
            onClick={(e) => choiceCorps("0")}
            name="group1"
            defaultChecked={
              props.editForm && props?.editForm[0]?.value === 0 ? true : false
            }
            type={"radio"}
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="Salet?? apparente OU parasites OU odeurs OU plaie non soign??e (1)"
            name="group1"
            onClick={(e) => choiceCorps("1")}
            type={"radio"}
            defaultChecked={
              props.editForm && props?.editForm[0]?.value === 1 ? true : false
            }
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            label="N??gligence (2)"
            name="group1"
            onClick={(e) => choiceCorps("2")}
            defaultChecked={
              props.editForm && props.editForm[0]?.value === 2 ? true : false
            }
            type={"radio"}
            id={`inline-radio-3`}
          />
          <Form.Check
            inline
            label="Propre et soign?? (3)"
            name="group1"
            defaultChecked={
              props.editForm && props.editForm[0]?.value === 3 ? true : false
            }
            onClick={(e) => choiceCorps("3")}
            type={"radio"}
            id={`inline-radio-4`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <textarea
            as="textarea"
            rows={3}
            className="uk-textarea"
            defaultValue={
              props?.editForm && props?.editForm[0]?.comment
                ? props?.editForm[0]?.comment
                : ""
            }
            onChange={(e) => onChangeDescriptionCorps(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            V??tements
          </Form.Label>
          <Form.Check
            inline
            label="Sales, ab??m??s et malodorants (0)"
            onClick={(e) => choiceVetements("0")}
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 0 ? true : false
            }
            name="group2"
            type={"radio"}
            id={`inline-radio-5`}
          />
          <Form.Check
            inline
            label="Sales et malodorants OU sales et ab??m??s OU inadapt??s (1)"
            name="group2"
            onClick={(e) => choiceVetements("1")}
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 1 ? true : false
            }
            type={"radio"}
            id={`inline-radio-6`}
          />
          <Form.Check
            inline
            label="Sales OU ab??m??s OU malodorants (2)"
            name="group2"
            onClick={(e) => choiceVetements("2")}
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 2 ? true : false
            }
            type={"radio"}
            id={`inline-radio-7`}
          />
          <Form.Check
            inline
            label="Coh??rents, propres et en bon ??tat (3)"
            name="group2"
            onClick={(e) => choiceVetements("3")}
            defaultChecked={
              props.editForm && props.editForm[1]?.value === 3 ? true : false
            }
            type={"radio"}
            id={`inline-radio-8`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            defaultValue={
              props.editForm && props.editForm[1]?.comment
                ? props.editForm[1]?.comment
                : ""
            }
            rows={3}
            onChange={(e) => onChangeDescriptionVetements(e)}
          />
        </div>
        <div key={`inline-radio`} className="mb-3">
          <Form.Label htmlFor="inputValue" style={{ display: "block" }}>
            Comportement
          </Form.Label>
          <Form.Check
            inline
            label="Anormal et dangereux (0)"
            onClick={(e) => choiceComportement("0")}
            name="group3"
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 0 ? true : false
            }
            type={"radio"}
            id={`inline-radio-9`}
          />
          <Form.Check
            inline
            label="Anormal OU dangereux (1)"
            name="group3"
            onClick={(e) => choiceComportement("1")}
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 1 ? true : false
            }
            type={"radio"}
            id={`inline-radio-10`}
          />
          <Form.Check
            inline
            label="Suscite un questionnement (2)"
            name="group3"
            onClick={(e) => choiceComportement("2")}
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 2 ? true : false
            }
            type={"radio"}
            id={`inline-radio-11`}
          />
          <Form.Check
            inline
            label="Normal (3)"
            name="group3"
            onClick={(e) => choiceComportement("3")}
            defaultChecked={
              props.editForm && props.editForm[2]?.value === 3 ? true : false
            }
            type={"radio"}
            id={`inline-radio-12`}
          />
          <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
          <textarea
            as="textarea"
            className="uk-textarea"
            rows={3}
            defaultValue={
              props?.editForm && props?.editForm?.length > 0
                ? props?.editForm[2]?.comment
                : ""
            }
            onChange={(e) => onChangeDescriptionComportement(e)}
          />
        </div>
        {props.isEdit ? (
          <button onClick={(e) => onSendEdit(e)}>Envoyer</button>
        ) : (
          <button onClick={(e) => onSend(e)}>Envoyer</button>
        )}

        {/* const [isCorpsScore, setIsCorpsScore] = useState(false);
    const [isVetementsScore, setIsVetementsScore] = useState(false);
    const [isComportementScore, setIsComportementScore] = useState(false); */}

        {isCorpsScore && <p>Score du corps manquant</p>}

        {isVetementsScore && <p>Score du v??tement manquant</p>}

        {isComportementScore && <p>Score du comportement manquant</p>}
      </div>
    </>
  );
}

export default IndicateursFormCVC;

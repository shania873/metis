import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  faPlusCircle,
  faCancel,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputTypeList from "../../../component/Input-Type-List";
function ModalEditInfos(props) {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().idContact;

  console.log(props);

  // formData.append("pathString", props.link);
  const [infos, setInfos] = useState(null);
  const [isSentRepport, setIsSentRepport] = useState(false);
  const [responseDatas, setResponseDatas] = useState(null);
  const [elementsOpt, setElementsOpt] = useState(null);
  const [idPatient, setIdPatient] = useState(id);
  const [tagsList, setTagsList] = useState(null);
  const [type, setType] = useState(null);
  const [specificValueInput, setSpecificValueInput] = useState(
    props?.infosAppels?.valueInformations !== null
      ? props?.infosAppels?.valueInformations
      : null
  );

  const [commentaireInput, setCommentaire] = useState(
    props?.infosAppels?.valueDescription !== null
      ? props?.infosAppels?.valueDescription
      : null
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    // var formData = new FormData();
    // if (props.infosAppels.value === "Tags") {
    //   formData.append("id", 159);
    // }
    // if (props.infosAppels.value === "Type de Collaborateur") {
    //   formData.append("id", 674);
    // }
    // axios({
    //   method: "post",
    //   url: "/api/suggestionsById",
    //   data: formData,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${auth.auth.accessToken}`,
    //   },
    // }).then(function (response) {
    //   setTagsList(response);
    // });
  }, []);
  //

  const handleInputChange = (e) => {
    //new Date(start).toJSON().slice(0, 10)
    setStartDate(new Date(e.target.value).toJSON().slice(0, 10));
    setEndDate(new Date(e.target.value).toJSON().slice(0, 10));
  };

  const handleSave = (e) => {
    let formGetInfos = new FormData();
    // value-sugg

    formGetInfos.append("type", type);
    formGetInfos.append("value", specificValueInput);
    formGetInfos.append("idCont", id.toString());
    formGetInfos.append("commentaire", commentaireInput);
    formGetInfos.append("idInfo", props?.infosAppels?.id);

    axios({
      method: "post",
      url: "/api/editItem",
      data: formGetInfos,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    }).then(function (response) {
      var formData = new FormData();
      formData.append("id", response.data.data.id);
      if (response) {
        axios({
          method: "post",
          url: "/api/getCallsAndOrganisationById",
          data: formData,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.auth.accessToken}`,
          },
        }).then(function (response) {
          if (response) {
            setResponseDatas(response.data);
            setIsSentRepport(true);
            document.querySelectorAll(".btn-close")[0].click();
          }
        });
      }
    });
  };
  //   new Date(1254088800 *1000)
  // handleInputChange;

  if (responseDatas !== null) {
    props.onChange({
      response: responseDatas,
    });

    // document.querySelectorAll(".btn-close")[0].click();
  }
  return (
    <>
      <button onClick={handleShow} className="ml-4">
        <FontAwesomeIcon icon={faEdit} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <>
            {props?.infosAppels?.sugge?.parentSugg?.value === "Tags" && (
              <InputTypeList
                type={props.selectListTags}
                onChangeType={(e) => setType(e)}
                defaultValue={
                  props.infosAppels.sugge.id !== null
                    ? props.infosAppels.sugge.id
                    : ""
                }
              ></InputTypeList>
            )}

            {props?.infosAppels?.sugge?.parentSugg?.value ===
              "Type de Collaborateur" && (
              <InputTypeList
                onChangeType={(e) => setType(e)}
                type={props.selectListCollab}
                defaultValue={
                  props.infosAppels.sugge.id !== null
                    ? props.infosAppels.sugge.id
                    : ""
                }
              ></InputTypeList>
            )}

            <Form.Label htmlFor="inputValue">Valeur Spécifique</Form.Label>

            {props.infosAppels.value === "Date de naissance" ? (
              <input
                type="date"
                id="inputValueSpécifique"
                onChange={(e) => setSpecificValueInput(e.target.value)}
                aria-describedby="valueSpécifique"
                defaultValue={
                  props?.infosAppels?.valueInformations !== null
                    ? props?.infosAppels?.valueInformations
                    : ""
                }
              />
            ) : (
              <input
                type="text"
                id="inputValueSpécifique"
                onChange={(e) => setSpecificValueInput(e.target.value)}
                defaultValue={
                  props?.infosAppels?.valueInformations !== null
                    ? props?.infosAppels?.valueInformations
                    : ""
                }
                aria-describedby="valueSpécifique"
              />
            )}

            <Form.Label htmlFor="inputValue">Commentaire</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setCommentaire(e.target.value)}
              rows={3}
              id="comment-value"
              defaultValue={
                props?.infosAppels?.valueDescription !== null
                  ? props?.infosAppels?.valueDescription
                  : ""
              }
            />
          </>
        </Modal.Body>
        <Modal.Footer>
          {isSentRepport && <FontAwesomeIcon icon={faCheck} />}
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Modal />);

export default ModalEditInfos;

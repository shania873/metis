import React, { useContext, useDebugValue, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Menu from "../../Menu";
import axios from "axios";
import Table from "react-bootstrap/Table";
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
import ModalEditInfos from "./Modal-Edit-Infos";
import ModalAddInfos from "./Modal-Add-Infos";
import ModalDeleteInfos from "./Modal-Delete-Infos";
const ProfilLieux = () => {
  const [auth, setAuth] = useState(useAuth());
  let id = useParams().idContact;

  const [contactInformation, setContactInformation] = useState(null);
  const [lengthList, setLengthList] = useState(10);
  const [idAppel, setIdAppel] = useState(id);
  const [tagsList, setTagsList] = useState(null);
  const [typeCollabList, setTypeCollabList] = useState(null);
  var formData = new FormData();
  formData.append("id", id);
  useEffect(() => {
    axios({
      method: "post",
      url: "/api/getCallsAndOrganisationById",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        setContactInformation(response.data);
      })
      .catch(function (response) {});

    const formDataTagsList = new FormData();
    formDataTagsList.append("id", 159);
    axios({
      method: "post",
      url: "/api/suggestionsById",
      data: formDataTagsList,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    }).then(function (response) {
      setTagsList(response);
    });
    const formDataCollabList = new FormData();
    formDataCollabList.append("id", 674);
    axios({
      method: "post",
      url: "/api/suggestionsById",
      data: formDataCollabList,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    }).then(function (response) {
      setTypeCollabList(response);
    });
  }, []);

  //   const readMore = () => {
  //     setLengthList(lengthList + 10);
  //   };

  function informationSaved(e) {
    if (e) {
      setContactInformation(e.response);
    }
  }

  return (
    <>
      <Menu></Menu>
      <section>
        <div className="container emp-profile">
          <div className="row profile-head">
            <h5>
              {contactInformation?.firstname} {contactInformation?.lastname}
            </h5>
            <p>{contactInformation?.description}</p>
          </div>

          <div className="row coordonnes-body">
            <table class="uk-table uk-table-striped">
              <h6>Infos</h6>
              {contactInformation?.informations.map((contInfo) => (
                <tr>
                  <td>{contInfo.value}</td>
                  <td>
                    {contInfo?.obj && contInfo?.obj?.length > 0 && (
                      <>
                        {contInfo?.obj.map((e) => (
                          <span>
                            {contInfo.value === "Tags" ||
                            contInfo.value === "Type de Collaborateur"
                              ? e.sugge.value
                              : e.valueInformations}
                            <span className="btn-group">
                              <ModalEditInfos
                                selectListCollab={typeCollabList}
                                selectListTags={tagsList}
                                infosAppels={e}
                                contInfo={contInfo}
                                contact={contactInformation}
                                idInfo={e.id}
                                onChange={(e) => informationSaved(e)}
                              ></ModalEditInfos>
                              <ModalDeleteInfos
                                infosPatient={e}
                                onChange={(e) => informationSaved(e)}
                              ></ModalDeleteInfos>
                            </span>
                          </span>
                        ))}
                      </>
                    )}

                    {contInfo?.obj && contInfo?.obj.length === 0 && (
                      <>Pas d'informations</>
                    )}
                    <div style={{ float: "right" }}>
                      <ModalAddInfos
                        selectListCollab={typeCollabList}
                        selectListTags={tagsList}
                        infosAppels={contInfo}
                        contact={contactInformation}
                        idInfo={contInfo.id}
                        onChange={(e) => informationSaved(e)}
                      ></ModalAddInfos>
                    </div>
                  </td>
                  <td></td>
                </tr>
              ))}
            </table>
          </div>

          <div className="row coordonnes-body">
            <table class="uk-table uk-table-striped">
              <h6>Patients li??es</h6>
              {contactInformation?.patients.map((e) => (
                <tr>
                  <td>
                    {e.firstName} {e.lastName}
                  </td>
                  <td>
                    <Link className="uk-link-muted" to={"/" + e.id}>
                      Aller au Profil
                    </Link>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilLieux;

import React, {
  useContext,
  useDebugValue,
  useRef,
  useState,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactLoading from "react-loading";
import {
  faPlusCircle,
  faCancel,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Editor from "./Editor-Reports";
import ModalAddAppels from "./Modal-Add-Appels";
import RapportDetails from "./Rapport-Details";
import ModalAddObjectifs from "./Modal-Add-Objectifs";
import AddReportMeet from "./Add-Report-Meet";
import DashboardReports from "./Dashboard-Reports";
import Accordion from "react-bootstrap/Accordion";
const Profile = () => {
  let id = useParams().id;
  const [auth, setAuth] = useState(useAuth());
  const [idPatient, setIdPatient] = useState(id);
  const [isEdit, setEdit] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [places, setPlaces] = useState(null);
  const [isDahsboardReports, setIsDashbordReports] = useState(false);
  const [isAddReportMeet, setIsAddReportMeet] = useState(false);
  const [isReportDetails, setIsReportsDetails] = useState(true);
  const [value, setValue] = useState(null);
  var formData = new FormData();
  formData.append("id", id.toString());
  var suggForm = new FormData();
  suggForm.append("id", [57, 658, 174, 25]);
  let objPatient = {};

  const [informationPatient, setInformation] = useState(null);
  const [search, setSearch] = useState(null);
  const [goals, setGoals] = useState(null);
  const [goalsList, setGoalsList] = useState(null);
  const [activities, setActivities] = useState(null);
  const [idSearch, setIdSearch] = useState(null);
  // getFollowUpReportsGoals
  useEffect(() => {
    axios({
      method: "post",
      url: "/api/getFollowUpReportsById",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        setInformation(response);
      })
      .catch(function (response) {});

    axios({
      method: "post",
      url: "/api/getFollowUpReportsGoalsForSelect",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        setGoals(response);
      })
      .catch(function (response) {});
    axios({
      method: "post",
      url: "/api/getFollowUpReportsGoals",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        setGoalsList(response);
      })
      .catch(function (response) {});
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

    axios({
      method: "post",
      url: "/api/getContactsForSelect",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        setContacts(response);
      })
      .catch(function (response) {});
    [];
    axios({
      method: "post",
      url: "/api/getPlaces",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        setPlaces(response);
      })
      .catch(function (response) {});
  }, [idPatient]);

  const editContent = (e) => {
    setEdit(true);
  };

  const showAddReports = (e) => {
    setIsDashbordReports(false);
    setIsAddReportMeet(true);
    setIsReportsDetails(false);
  };

  const showListReports = (e) => {
    setIsDashbordReports(true);
    setIsAddReportMeet(false);
    setIsReportsDetails(false);
  };
  const showDetailsReports = (e) => {
    setIsDashbordReports(false);
    setIsAddReportMeet(false);
    setIsReportsDetails(true);
  };

  const choiceRepport = (e) => {
    var reportSearch = new FormData();
    reportSearch.append("id", e);
    axios({
      method: "post",
      url: "/api/getFollowUpGoalsById",
      data: reportSearch,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    })
      .then(function (response) {
        return setSearch(response);
      })
      .catch(function (response) {});
  };

  function onChangeGoals(e) {
    console.log(e);
    setGoalsList(e);
  }
  return (
    <div className="container-ongletProfile">
      <div className="row item-report">
        <div className="col-sm-3">
          <div className="menu-ongletFiche mb-4">
            <button
              style={
                isAddReportMeet
                  ? { borderBottom: "0.3rem solid #ffc107" }
                  : { border: "0" }
              }
              onClick={(e) => showAddReports()}
            >
              Ajouter un rapport
            </button>
            {/* <button
              style={
                isDahsboardReports
                  ? { borderBottom: "0.3rem solid #ffc107" }
                  : { border: "0" }
              }
              onClick={(e) => showListReports()}
            >
              {" "}
              Liste de rapports
            </button> */}
            <button
              style={
                isReportDetails
                  ? { borderBottom: "0.3rem solid #ffc107" }
                  : { border: "0" }
              }
              onClick={(e) => showDetailsReports()}
              id="rapport_details-btn"
            >
              Rapports détaillées
            </button>
          </div>

          <h6>Objectifs</h6>
          {goals ? (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Ouvertes</Accordion.Header>
                <Accordion.Body>
                  {goalsList?.data.map((g, id) => (
                    <>
                      {g &&
                      g.type === 1 &&
                      (g.status === 1 || g.status === 2) ? (
                        <div className="item-goals" key={id}>
                          <Link
                            // from={window.location.origin}

                            onClick={(e) => choiceRepport(g.id)}
                          >
                            (
                            {new Date(g.creationDate).toLocaleString("fr-BE", {
                              dateStyle: "short",
                            })}
                            ){g?.sugg?.value} {g?.description}
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Fermées</Accordion.Header>
                <Accordion.Body>
                  {goalsList?.data.map((g, id) => (
                    <>
                      {g &&
                      g.type === 1 &&
                      (g.status === 3 || g.status === 4) ? (
                        <div className="item-goals" key={id}>
                          <Link
                            // from={window.location.origin}

                            onClick={(e) => choiceRepport(g.id)}
                          >
                            {new Date(g.creationDate).toLocaleString("fr-BE", {
                              dateStyle: "short",
                            })}
                            {g?.func?.value} {g?.description}
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ) : (
            <ReactLoading
              type={"spin"}
              color={"#B1B1B1"}
              height={"20%"}
              width={"20%"}
            />
          )}

          <h6>Appels</h6>
          {goals ? (
            <>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Ouvertes</Accordion.Header>
                  <Accordion.Body>
                    {goalsList?.data.map((g, id) => (
                      <>
                        {g &&
                        g?.type === 2 &&
                        (g.status === 1 || g.status === 2) ? (
                          <div className="item-goals" key={id}>
                            <Link
                              // from={window.location.origin}

                              onClick={(e) => choiceRepport(g.id)}
                            >
                              {new Date(g.creationDate).toLocaleString(
                                "fr-BE",
                                {
                                  dateStyle: "short",
                                }
                              )}
                              {g?.func?.value} {g?.description}
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Fermées</Accordion.Header>
                  <Accordion.Body>
                    {goalsList?.data.map((g, id) => (
                      <>
                        {g &&
                        g?.type === 2 &&
                        (g.status === 3 || g.status === 4) ? (
                          <div className="item-goals" key={id}>
                            <Link
                              // from={window.location.origin}

                              onClick={(e) => choiceRepport(g.id)}
                            >
                              {new Date(g.creationDate).toLocaleString(
                                "fr-BE",
                                {
                                  dateStyle: "short",
                                }
                              )}
                              {g?.func?.value} {g?.description}
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </>
          ) : (
            <ReactLoading
              type={"spin"}
              color={"#B1B1B1"}
              height={"20%"}
              width={"20%"}
            />
          )}
        </div>
        <div className="col-sm-9">
          <div className="d-flex row-btn mb-4">
            <div style={{ margin: "0 1rem" }}>
              <ModalAddAppels
                type={type}
                contacts={contacts}
                places={places}
                onChange={onChangeGoals}
              ></ModalAddAppels>
            </div>

            <div>
              <ModalAddObjectifs
                type={type}
                contacts={contacts}
                places={places}
                onChange={onChangeGoals}
              ></ModalAddObjectifs>
            </div>
          </div>

          {isReportDetails && (
            <RapportDetails
              type={type}
              contacts={contacts}
              goals={goals}
              search={search}
              places={places}
              informationPatient={informationPatient}
            ></RapportDetails>
          )}

          {isAddReportMeet && (
            <AddReportMeet
              type={type}
              contacts={contacts}
              goals={goals}
              places={places}
            ></AddReportMeet>
          )}

          {isDahsboardReports && (
            <DashboardReports
              informationPatient={informationPatient}
            ></DashboardReports>
          )}
        </div>

        {/* <h1>TEXT</h1> */}
      </div>
    </div>
  );
};

export default Profile;

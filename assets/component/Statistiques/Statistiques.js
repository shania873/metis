import React, { useContext, useDebugValue, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import Menu from "../../component/Menu";
import axios from "axios";
import { useParams } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Form from "react-bootstrap/Form";
import { Label } from "@mui/icons-material";

const Statistiques = () => {
  let id = useParams().id;
  let backgroundImage =
    "../images/5a94e34b4c36e28de4e704f8c2d1c39a79e91b5d.png";
  const [auth, setAuth] = useState(useAuth());
  const [resultCsv, setResultCSV] = useState(null);
  const [statValue, setStatsValue] = useState(null);
  const [nameFileName, setFileName] = useState(null);
  const [year, setYear] = useState("2022");

  const navigate = useNavigate();
  const location = useLocation();

  let objPatient = {};

  useEffect(() => {}, []);

  async function exportAll() {
    for (let index = 0; index < 5; index++) {
      let request = "/api/statistiques" + index;

      await axios({
        method: "get",
        url: request,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.auth.accessToken}`,
        },
      })
        .then(function (response) {
          setResultCSV(response.data);
          if (response.data) {
            jsonToCsv(response.data);
          }
          exportFile();
        })
        .catch(function (response) {});
    }
  }

  function exportCSV() {
    let request = "/api/statistiques" + statValue;

    var params = {
      data1: year,
    };

    var headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.auth.accessToken}`,
      },
    };

    axios
      .post(request, params, headers)
      .then(function (response) {
        setResultCSV(response.data);
        if (response.data) {
          jsonToCsv(response.data);
        }
        exportFile();
      })
      .catch(function (response) {});

    // axios({
    //   method: "post",
    //   url: request,
    //   item: { some: { year: "2024" } },
    //   type: "products",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${auth.auth.accessToken}`,
    //   },
    // })
    //   .then(function (response) {
    //     setResultCSV(response.data);
    //     if (response.data) {
    //       jsonToCsv(response.data);
    //     }
    //     exportFile();
    //   })
    //   .catch(function (response) {});
  }

  function jsonToCsv(items) {
    const header = Object.keys(items[0]);

    const headerString = header.join(",");

    const replacer = (key, value) => value ?? "";

    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );

    let csv = [headerString, ...rowItems].join("\r\n");

    // document.write(csv);

    var hiddenElement = document.createElement("a");
    hiddenElement.href =
      "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv);
    hiddenElement.target = "_blank";

    hiddenElement.download =
      document.getElementById("selectCsv").options[
        document.getElementById("selectCsv").value
      ].text + ".csv";
    hiddenElement.click();
  }

  return (
    <>
      <Menu></Menu>

      <div className="select container" style={{ position: "relative" }}>
        <h5>Statistiques</h5>
        <Form.Label>Ann??e</Form.Label>
        <input
          className="uk-input"
          defaultValue={"2022"}
          onChange={(e) => setYear(e.target.value)}
        />

        <Form.Label>Protocoles</Form.Label>
        <Form.Select
          size="lg"
          className="uk-select"
          value={statValue}
          id={"selectCsv"}
          onChange={(e) => setStatsValue(e.target.value)}
        >
          <option>Selectionner un stat</option>
          <option value={1}>Stats1</option>
          <option value={2}>Stats2</option>
          <option value={3}>Stats3</option>
          <option value={4}>Liste de personnes d??c??d??s sans date mises</option>
          <option value={5}>
            Lister les patients ayant 2 ??tats simultan??s
          </option>
          <option value={6}>Nombre de status part patients</option>
          <option value={7}>patients without status at reference date</option>
          <option value={8}>patients without team at reference date</option>
          <option value={9}>patients without birthdate</option>
          <option value={10}>
            Nombre de patients suivi par l'??quipe rue au cours de la periode de
            reference, en suivi ou pre-suivi actif, ayant une pathologie
            physique chronique (inclus assuetude) et pour qui au moins une
            rencontre a ??t?? r??alis??e dans la p??riode de reference
          </option>
          <option value={11}>
            Nombre de patients suivi par l'??quipe rue au cours de la periode de
            reference, en suivi ou pre-suivi actif, ayant une pathologie
            physique chronique (inclus assuetude) et pour qui au moins une
            rencontre a ??t?? r??alis??e dans la p??riode de reference - liste
            nominative
          </option>
          <option value={12}>
            Nombre de patients suivi par l'??quipe rue au cours de la periode de
            reference, en suivi ou pre-suivi actif, ayant une pathologie
            physique chronique (inclus assuetude) mais une rencontre n'a pas ??t??
            forcement r??alis??e dans la p??riode de reference
          </option>
          <option value={13}>
            Nombre de patients suivi par l'??quipe rue au cours de la periode de
            reference, en suivi ou pre-suivi actif, ayant une pathologie
            physique chronique (inclus assuetude) mais une rencontre n'a pas ??t??
            forcement r??alis??e dans la p??riode de reference - liste nominative
          </option>
          <option value={14}>Nouveaux signalements encod??s</option>
          <option value={15}>
            Nouveaux signalements encod??s - Liste nominative
          </option>
          <option value={16}>Nouveaux pr??-suivis actifs encodes</option>
          <option value={17}>
            Nouveaux pr??-suivis actifs encodes - liste nominative
          </option>
          <option value={18}>
            Nombre de nouveaux suivis au cours de l???ann??e
          </option>
          <option value={19}>
            Nombre de nouveaux suivis au cours de l???ann??e - liste nominative
          </option>
          <option value={20}>
            Nombre de personnes pass??es par le suivi en cours d ann??e
          </option>
          <option value={21}>
            Nombre de personnes pass??es par le suivi en cours d???ann??e - liste
            nominative
          </option>
          <option value={22}>
            Nombre de personnes pass??es par le post-suivi en cours d???ann??e
          </option>
          <option value={23}>
            Nombre de personnes pass??es par le post-suivi en cours d'ann??e -
            liste nominative
          </option>
          <option value={24}>
            Nombre total de personnes signal??es, en pr??-suivi actif, suivi et
            post-suivi
          </option>
          <option value={25}>
            Tableau 1.E. - Nombre total de personnes signal??es, en pr??-suivi
            actif, suivi et post-suivi - liste nominative
          </option>
          <option value={26}>
            Tableau 1.F/G. ??? Nombre de nouveaux patients Housing First au cours
            de l???ann??e
          </option>
          <option value={27}>
            Tableau 1.F/G. ??? Nombre de nouveaux patients Housing First au cours
            de l???ann??e - liste nominative
          </option>

          <option value={28}>
            Tableau 1.H. ??? Nombre total de patients Housing First et Housing
            Fast
          </option>
          <option value={29}>
            Tableau 1.H. ??? Nombre total de patients Housing First et Housing
            Fast - liste nominative
          </option>
          <option value={30}>
            Tableau 1.I. ??? Nombre total de patients selon l?????quipe de suivi
          </option>
          <option value={31}>
            Tableau 1.I. ??? Nombre total de patients selon l?????quipe de suivi -
            liste nominative
          </option>
          <option value={32}>
            TABLEAU 2A-1 : Nombre de rencontres/appels effectu??s avec les
            patients selon leur statut
          </option>
          <option value={33}>
            TABLEAU 2A-2 : Nombre d???activit??s effectu??es avec les patients selon
            leur statut
          </option>
          <option value={34}>
            TABLEAU 2B-1 : Nombre de rencontres/appels effectu??s avec les
            patients selon l?????quipe de suivi
          </option>
          <option value={35}>
            TABLEAU 2B-2 : Nombre d???activit??s effectu??es avec les patients selon
            l?????quipe de suivi
          </option>
          <option value={36}>
            TABLEAU 2B-2 : Nombre d???activit??s effectu??es avec les patients selon
            l?????quipe de suivi - liste nominative et activites detaillees
          </option>
          <option value={37}>
            TABLEAU 2B-3 : nombre de patients pour qui un accompagnement a ??t??
            effectu?? selon l?????quipe de suivi - accompagnements uniquement
          </option>
          <option value={38}>
            TABLEAU 2B-X :liste nominative des patients pour qui un
            accompagnement a ??t?? effectu?? selon l?????quipe de suivi - liste
            nominative et activites detaillees - accompagnements uniquement
          </option>
          <option value={39}>
            TABLEAU 2C-1 : Nombre de rencontres/appels effectu??s avec les
            patients selon l?????quipe de suivi
          </option>
          <option value={40}>
            TABLEAU 2C-2 : Nombre d???activit??s effectu??es avec les patients selon
            le programme de logement
          </option>
          <option value={41}>
            TABLEAU 2D : Dur??e totale et moyenne des activit??s effectu??es avec
            les patients selon leur statut
          </option>
          <option value={42}>
            TABLEAU 2E : Dur??e totale et moyenne des activit??s effectu??es avec
            les patients selon l?????quipe de suivi
          </option>
          <option value={43}>
            TABLEAU 2F : Dur??e totale et moyenne des activit??s effectu??es avec
            les patients selon le programme de logement
          </option>
          <option value={44}>
            TABLEAU 3A : Nombre de d??marches effectu??es pour les patients selon
            leur statut
          </option>
          <option value={45}>
            TABLEAU 3B : Nombre de d??marches effectu??es pour les patients selon
            l?????quipe de suivi
          </option>
          <option value={46}>
            TABLEAU 3C : Nombre de d??marches effectu??es pour les patients selon
            le programme de logement
          </option>
          <option value={47}>
            TABLEAU 3D : Dur??e totale et moyenne des d??marches effectu??es pour
            les patients selon leur statut
          </option>
          <option value={48}>
            TABLEAU 3E : Dur??e totale et moyenne des d??marches effectu??es pour
            les patients selon l?????quipe de suivi
          </option>

          <option value={49}>
            TABLEAU 3F : Dur??e totale et moyenne d??marches effectu??es pour les
            patients selon le programme de logement
          </option>

          <option value={50}>
            TABLEAU 4 : LES 20 PATIENTS QUI ONT DEMANDE LE PLUS D???ATTENTION
          </option>
          <option value={51}>TABLEAU 4B : ACTIVITES PAR PATIENT</option>
          <option value={52}>
            Tableau 5 : R??partition des activit??s et d??marches au cours de
            l???ann??e Tableau 5.A-1 ??? R??partition des activit??s
          </option>
          <option value={53}>Tableau 5.A-2 ??? R??partition des activit??s</option>
          <option value={54}>Tableau 5.B. ??? R??partition des d??marches</option>
          <option value={55}>
            Tableau 9.A : Personnes totales en logement durable
          </option>
          <option value={56}>
            Tableau 9.B : Personnes totales en logement durable 2006 par
            programme
          </option>
          <option value={57}>
            Tableau 9.A/B : Personnes totales en logement durable par programme
            - liste nominative
          </option>
          <option value={58}>
            Tableau 9.B.2 : Personnes totales en logement durable ann??e en cours
            par programme - liste nominative
          </option>
          <option value={59}>
            TABLEAU 11 : PERSONNES STABILISEES EN LOGEMENT Tableau 11.A. ???
            Personnes pass??es en post-suivi en cours d???ann??e
          </option>
          <option value={60}>
            Tableau 11.A. ??? Personnes pass??es en post-suivi en cours d???ann??e -
            liste nominative
          </option>
          <option value={61}>
            Tableau 11.B. ??? Total des personnes dans le post-suivi
          </option>
          <option value={62}>
            Tableau 11.B. ??? Total des personnes dans le post-suivi - liste
            nominative
          </option>
          <option value={63}>
            TABLEAU 22 : NATIONALITES DE NOS PATIENTS Tableau 22.A. - Donn??es
            chiffr??es sur toutes les nationalit??s
          </option>
          <option value={64}>
            Tableau 22.A. - Donn??es chiffr??es sur toutes les nationalit??s -
            liste nominative
          </option>
          <option value={65}>
            Tableau 22.B. - Pourcentages de nationalit??s belges et ??trang??res
          </option>
          <option value={66}>
            Tableau 22.C. - Donn??es chiffr??es sur toutes les nationalit??s selon
            le programme de logement des patients
          </option>
          <option value={67}>
            Tableau 22.C. - Donn??es chiffr??es sur toutes les nationalit??s selon
            le programme de logement des patients - liste nominative
          </option>
          <option value={68}>
            TABLEAU 23 : SEXE DE NOS PATIENTS Tableau 23.A. - Donn??es chiffr??es
            sur le sexe
          </option>
          <option value={69}>
            Tableau 23.A. - Donn??es chiffr??es sur le sexe - liste nominative
          </option>
          <option value={70}>
            Tableau 23.C. - Donn??es chiffr??es sur le sexe selon le programme de
            logement des patients
          </option>
          <option value={71}>
            Tableau 23.C. - Donn??es chiffr??es sur le sexe selon le programme de
            logement des patients - liste nominative
          </option>
          <option value={72}>
            TABLEAU 24 : AGE MOYEN DE NOS PATIENTS'; Tableau 24.A.1 ??? Age des
            personnes dans le suivi - Ages moyen, min et max par type de suivi
            et genre - par genre
          </option>
          <option value={73}>
            Tableau 24.A.1 ??? Age des personnes dans le suivi - Ages moyen, min
            et max par type de suivi et genre - par genre - liste nominative
          </option>
          <option value={74}>
            Tableau 24.A.1 ??? Age des personnes dans le suivi/post-suivi - Ages
            moyen, min et max par type de suivi - global
          </option>
          <option value={75}>
            Tableau 24.A. et 24.B. ??? Age des personnes dans le suivi - Ages
            moyen, min et max par type de suivi et genre - liste nominative
            incluant les date de naissance nulles
          </option>
          <option value={76}>
            Tableau 24.C/D.1 ??? Age des personnes dans le housing first/ housing
            first - Ages moyen, min et max par type de suivi et genre - global
          </option>
          <option value={77}>
            Tableau 24.C/D.1 ??? Age des personnes dans le housing first/ housing
            first - Ages moyen, min et max par type de suivi et genre - global -
            liste nominative
          </option>
          <option value={78}>
            Tableau 25.A. ??? Probl??mes de sant?? et assu??tudes des patients en
            suivi
          </option>
          <option value={79}>
            Tableau 25.A. ??? Probl??mes de sant?? et assu??tudes des patients en
            suivi - liste nominative
          </option>
          <option value={80}>
            tableau 25.A - nombre de personnes ayant 2 problemes sur 3
          </option>
          <option value={81}>
            Tableau 25.B. ??? Probl??mes de sant?? et assu??tudes des patients en
            Housing First
          </option>
          <option value={82}>
            tableau 25.B - nombre de personnes ayant 2 problemes sur 3 en
            housing first
          </option>
          <option value={83}>
            Tableau 25.B. ??? Probl??mes de sant?? et assu??tudes des patients en
            Housing First - liste nominative
          </option>
          <option value={84}>
            Tableau 25.C. ??? Probl??mes de sant?? et assu??tudes des patients en
            Housing Fast
          </option>
          <option value={85}>
            tableau 25.C - nombre de personnes ayant 2 problemes sur 3 en
            housing Fast
          </option>
          <option value={86}>
            Tableau 25.C. ??? Probl??mes de sant?? et assu??tudes des patients en
            Housing Fast - liste nominative
          </option>
          <option value={87}>
            Tableau 26.A. ??? Absence de probl??me de sant?? physique chronique des
            patients en suivi
          </option>
          <option value={88}>
            Tableau 26.A. ??? Absence de probl??me de sant?? physique chronique des
            patients en suivi - liste nominative
          </option>
          <option value={89}>
            Tableau 26.B. ??? Identification des probl??mes de sant?? physique
            chronique des patients en suivi
          </option>
          <option value={90}>
            Tableau 26.B. ??? Identification des probl??mes de sant?? physique
            chronique des patients en suivi - liste nominative
          </option>
          <option value={91}>
            Tableau 26.C. ??? Absence de probl??me de sant?? physique chronique des
            patients en Housing First
          </option>
          <option value={92}>
            Tableau 26.C. ??? Absence de probl??me de sant?? physique chronique des
            patients en Housing First - liste nominative
          </option>
          <option value={93}>
            Tableau 26.D. ??? Identification des probl??mes de sant?? physique
            chronique des patients Housing First
          </option>
          <option value={94}>
            Tableau 26.D. ??? Identification des probl??mes de sant?? physique
            chronique des patients Housing First - liste nominative
          </option>
          <option value={95}>
            Tableau 27 : Identification des probl??mes de sant?? mentale Tableau
            27.A : Absence de probl??mes de sant?? mentale chez les patients en
            suivi
          </option>
          <option value={96}>
            Tableau 27.A : Absence de probl??mes de sant?? mentale chez les
            patients en suivi - liste nominative
          </option>
          <option value={97}>
            Tableau 27.B. ??? Identification des probl??mes de sant?? mentale chez
            les patients en suivi
          </option>
          <option value={98}>
            Tableau 27.B. ??? Identification des probl??mes de sant?? mentale chez
            les patients en suivi - liste nominative
          </option>
          <option value={99}>
            Tableau 27.C. : Absence de probl??mes de sant?? mentale chez les
            patients Housing First
          </option>
          <option value={100}>
            Tableau 27.C. ??? Absence de probl??me de sant?? mentale des patients en
            Housing First - liste nominative
          </option>
          <option value={101}>
            Tableau 27.D. ??? Identification des probl??mes de sant?? mentale des
            patients Housing First
          </option>
          <option value={102}>
            Tableau 27.D. ??? Identification des probl??mes de sant?? mentale des
            patients Housing First - liste nominative
          </option>
          <option value={103}>
            Tableau 28 : Identification des assu??tudes d??clar??es' Tableau 28.A.
            ??? Absence d???assu??tude d??clar??e chez les patients en suivi
          </option>
          <option value={104}>
            Tableau 28.A. ??? Absence d???assu??tude d??clar??e chez les patients en
            suivi - liste nominative
          </option>
          <option value={105}>
            Tableau 28.B. ??? Identification des assu??tudes d??clar??es chez les
            patients en suivi
          </option>
          <option value={106}>
            Tableau 28.B. ??? Identification des assu??tudes d??clar??es chez les
            patients en suivi - liste nominative
          </option>
          <option value={107}>
            Tableau 28.C. ??? Absence d???assu??tude d??clar??e chez les patients
            Housing First
          </option>
          <option value={108}>
            Tableau 28.C. ??? Absence d???assu??tude d??clar??e chez les patients
            Housing First - liste nominative
          </option>
          <option value={108}>
            Tableau 28.C. ??? Absence d???assu??tude d??clar??e chez les patients
            Housing First - liste nominative
          </option>
          <option value={109}>
            Tableau 28.D. ??? Identification des assu??tudes d??clar??es chez les
            patients Housing First
          </option>
          <option value={110}>
            Tableau 28.D. ??? Identification des assu??tudes d??clar??es chez les
            patients Housing First - liste nominative
          </option>
          <option value={111}>
            TABLEAU 29 : PERSONNES DECEDEES TABLEAU 29.A : PERSONNES DECEDEES
            selon le suivi
          </option>
          <option value={112}>
            TABLEAU 29.A : PERSONNES DECEDEES selon le suivi - liste nominative
            avec statut pr??c??dent (n\'inclut pas les personnes uniquement
            encod??es comme d??c??d??es)
          </option>
          <option value={113}>
            TABLEAU 29.B : PERSONNES DECEDEES selon l\'??quipe (inclut les
            personnes uniquement encod??es comme d??c??d??es)
          </option>
          <option value={114}>
            TABLEAU 29.B : PERSONNES DECEDEES selon l\'equipe - liste nominative
            avec statut pr??c??dent (inclut les personnes uniquement encod??es
            comme d??c??d??es, n\'inclut pas les personnes sans equipe)
          </option>
          <option value={115}>
            TABLEAU 29.C : PERSONNES DECEDEES selon le programme de logement
          </option>
          <option value={116}>
            TABLEAU 29.C : PERSONNES DECEDEES selon le programme de logement -
            liste nominative
          </option>
          <option value={117}>
            TABLEAU 31 : COLLABORATION AVEC D???AUTRES ASSOCIATIONS
          </option>
          <option value={118}>
            TABLEAU 32 : NOMBRE DE PERSONNES DU POST-SUIVI VERS LE SUIVI Tableau
            32.A. - Nombre de personnes du post-suivi ayant fait une rechute
            vers le suivi
          </option>
          <option value={119}>
            Tableau 32.A. - Nombre de personnes du post-suivi ayant fait une
            rechute vers le suivi - liste nominative
          </option>
          <option value={120}>
            Tableau 32.A. - Nombre de personnes du post-suivi ayant fait une
            rechute vers un autre statut - liste nominative
          </option>
          <option value={121}>
            Tableau 32.B. - Nombre de patient par nombre de rechutes vers le
            suivi
          </option>
          <option value={122}>
            Tableau 32.C. - Nombre de personnes ayant rechut?? en rue
          </option>
          <option value={123}>
            Tableau 32.C. - Nombre de personnes ayant rechut?? en rue - liste
            nominative
          </option>
          <option value={124}>
            Tableau 33.A.1 - Dur??e moyenne du post-suivi, pour ceux qui ont
            quitt?? ces cat??gories
          </option>
          <option value={125}>
            Tableau 33.A.1 - Dur??e moyenne du post-suivi, pour ceux qui ont
            quitt?? ces cat??gories - liste nominative
          </option>
          <option value={126}>
            Tableau 33.A.2 - Dur??e moyenne du suivi pour ceux qui ont quitt?? ces
            cat??gories
          </option>
          <option value={127}>
            Tableau 33.A.2 - Dur??e moyenne du suivi pour ceux qui ont quitt?? ces
            cat??gories - liste nominative
          </option>
          <option value={128}>
            Tableau 33.A.3 - Dur??e moyenne du pr??-suivi pour ceux qui ont quitt??
            ces cat??gories
          </option>
          <option value={129}>
            Tableau 33.A.3 - Dur??e moyenne du pr??-suivi pour ceux qui ont quitt??
            ces cat??gories - liste nominative
          </option>
          <option value={130}>
            Tableau 33.B. - Dur??e moyenne du pr??-suivi pour ceux qui y sont
            toujours
          </option>
          <option value={131}>
            Tableau 33.B. - Dur??e moyenne du pr??-suivi pour ceux qui y sont
            toujours - liste nominative
          </option>
          <option value={132}>
            Tableau 33.C. - Dur??e moyenne du suivi pour ceux qui y sont toujours
          </option>
          <option value={133}>
            Tableau 33.C. - Dur??e moyenne du suivi pour ceux qui y sont toujours
            - liste nominative
          </option>
          <option value={134}>
            Tableau 33.D. ??? Dur??e moyenne du suivi rue et du suivi logement';
            select 'Suivi : moyenne, ecart type et taille echantillon
          </option>
          <option value={135}>
            Tableau 33.D. - Dur??e moyenne du suivi rue et suivi logement - liste
            nominative
          </option>
          <option value={136}>
            TABLEAU XX : REPARTITION DES PATIENTS DANS L???EQUIPE RUE ET L???EQUIPE
            LOGEMENT
          </option>
          <option value={137}>
            TABLEAU XX : REPARTITION DES PATIENTS DANS L???EQUIPE RUE ET L???EQUIPE
            LOGEMENT - liste nominative
          </option>

          <option value={140}>
            Valeurs "autres" pour les pathologies physiques
          </option>
        </Form.Select>
        <a
          onClick={exportCSV}
          className="btn-metis"
          style={{
            // position: "absolute",
            bottom: "0",
            left: "0",
            display: "inline-block",
            marginTop: "1rem",
          }}
        >
          export
        </a>
      </div>
    </>
  );
};

export default Statistiques;

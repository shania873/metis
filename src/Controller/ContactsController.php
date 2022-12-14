<?php

namespace App\Controller;



use App\Entity\Contacts;
use App\Entity\Patients;
use App\Entity\Suggestions;
use App\Entity\FollowupGoals;
use App\Entity\PatientsContacts;
use App\Entity\PatientsPatients;
use App\Entity\ContactsInformation;

use Doctrine\Persistence\ManagerRegistry;
use App\Entity\InformationTemplateElement;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ContactsController extends AbstractController
{

    #[Route('/api/addContact', name: 'app_addContact')]
    public function addContact(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {

        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();

        $type = $request->request->get('type');
        $lastName = $request->request->get('name');
        $firstname = $request->request->get('firstname');
        $orga_id = $request->request->get('organisation');
        $url = $request->request->get('url');
        $description = $request->request->get('description');

        $contact = new Contacts();


        if ($orga_id !== "null") {
            $organisation = $doctrine->getRepository(Contacts::class)->find($orga_id);
            $contact->setOrga($organisation);
        }
        if ($firstname !== "null") {
            $contact->setFirstname($firstname);
        }
        if ($lastName !== "null") {
            $contact->setLastname($lastName);
        }
        if ($type !== "null") {
            $contact->setType($type);
        }

        if ($url !== "null") {
            $contact->setUrl($url);
        }

        if ($description !== "null") {
            $contact->setDescription($description);
        }




        $entityManager->persist($contact);
        $entityManager->flush();




        return $this->json($contact->getId());
    }

    #[Route('/api/getPlacesForSelect', name: 'app_getPlacesForSelect')]
    public function getPlacesForSelect(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {

        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();


        $pati_id = $request->request->get('id');
        $query = $request->request->get('query');

        // dd($query);
        $contacts = $doctrine->getRepository(Contacts::class)->findAvailablePlaces($pati_id, null,  $query);

        $encoders = [new JsonEncoder()];
        $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $calls = [];
        foreach ($contacts as $value) {
            // dd($value);
            if ($value->getDeletedAt() === null) {
                $calls[] = [
                    "value" => $value->getId(),
                    "label" => $value->getFirstName() . " " . $value->getLastName(),

                ];
            }
        }

        // $search_text = 'libou';

        // $arr  = array_filter($calls, function ($el) use ($search_text) {
        //     // dd($el);
        //     return (strpos($el["label"], $search_text) !== false);
        // });



        $jsonObject = $serializer->serialize($calls, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            JsonEncoder::FORMAT,
            [AbstractNormalizer::IGNORED_ATTRIBUTES => ["url", "description", "type", "pathString", "sugg", "patients", "path", "calls", "informations", "cont", "calls", "informations", "occupants"]]
        ]);

        $response =  new Response($jsonObject, 200, ['Content-Type' => 'application/json', 'datetime_format' => 'Y-m-d']);

        $response->setSharedMaxAge(3600);



        return $response;
    }


    #[Route('/api/getContactsForSelect', name: 'app_getContactsForSelect')]
    public function getContactsForSelect(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {

        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();


        $pati_id = $request->request->get('id');
        $query = $request->request->get('query');

        // dd($query);
        $contacts = $doctrine->getRepository(Contacts::class)->findAvailableContacts($pati_id, null,  $query);

        $encoders = [new JsonEncoder()];
        $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $calls = [];
        foreach ($contacts as $value) {
            // dd($value);
            if ($value->getDeletedAt() === null) {
                $calls[] = [
                    "value" => $value->getId(),
                    "label" => $value->getFirstName() . " " . $value->getLastName() . " " . $value->getDescription(),

                ];
            }
        }

        // $search_text = 'libou';

        // $arr  = array_filter($calls, function ($el) use ($search_text) {
        //     // dd($el);
        //     return (strpos($el["label"], $search_text) !== false);
        // });



        $jsonObject = $serializer->serialize($calls, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            JsonEncoder::FORMAT,
            [AbstractNormalizer::IGNORED_ATTRIBUTES => ["url", "description", "type", "pathString", "sugg", "patients", "path", "calls", "informations", "cont", "calls", "informations", "occupants"]]
        ]);

        $response =  new Response($jsonObject, 200, ['Content-Type' => 'application/json', 'datetime_format' => 'Y-m-d']);

        $response->setSharedMaxAge(3600);



        return $response;
    }

    #[Route('/api/getOrganisation', name: 'app_listOrganisation')]
    public function getOrganisation(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {

        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();


        $tags = $request->request->get('tags');
        $query = $request->request->get('query');
        $contacts = $doctrine->getRepository(Contacts::class)->findAllContacts($tags, $query);
        $encoders = [new JsonEncoder()];
        $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $calls = [];



        $jsonObject = $serializer->serialize($contacts, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            JsonEncoder::FORMAT,
            [AbstractNormalizer::IGNORED_ATTRIBUTES => ["url", "description", "type", "pathString", "path", "calls", "informations"]]
        ]);

        $response =  new Response($jsonObject, 200, ['Content-Type' => 'application/json', 'datetime_format' => 'Y-m-d']);

        $response->setSharedMaxAge(3600);



        return $response;
    }

    #[Route('/api/getContacts', name: 'app_listContacts')]
    public function listContacts(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {

        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();


        $tags = $request->request->get('tags');
        $querySearch = $request->request->get('query');
        $contacts = $doctrine->getRepository(Contacts::class)->findAllContacts($tags, $querySearch);
        $encoders = [new JsonEncoder()];
        $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $calls = [];



        $jsonObject = $serializer->serialize($contacts, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            JsonEncoder::FORMAT,
            [AbstractNormalizer::IGNORED_ATTRIBUTES => ["url", "description", "type", "pathString", "path", "calls", "informations"]]
        ]);

        $response =  new Response($jsonObject, 200, ['Content-Type' => 'application/json', 'datetime_format' => 'Y-m-d']);

        $response->setSharedMaxAge(3600);



        return $response;
    }


    #[Route('/api/getContactsPage', name: 'app_allContacts')]
    public function index(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        $contacts = $doctrine->getRepository(Contacts::class)->findPackBySomeField();

        $arrContact = [];
        foreach ($contacts as $value) {
            $arrContact[] = [
                "id" => $value->getId(),
                "firstname" => $value->getFirstName(),
                "lastname" => $value->getLastName(),
                "type" => $value->getType(),
                "numberPatients" => count($value->getPatients()),
                "numberApps" => count($value->getCalls())
            ];
        }

        // dd($contacts);
        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);

        $serializer = new Serializer([new DateTimeNormalizer(), $normalizer], [$encoder]);
        return new Response($serializer->serialize($arrContact, 'json'), 200, ['Content-Type' => 'application/json', 'datetime_format' => 'Y-m-d']);
    }

    #[Route('/api/deleteItem', name: 'app_deleteItem')]
    public function deleteItem(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {
        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();


        $id = $request->request->get('id');
        $contInfo = $doctrine->getRepository(ContactsInformation::class)->find($id);

        $contInfo->setDeletedAt(new \DateTime('now'));
        $entityManager->flush();
        return new JsonResponse([
            'response' => "Delete !",
            'data' => ["id" => $contInfo->getCont()->getId()],
        ]);
    }

    #[Route('/api/saveItem', name: 'app_saveItem')]
    public function saveItem(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {
        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();

        $value = $request->request->get('value');
        $comment = $request->request->get('commentaire');
        $idCont = $request->request->get('idCont');
        $idSugg = $request->request->get('idSugg');
        $type = $request->request->get('type');

        $contactInformation = new ContactsInformation();

        $informationelement = $doctrine->getRepository(InformationTemplateElement::class)->findBy(['suge' => $idSugg]);







        $contact = $doctrine->getRepository(Contacts::class)->find($idCont);

        if ($value !== "null") {
            $contactInformation->setValue($value);
        }

        if ($comment !== "null") {
            $contactInformation->setComment($comment);
        }


        $contactInformation->setContact($contact);
        if ($type !== "null") {
            $typeSugg = $doctrine->getRepository(Suggestions::class)->find($type);
            $contactInformation->setSugg($typeSugg);
        }

        if ($type === "null") {
            $suggestion = $doctrine->getRepository(Suggestions::class)->find($idSugg);
            $contactInformation->setSugg($suggestion);
        }


        $contactInformation->setItel($informationelement[0]);




        $entityManager->persist($contactInformation);
        $entityManager->flush();


        if ($contactInformation) {
            return new JsonResponse([
                'data' => ["id" => $contact->getId()],
                'response' => "Sent !"
            ]);
        }
    }

    #[Route('/api/editItem', name: 'app_editItem')]
    public function editItem(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {
        $entityManager = $doctrine->getManager();
        $request = Request::createFromGlobals();

        $id = $request->request->get('idInfo');
        $value = $request->request->get('value');
        $comment = $request->request->get('commentaire');
        $idCont = $request->request->get('idCont');
        $type = $request->request->get('type');
        $idSugg = $request->request->get('idSugg');
        $contactInfos = $doctrine->getRepository(ContactsInformation::class)->find($id);


        if ($type !== "null") {
            $typeSugg = $doctrine->getRepository(Suggestions::class)->find($type);
            $contactInfos->setSugg($typeSugg);
        }

        if ($type === "null" && $contactInfos->getSugg() !== "null") {
            $suggestion = $doctrine->getRepository(Suggestions::class)->find($idSugg);
            $contactInfos->setSugg($suggestion);
        }



        if ($value !== "null") {
            $contactInfos->setValue($value);
        }

        if ($comment !== "null") {
            $contactInfos->setComment($comment);
        }


        // dd($contactInfos);
        $entityManager->flush();



        $contact = $doctrine->getRepository(Contacts::class)->find($idCont);

        if ($contactInfos) {
            return new JsonResponse([
                'data' => ["id" => $contactInfos->getCont()->getId()],
                'response' => "Sent !"
            ]);
        }
    }

    #[Route('/api/setPlacesToContact', name: 'app_setPlacesToContact')]
    public function setPlacesToContact(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {
        $search = "Place  Cath??drale";
        $new = str_replace(' ', '%20', $search);
        $url = 'https://webservices-pub.bpost.be/ws/ExternalMailingAddressProofingCSREST_v1/address/autocomplete?id=1&q={' . $new . '}1000';

        $httpClient = HttpClient::create();
        $response = $httpClient->request('GET', $url);

        $content = $response->getContent();
        return $this->json(json_decode($content));
    }



    #[Route('/api/getCallsAndOrganisationById', name: 'app_getLastWomenStanding')]
    public function getCallsAndOrganisationById(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {
        $request = Request::createFromGlobals();

        $id = $request->request->get('id');

        if ($id) {
            $contact = $doctrine->getRepository(Contacts::class)->find($id);
        }
        $itbk = $doctrine->getRepository(InformationTemplateElement::class)->findBy(['itbk' => 12]);

        $arritbk = [];
        foreach ($itbk as $value) {
            $arritbk[] = $value->getSuge()->getId();
        }

        $suggestions = $doctrine->getRepository(Suggestions::class)->findBy(array('id' => $arritbk));

        $encoders = [new JsonEncoder()];
        $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $nameOfBlocks = [];

        foreach ($suggestions as $value) {
            $nameOfBlocks[] = ["id" => $value->getId(), "value" => $value->getValue(), "obj" => []];
        }



        $blocksEncode = json_encode($nameOfBlocks);
        $blocksDecode = json_decode($blocksEncode);

        $patients = [];



        foreach ($blocksDecode as $value) {
            foreach ($contact->getInformations() as $infosCont) {
                if ($infosCont->getItel()->getSuge()->getId() === $value->id && $infosCont->getDeletedAt() === null) {
                    array_push($value->obj, ["id" => $infosCont->getId(), "deletedAt" => $infosCont->getDeletedAt(), "valueInformations" => $infosCont->getValue(), "valueDescription" => $infosCont->getComment(), "sugge" => ($infosCont !== null) ? $infosCont->getSugg() : null]);
                }
            }
        }

        // dd($blocksDecode);
        // dd($contact->getPatients()[0]->getCont());
        foreach ($contact->getPatients() as $patient) {

            $patients[] = ["id" => $patient->getPati()->getId(), "firstName" => $patient->getPati()->getFirstName(), "lastName" => $patient->getPati()->getLastName()];
        }



        $jsonObject = $serializer->serialize(["id" => $contact->getId(), "informations" => $blocksDecode, "patients" => $patients, "firstname" => $contact->getFirstName(), "lastname" => $contact->getLastName(), "description" => $contact->getDescription()], 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json', 'datetime_format' => 'Y-m-d']);
    }
    #[Route('/api/getCallsAndOrganisationRunning', name: 'app_getCallsAndOrganisationRunning')]
    public function getCallsAndOrganisationRunning(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {

        $request = Request::createFromGlobals();
        $antenna = $request->request->get('antenna');
        $referent = $request->request->get('referent');
        $typeCalls = $request->request->get('typeCalls');
        $patient = $request->request->get('patient');
        $limitHistoric = $request->request->get('limitHistoric');
        $team = $request->request->get('team');

        $function = $request->request->get('function');
        $followup = $doctrine->getRepository(FollowupGoals::class)->followupGoalsByAntenna(
            $antenna,
            null,
            null,
            null,
            null,
            null,
            FollowupGoals::getStatusForGroup(FollowupGoals::STATUS_GROUP_RUNNING),
            FollowupGoals::TYPE_CALL,
            $patient
        );

        // if ($referent !== "null") {
        //     $filter = $doctrine->getRepository(Suggestions::class)->find(intval($referent));

        //     dd($referent);
        // }


        $arrCont = [];

        foreach ($followup as $key => $value) {
            // dd($value);
            $arrCont[] = $value->getCont()->getId();
        }

        $contact = $doctrine->getRepository(Contacts::class)->findBy(array('id' => $arrCont));

        foreach ($contact as $value) {
            // $value->getId()
            // $fogo = [];
            if ($typeCalls === "running") {

                $fogo = $doctrine->getRepository(FollowupGoals::class)->followupGoalsByAntenna(
                    $antenna,
                    $team,
                    $value->getId(),
                    $function,
                    $referent,
                    $limitHistoric,
                    FollowupGoals::getStatusForGroup(FollowupGoals::STATUS_GROUP_RUNNING),
                    FollowupGoals::TYPE_CALL,
                    $patient
                );
            }

            if ($typeCalls === "closed") {

                $fogo = $doctrine->getRepository(FollowupGoals::class)->findClosedByContact($value->getId(), FollowupGoals::TYPE_CALL, $limitHistoric, $function, $team, $antenna, $referent, $patient);
            }


            foreach ($fogo as $fg) {
                // dd($fg->getPati()->getTeam());

                $value->setGoalsInformation([
                    "id" => ($fg->getId() !== null) ? $fg->getId() : null,
                    "description" => $fg->getDescription(),
                    "type" => $fg->getType(),
                    "status" => $fg->getStatus(),
                    "func" => ($fg->getFunc() !== null && $fg->getFunc()->getId() !== null) ? $fg->getFunc()->getId() : null,
                    "creationDate" => $fg->getCreationDate(),
                    "patientfirstName" => $fg->getPati()->getFirstName(),
                    "pati_id" => $fg->getPati()->getId(),
                    //  "contacts" => $fg->getPati()->getContacts()[0]->getCont(), 
                    "contacts" => array_map(function ($a) {
                        return ["user" => ($a->getContact() !== null && $a->getContact()->getId() !== null) ? $a->getContact()->getId() : null];
                    }, [...$fg->getPati()->getContacts()]),
                    "patientLastName" => $fg->getPati()->getLastName(),
                    "team" => $fg->getPati()->getTeam(),
                    "fore" =>     array_map(function ($a) {
                        return ["user" => ($a->getUser() !== null && $a->getUser()->getId() !== null) ? $a->getUser()->getId() : null, "activityType" => $a->getActivityType(), "content" => $a->getContent(), "date" => $a->getCreationDate()];
                    }, [...$fg->getFore()])
                ]);
            }
        }


        // dd($contact);



        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
        ];

        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);

        $serializer = new Serializer([new DateTimeNormalizer(), $normalizer], [$encoder]);
        $data = $serializer->serialize($contact, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ["contacts", "patients", "cont", "orga", "calls", "informations", "sugg", "occupants"]]);

        return $this->json(json_decode($data));
    }


    #[Route('/api/getCallsAndOrganisationFinnished', name: 'app_getCallsAndOrganisationFinnished')]
    public function getCallsAndOrganisationFinnished(ManagerRegistry $doctrine, SerializerInterface $serializer)
    {
        $contact = $doctrine->getRepository(Contacts::class)->findAll();

        foreach ($contact as $value) {
            $fogo = $doctrine->getRepository(FollowupGoals::class)->findBy(["cont" => $value->getId(), "deleted_at" => null, "type" => 2, "status" => 0]);
            $value->setGoalsInformation($fogo);
        }
        $encoders = [new JsonEncoder()];
        $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);


        $jsonObject = $serializer->serialize($contact, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);


        return new Response($jsonObject, 200, ['Content-Type' => 'application/json', 'datetime_format' => 'Y-m-d']);
    }


    #[Route('/api/setPatientPatient', name: 'app_setPatientPatient')]
    public function setPatientPatient(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $request = Request::createFromGlobals();

        $description = $request->request->get('description');
        $commentaire = $request->request->get('commentaire');
        $patientItemList = $request->request->get('patientItemList');
        $start = $request->request->get('start');
        $end = $request->request->get('end');
        $typeItemList = $request->request->get('typeItemList');
        $idPatient = $request->request->get('idPatient');

        $entityManager = $doctrine->getManager();

        $contact = new PatientsPatients();
        if ($description !== "null") {
            $contact->setLinkDescription($description);
        }
        $pati_item = $doctrine->getRepository(Patients::class)->find($patientItemList);
        $contact->setOrpa($pati_item);

        if ($start !== "null") {
            $contact->setStart(new \DateTime($start));
        }

        if ($end !== "null") {
            $contact->setEnd(new \DateTime($end));
        }
        $sugg_item = $doctrine->getRepository(Suggestions::class)->find($typeItemList);
        $contact->setLinkType($sugg_item);
        $patient = $doctrine->getRepository(Patients::class)->find($idPatient);
        $contact->setTapa($patient);


        $entityManager->persist($contact);
        $entityManager->flush();


        return $this->json(["id" => $contact->getId()]);
    }

    #[Route('/api/updatePatientPatient', name: 'app_updatePatientPatient')]
    public function updatePatientPatient(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $request = Request::createFromGlobals();

        $description = $request->request->get('description');
        $commentaire = $request->request->get('commentaire');
        $patientItemList = $request->request->get('patientItemList');
        $start = $request->request->get('start');
        $end = $request->request->get('end');
        $typeItemList = $request->request->get('typeItemList');
        $idPatient = $request->request->get('idPatient');
        $Idinfos = $request->request->get('Idinfos');

        $entityManager = $doctrine->getManager();

        $contact = $doctrine->getRepository(PatientsPatients::class)->find($Idinfos);
        if ($description !== "null") {
            $contact->setLinkDescription($description);
        }
        $pati_item = $doctrine->getRepository(Patients::class)->find($patientItemList);
        $contact->setOrpa($pati_item);

        if ($start !== "null") {
            $contact->setStart(new \DateTime($start));
        }

        if ($end !== "null") {
            $contact->setEnd(new \DateTime($end));
        }
        $sugg_item = $doctrine->getRepository(Suggestions::class)->find($typeItemList);
        $contact->setLinkType($sugg_item);
        $patient = $doctrine->getRepository(Patients::class)->find($idPatient);
        $contact->setTapa($patient);


        // $entityManager->persist($contact);
        $entityManager->flush();


        return $this->json(["id" => $contact->getId()]);
    }


    #[Route('/api/setPatientContact', name: 'app_setPatientContact')]
    public function setContactPatient(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $request = Request::createFromGlobals();

        $description = $request->request->get('description');
        $commentaire = $request->request->get('commentaire');
        $contactItemList = $request->request->get('contactItemList');
        $start = $request->request->get('start');
        $end = $request->request->get('end');
        $typeItemList = $request->request->get('typeItemList');
        $idPatient = $request->request->get('idPatient');
        $Idinfos = $request->request->get('Idinfos');

        $entityManager = $doctrine->getManager();

        $contact = new PatientsContacts();

        $contact->setLinkDescription($description);
        $cont_item = $doctrine->getRepository(Contacts::class)->find($contactItemList);
        $contact->setContact($cont_item);

        if ($start !== "null") {
            $contact->setStart(new \DateTime($start));
        }

        if ($end !== "null") {
            $contact->setEnd(new \DateTime($end));
        }
        $sugg_item = $doctrine->getRepository(Suggestions::class)->find($typeItemList);
        $contact->setLinkType($sugg_item);
        $patient = $doctrine->getRepository(Patients::class)->find($idPatient);
        $contact->setPatient($patient);


        $entityManager->persist($contact);
        $entityManager->flush();


        return $this->json(["id" => $contact->getId()]);
    }

    #[Route('/api/updatePatientContact', name: 'app_updatePatientContact')]
    public function updatePatientContact(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $request = Request::createFromGlobals();

        $description = $request->request->get('description');
        $commentaire = $request->request->get('commentaire');
        $contactItemList = $request->request->get('contactItemList');
        $start = $request->request->get('start');
        $end = $request->request->get('end');
        $typeItemList = $request->request->get('typeItemList');
        $idPatient = $request->request->get('idPatient');
        $Idinfos = $request->request->get('Idinfos');

        $entityManager = $doctrine->getManager();

        $contact = $doctrine->getRepository(PatientsContacts::class)->find($Idinfos);

        $contact->setLinkDescription($description);
        $cont_item = $doctrine->getRepository(Contacts::class)->find($contactItemList);
        $contact->setContact($cont_item);

        if ($start !== "null") {
            $contact->setStart(new \DateTime($start));
        }

        if ($end !== "null") {
            $contact->setEnd(new \DateTime($end));
        }
        $sugg_item = $doctrine->getRepository(Suggestions::class)->find($typeItemList);
        $contact->setLinkType($sugg_item);
        $patient = $doctrine->getRepository(Patients::class)->find($idPatient);
        $contact->setPatient($patient);


        // $entityManager->persist($contact);
        $entityManager->flush();


        return $this->json(["id" => $contact->getId()]);
    }


    #[Route('/api/setContacts', name: 'app_medias')]
    public function setPatients(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $request = Request::createFromGlobals();

        $firstName = $request->request->get('name');
        $lastName = $request->request->get('description');
        $type = $request->request->get('url');
        $description = $request->request->get('url');
        $url = $request->request->get('url');


        $entityManager = $doctrine->getManager();

        $contact = new Contacts();

        $contact->setFirstname($firstName);
        $contact->setLastname($lastName);
        $contact->setType($type);
        $contact->setDescription($description);
        $contact->setUrl($url);

        $entityManager->persist($contact);
        $entityManager->flush();


        return new JsonResponse([
            'id' => $contact->getId(),
            'response' => "Sent !"
        ]);
    }
}

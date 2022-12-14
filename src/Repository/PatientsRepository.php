<?php

namespace App\Repository;

use App\Entity\Patients;
use App\Entity\ContactsInformation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Patients>
 *
 * @method Patients|null find($id, $lockMode = null, $lockVersion = null)
 * @method Patients|null findOneBy(array $criteria, array $orderBy = null)
 * @method Patients[]    findAll()
 * @method Patients[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PatientsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Patients::class);
    }

    public function add(Patients $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Patients $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findPatientReportsByGoal($patient, $followUpGoalId = null, $keyword = null, $limit = null, $offset = 0)
    {

        $query = 'SELECT r
                FROM App:FollowupReports r
                LEFT JOIN r.cont pl
                WHERE r.pati = :patient';

        $parameters = array('patient' => $patient);
        if (null !== $followUpGoalId) {
            $query .= ' AND r.id IN (
                SELECT distinct r2.id FROM App:FollowupGoals g 
                    JOIN g.fore r2 
                    WHERE r2.pati = :patient AND g.id = :goalId) ';
            $parameters['goalId'] = $followUpGoalId;
        }

        // OR c.firstName like :keyword OR c.lastName like :keyword

        if (null !== $keyword) {
            $query .= ' AND (r.content like :keyword OR pl.firstName like :keyword OR pl.lastName like :keyword)';
            $parameters['keyword'] = '%' . $keyword . '%';
        }

        $query .= " ORDER BY r.report_date DESC, r.id DESC ";

        $query = $this->getEntityManager()
            ->createQuery($query)
            ->setParameters($parameters);

        if (null != $limit) {
            $query->setMaxResults($limit)->setFirstResult($offset);
        }

        // dd($query->getResult());
        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    //    /**
    //     * @return Patients[] Returns an array of Patients objects
    //     */
    public function findPatients($numberPage, $antenna, $searchPatient = null, $searchDatePatient = null, $searchTypeForPatient = null): array
    {

        $parameters = [];
        $parameters["antenna"] = $antenna;
        $q = $this->getEntityManager()->createQueryBuilder();

        $stringPath = '/patient/fiche/information-generale';

        // $id = $patient["id"];



        $q = $this->getEntityManager()->createQueryBuilder();

        $q->select('p')
            ->from('App:Patients', 'p')
            ->andWhere('p.antenna = :antenna')
            ->orderBy('p.lastname', 'ASC')
            ->andWhere('p.deleted_at is NULL');
        // ->setMaxResults($numberPage);



        // dd($searchPatient);
        if ($searchPatient) {
            // dd($searchPatient);
            $q->andWhere('CONCAT(p.lastname,\' \', p.firstname,\' \', COALESCE(p.nicknames, p.id)) LIKE :searchPatient');
            $q->andWhere('CONCAT(p.firstname,\' \', p.lastname,\' \', COALESCE(p.nicknames, p.id)) LIKE :searchPatient');
            $q->andWhere('CONCAT(COALESCE(p.nicknames, p.id), p.firstname,\' \', p.lastname,\' \') LIKE :searchPatient');

            $parameters["searchPatient"] = '%' . $searchPatient . '%';
        }

        if ($searchDatePatient) {
            $q->andWhere('p.birthdate = :searchDatePatient');
            $parameters["searchDatePatient"] = $searchDatePatient;
        }

        if ($searchTypeForPatient) {
            $q->andWhere('p.status = :searchTypeForPatient');
            $parameters["searchTypeForPatient"] = $searchTypeForPatient;
        }

        $q->setParameters($parameters);


        // ->setMaxResults($numberPage);

        // dd($q);


        return $q->getQuery()->getResult();
    }


    public function listPatientsByAntenna($antenna): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.antenna = :antenna AND p.deleted_at IS NULL')
            ->orderBy('p.id', 'ASC')
            ->innerJoin(
                'App:FollowupReports',
                'f',
                'WITH',
                'f.pati = p.id'
            )
            ->setParameters([
                'antenna' => $antenna
            ])
            // ->setMaxResults(1)
            ->getQuery()
            ->getResult();
    }

    public function findByNameByFirstNameByName(string $search, string $antenna): array
    {
        $qb = $this->getEntityManager()->createQueryBuilder();


        $qb->select('p.id, p.lastname, p.firstname, p.nicknames')
            ->from('App:Patients', 'p')
            ->andWhere('CONCAT(p.lastname,\' \', p.firstname,\' \', COALESCE(p.nicknames, p.id)) LIKE :val')
            ->andWhere('p.antenna = :antenna')
            ->setParameters([
                'val' => '%' . $search . '%',
                'antenna' => $antenna
            ])
            ->orderBy('p.id', 'ASC');

        $query = $qb->getQuery();
        return $query->getResult();
    }

    public function findLatestSuggestion($patient, $status = "/patient/fiche/statut-du-suivi")
    {

        $query = 'SELECT 
                    pi.id, pis.value
            FROM App:PatientsInformation pi 
            JOIN pi.sugg pis
            WHERE pi.pati=:patient AND pi.sugg IN (
                SELECT s.id FROM App:Suggestions s 
                JOIN s.parentSugg sp WHERE sp.path_string = :idr_suivi
            )
            ORDER BY pi.start DESC';

        $query = $this->getEntityManager()
            ->createQuery($query)
            ->setParameters([
                'idr_suivi' => $status,
                'patient' => $patient
            ]);

        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    /**
     * @param array $months
     *
     * @return array
     */
    public function findBirthdays($month, $antenna)
    {


        $conn = $this->getEntityManager()->getConnection();
        $query = '                      
                SELECT any_value(p.birthdate) as birthdate, 
                any_value(p.firstname) as firstname, 
                any_value(p.lastname) as lastname, 
                any_value(p.status) as status,
                any_value(p.id) as id
                FROM patients p                                      
                WHERE p.deleted_at is null AND p.antenna = "' . $antenna  . '"      
                GROUP BY MONTH(birthdate), birthdate                 
                HAVING MONTH(birthdate) = "' . $month . '"
                ORDER BY birthdate 
            ';


        $stmt = $conn->prepare($query);
        $resultSet = $stmt->executeQuery();



        // returns an array of arrays (i.e. a raw data set)
        return $resultSet->fetchAllAssociative();
    }


    //    public function findOneBySomeField($value): ?Patients
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

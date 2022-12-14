<?php

namespace App\Entity;

use App\Repository\IndicatorsChoicesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IndicatorsChoicesRepository::class)]
class IndicatorsChoices
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    private ?Indicators $indi = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $score = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIndi(): ?Indicators
    {
        return $this->indi;
    }

    public function setIndi(?Indicators $indi): self
    {
        $this->indi = $indi;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(?int $score): self
    {
        $this->score = $score;

        return $this;
    }
}

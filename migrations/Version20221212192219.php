<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221212192219 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE patients_information DROP FOREIGN KEY FK_B853074DAAD3353B');
        $this->addSql('ALTER TABLE patients_information ADD CONSTRAINT FK_B853074DAAD3353B FOREIGN KEY (itel_id) REFERENCES information_template_element (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE patients_information DROP FOREIGN KEY FK_B853074DAAD3353B');
        $this->addSql('ALTER TABLE patients_information ADD CONSTRAINT FK_B853074DAAD3353B FOREIGN KEY (itel_id) REFERENCES information_template_element (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}

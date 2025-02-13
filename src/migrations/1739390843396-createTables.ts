import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1739390843396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE admin (
        "adminId" SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE client (
        "numCompte" SERIAL PRIMARY KEY,
        "nomClient" VARCHAR(128) NOT NULL,
        solde NUMERIC(15,2) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE retrait (
        "numRetrait" SERIAL PRIMARY KEY,
        "numCheque" VARCHAR(255) NOT NULL,
        montant NUMERIC(15,2),
        "clientNumCompte" INTEGER REFERENCES client("numCompte")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE audit_retrait (
        id SERIAL PRIMARY KEY,
        "typeAction" VARCHAR(255) NOT NULL,
        "dateDeMAJ" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "numRetrait" INTEGER NOT NULL,
        "numCompte" INTEGER NOT NULL,
        "nomClient" VARCHAR(255) NOT NULL,
        "montantAncien" NUMERIC(15,2),
        "montantNouveau" NUMERIC(15,2),
        "utilisateurNumCompte" INTEGER REFERENCES client("numCompte")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE audit_retrait`);
    await queryRunner.query(`DROP TABLE retrait`);
    await queryRunner.query(`DROP TABLE client`);
    await queryRunner.query(`DROP TABLE admin`);
  }
}

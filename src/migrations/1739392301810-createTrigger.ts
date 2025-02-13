import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrigger1739392301810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create the PL/pgSQL function
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION trigger_audit_retrait() 
        RETURNS TRIGGER AS $$
        DECLARE 
        old_montant NUMERIC(15,2);
        new_montant NUMERIC(15,2);
        client_nom VARCHAR(100);
        BEGIN
        IF (TG_OP = 'INSERT') THEN
            old_montant := 0;
            new_montant := NEW.montant;
            UPDATE "client"
            SET solde = solde - new_montant
            WHERE "numCompte" = NEW."clientNumCompte";
            SELECT "nomClient" INTO client_nom FROM "client" WHERE "numCompte" = NEW."clientNumCompte";
            INSERT INTO audit_retrait ("typeAction", "dateDeMAJ", "numRetrait", "numCompte", "nomClient", "montantAncien", "montantNouveau", "utilisateurNumCompte")
            VALUES ('INSERT', CURRENT_TIMESTAMP, NEW."numRetrait", NEW."clientNumCompte", client_nom, old_montant, new_montant, NEW."clientNumCompte");
            RETURN NEW;

        ELSIF (TG_OP = 'UPDATE') THEN
            old_montant := OLD.montant;
            new_montant := NEW.montant;
            UPDATE "client"
            SET solde = solde + old_montant - new_montant
            WHERE "numCompte" = NEW."clientNumCompte";
            SELECT "nomClient" INTO client_nom FROM "client" WHERE "numCompte" = NEW."clientNumCompte";
            INSERT INTO audit_retrait ("typeAction", "dateDeMAJ", "numRetrait", "numCompte", "nomClient", "montantAncien", "montantNouveau", "utilisateurNumCompte")
            VALUES ('UPDATE', CURRENT_TIMESTAMP, NEW."numRetrait", NEW."clientNumCompte", client_nom, old_montant, new_montant, NEW."clientNumCompte");
            RETURN NEW;

        ELSIF (TG_OP = 'DELETE') THEN
            old_montant := OLD.montant;
            new_montant := 0;
            UPDATE "client"
            SET solde = solde + old_montant
            WHERE "numCompte" = OLD."clientNumCompte";
            SELECT "nomClient" INTO client_nom FROM "client" WHERE "numCompte" = OLD."clientNumCompte";
            INSERT INTO audit_retrait ("typeAction", "dateDeMAJ", "numRetrait", "numCompte", "nomClient", "montantAncien", "montantNouveau", "utilisateurNumCompte")
            VALUES ('DELETE', CURRENT_TIMESTAMP, OLD."numRetrait", OLD."clientNumCompte", client_nom, old_montant, new_montant, OLD."clientNumCompte");
            RETURN OLD;
        END IF;
        END;
        $$ LANGUAGE plpgsql;


        `);

    // 2. Bind the trigger to the retrait table
    await queryRunner.query(`
          CREATE TRIGGER audit_retrait_trigger
          AFTER INSERT OR UPDATE OR DELETE ON retrait
          FOR EACH ROW
          EXECUTE FUNCTION trigger_audit_retrait();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the trigger and function
    await queryRunner.query(`DROP TRIGGER audit_retrait_trigger ON retrait`);
    await queryRunner.query(`DROP FUNCTION trigger_audit_retrait`);
  }
}

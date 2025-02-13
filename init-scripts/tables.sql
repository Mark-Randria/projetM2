CREATE TABLE IF NOT EXISTS admin (
    "adminId" SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS client (
    "numCompte" SERIAL PRIMARY KEY,
    "nomClient" VARCHAR(128) NOT NULL,
    solde NUMERIC(15,2) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS retrait (
    "numRetrait" SERIAL PRIMARY KEY,
    "numCheque" VARCHAR(255) NOT NULL,
    montant NUMERIC(15,2),
    "clientNumCompte" INTEGER REFERENCES client("numCompte")
);

CREATE TABLE IF NOT EXISTS audit_retrait (
    id SERIAL PRIMARY KEY,
    "typeAction" VARCHAR(255) NOT NULL,
    "dateDeMAJ" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "numRetrait" INTEGER NOT NULL,
    "numCompte" INTEGER NOT NULL,
    "nomClient" VARCHAR(255) NOT NULL,
    "montantAncien" NUMERIC(15,2),
    "montantNouveau" NUMERIC(15,2),
    "utilisateurNumCompte" INTEGER REFERENCES client("numCompte")
);
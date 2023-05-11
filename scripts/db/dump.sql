CREATE SCHEMA IF NOT EXISTS pf;
CREATE TABLE IF NOT EXISTS pf.child
(
    cid  SERIAL PRIMARY KEY,
    fname text COLLATE pg_catalog."default",
    lname text COLLATE pg_catalog."default",
    dob text COLLATE pg_catalog."default",
    school text COLLATE pg_catalog."default",
    pronouns text COLLATE pg_catalog."default",
    notes text COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS pf.childrelationship
(
    rid  SERIAL PRIMARY KEY,
    cid integer,
    email text COLLATE pg_catalog."default",
    isparent boolean
);

CREATE TABLE IF NOT EXISTS pf.events
(
    eid  SERIAL PRIMARY KEY,
    author text COLLATE pg_catalog."default",
    cid integer,
    stat text COLLATE pg_catalog."default" DEFAULT 'pending'::text,
    title text COLLATE pg_catalog."default",
    descrip text COLLATE pg_catalog."default",
    eventdate text COLLATE pg_catalog."default",
    eventcreated text COLLATE pg_catalog."default",
    eventlocation text COLLATE pg_catalog."default",
    approvedby text COLLATE pg_catalog."default" DEFAULT 'null'::text
);

CREATE TABLE IF NOT EXISTS pf.log
(
    lid  SERIAL PRIMARY KEY,
    eid integer,
    mentoremail text COLLATE pg_catalog."default",
    duration numeric
);

CREATE TABLE IF NOT EXISTS pf.registerrequests
(
    email text COLLATE pg_catalog."default" NOT NULL,
    fname text COLLATE pg_catalog."default",
    lname text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    pronouns text COLLATE pg_catalog."default",
    daterequested text COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS pf.sessions
(
    sid text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default",
    notiftoken text COLLATE pg_catalog."default"
);

CREATE TABLE IF NOT EXISTS pf.users
(
    email text COLLATE pg_catalog."default" NOT NULL,
    fname text COLLATE pg_catalog."default",
    lname text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    pronouns text COLLATE pg_catalog."default"
);

INSERT INTO pf.users (email, fname, lname, role, phone, pronouns) VALUES ('null', '', '', '', '', '');
INSERT INTO pf.users (email, fname, lname, role, phone, pronouns) VALUES ('kahnareeba@gmail.com', 'Areeba', 'Khan', 'admin', '314-745-9208', 'She/her/hers');
INSERT INTO pf.users (email, fname, lname, role, phone, pronouns) VALUES ('dschoenbauer@gmail.com', 'David', 'Schoenbauer', 'admin', '651-226-1901', 'He/Him/His');

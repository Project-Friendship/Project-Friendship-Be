CREATE SCHEMA IF NOT EXISTS pf;
CREATE TABLE IF NOT EXISTS pf.child
(
    cid integer NOT NULL DEFAULT nextval('pf.child_cid_seq'::regclass),
    fname text COLLATE pg_catalog."default",
    lname text COLLATE pg_catalog."default",
    dob text COLLATE pg_catalog."default",
    school text COLLATE pg_catalog."default",
    pronouns text COLLATE pg_catalog."default",
    notes text COLLATE pg_catalog."default",
    CONSTRAINT child_pkey PRIMARY KEY (cid)
);

CREATE TABLE IF NOT EXISTS pf.childrelationship
(
    rid integer NOT NULL DEFAULT nextval('pf.childrelationship_rid_seq'::regclass),
    cid integer,
    email text COLLATE pg_catalog."default",
    isparent boolean,
    CONSTRAINT childrelationship_pkey PRIMARY KEY (rid)
);

CREATE TABLE IF NOT EXISTS pf.events
(
    eid integer NOT NULL DEFAULT nextval('pf.events_eid_seq'::regclass),
    author text COLLATE pg_catalog."default",
    cid integer,
    stat text COLLATE pg_catalog."default" DEFAULT 'pending'::text,
    title text COLLATE pg_catalog."default",
    descrip text COLLATE pg_catalog."default",
    eventdate text COLLATE pg_catalog."default",
    eventcreated text COLLATE pg_catalog."default",
    eventlocation text COLLATE pg_catalog."default",
    approvedby text COLLATE pg_catalog."default" DEFAULT 'null'::text,
    CONSTRAINT events_pkey PRIMARY KEY (eid)
);

CREATE TABLE IF NOT EXISTS pf.log
(
    lid integer NOT NULL DEFAULT nextval('pf.log_lid_seq'::regclass),
    eid integer,
    mentoremail text COLLATE pg_catalog."default",
    duration numeric,
    CONSTRAINT log_pkey PRIMARY KEY (lid)
);

CREATE TABLE IF NOT EXISTS pf.registerrequests
(
    email text COLLATE pg_catalog."default" NOT NULL,
    fname text COLLATE pg_catalog."default",
    lname text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    pronouns text COLLATE pg_catalog."default",
    daterequested text COLLATE pg_catalog."default",
    CONSTRAINT registerrequests_pkey PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS pf.sessions
(
    sid text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default",
    notiftoken text COLLATE pg_catalog."default",
    CONSTRAINT sessions_pkey PRIMARY KEY (sid)
);

CREATE TABLE IF NOT EXISTS pf.users
(
    email text COLLATE pg_catalog."default" NOT NULL,
    fname text COLLATE pg_catalog."default",
    lname text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    pronouns text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (email)
);

INSERT INTO pf.users (email, fname, lname, role, phone, pronouns) VALUES ('null', '', '', '', '', '', '');
INSERT INTO pf.users (email, fname, lname, role, phone, pronouns) VALUES ('kahnareeba@gmail.com', 'Areeba', 'Khan', 'admin', '314-745-9208', 'She/her/hers');

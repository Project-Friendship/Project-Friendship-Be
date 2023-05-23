CREATE SCHEMA IF NOT EXISTS pf;
CREATE TABLE IF NOT EXISTS pf.user
(
    id integer NOT NULL DEFAULT nextval('pf.user_id_seq'::regclass),
    fname text COLLATE pg_catalog."default",
    lname text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    dob text COLLATE pg_catalog."default",
    school text COLLATE pg_catalog."default",
    pronouns text COLLATE pg_catalog."default",
    notes text COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pf.role
(
    id integer NOT NULL DEFAULT nextval('pf.role_id_seq'::regclass),
    roleName integer,
    CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pf.account
(
    id integer NOT NULL DEFAULT nextval('pf.account_id_seq'::regclass),
    userId integer,
    groupId integer,
    roleId integer,
    isparent boolean,
    CONSTRAINT account_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pf.group
(
    id integer NOT NULL DEFAULT nextval('pf.group_id_seq'::regclass),
    groupName text COLLATE pg_catalog."default",
    CONSTRAINT group_pkey PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS pf.events
(
    eid integer NOT NULL DEFAULT nextval('pf.events_eid_seq'::regclass),
    author text COLLATE pg_catalog."default",
    childId integer,
    stat text COLLATE pg_catalog."default" DEFAULT 'pending'::text,
    title text COLLATE pg_catalog."default",
    descrip text COLLATE pg_catalog."default",
    eventdate text COLLATE pg_catalog."default",
    eventcreated text COLLATE pg_catalog."default",
    eventlocation text COLLATE pg_catalog."default",
    approvedby text COLLATE pg_catalog."default" DEFAULT 'null'::text,
    CONSTRAINT events_pkey PRIMARY KEY (eid)
);

CREATE TABLE IF NOT EXISTS pf.sessions
(
    sid text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default",
    notiftoken text COLLATE pg_catalog."default"
);

INSERT INTO pf.user (email, fname, lname, role, phone, pronouns) VALUES ('null', '', '', '', '', '', '');
INSERT INTO pf.user (email, fname, lname, role, phone, pronouns) VALUES ('kahnareeba@gmail.com', 'Areeba', 'Khan', 'admin', '314-745-9208', 'She/her/hers');
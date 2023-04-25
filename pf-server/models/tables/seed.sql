CREATE SCHEMA IF NOT EXISTS pf;
create table pf.child (
    cid serial primary key,
    fname text,
    lname text,
    dob text,
    school text,
    pronouns text,
    notes text
);
create table pf.childrelationship (
    rid serial primary key,
    cid int,
    email text,
    isParent boolean
);
-- set up relationship table
-- pending, approved, expired/completed/removed
create table pf.events (
    eid serial primary key,
    author text,
    cid int,
    stat text default 'pending',
    title text,
    descrip text,
    eventDate text,
    eventCreated text,
    eventLocation text,
    approvedBy text default 'null'
);

-- stat:
---- pending: event created and is pending approval
---- edited: event time was edited by a user and request was resent for event
---- completed: event was completed and logged
---- expired: event request was not approved before the time expired...

create table pf.log (
    lid serial primary key,
    eid int,
    mentorEmail text,
    duration numeric
);


-- INSERT INTO events (author, participant, stat, title, descrip, eventDate) VALUES;

-- Added a column for eventLocation
-- ALTER TABLE events  ADD COLUMN IF NOT EXISTS eventLocation text
-- ALTER TABLE events RENAME COLUMN author TO mentor;
-- ALTER TABLE events RENAME COLUMN participant TO cid;

-- create table eventChangeRequests (
--     eid text, 
--     creator text,
--     reciever text,
--     status text default 'pending' -- pending, approved
    
-- ); 


-- creates table for profiles
-- if login does not exists, email is set to  

create table pf.users (
    email text primary key,
    fname text,
    lname text,
    role text,
    phone text,
    pronouns text
);

-- important inserts to begin:
INSERT INTO pf.users (email, fname, lname, role, phone, pronouns) VALUES ('null', '', '', '', '', '', '');
INSERT INTO pf.users (email, fname, lname, role, phone, pronouns) VALUES ('kahnareeba@gmail.com', 'Areeba', 'Khan', 'admin', '314-745-9208', 'She/her/hers');

-- example insert
-- INSERT INTO users (email, fname, lname, role, phone) VALUES ('khan6@stolaf.edu', 'Areeba', 'Khan', 'mentor', '123-456-7890', 'She/her/hers');

-- Adding pronouns for parents and users 
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS pronouns text;


-- table of users that have requested to sign up
create table pf.registerRequests (
    email text primary key,
    fname text,
    lname text,
    role text,
    phone text,
    pronouns text,
    daterequested text
);

-- create table approvedEmails (
--     email text primary key,
--     role text
-- );

drop table pf.sessions;

create table pf.sessions (
    sid text primary key, -- secure session key
    email text,            -- authenticated email 
    notiftoken text
);

create function email(text) returns text as $$
    select email from sessions where sid = $1;
$$ language 'sql';

-- -- postgres function update_profile()
-- --    3 args type text: email, fname, lname, role, phone
-- --    no return
-- create function approveUserRegistration(text, text, text, text, text) returns void as $$
--     DELETE FROM registerrequests WHERE email = $1;
--     INSERT INTO users VALUES ($1, $2, $3, $4, $5);
-- $$ language 'sql';



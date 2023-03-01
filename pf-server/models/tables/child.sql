create table child (
    cid SERIAL primary key,
    fname text,
    lname text,
    dob text,
    school text,
    pronouns text,
    notes text
);

-- Add notes 
-- ALTER TABLE child ADD COLUMN IF NOT EXISTS notes text;
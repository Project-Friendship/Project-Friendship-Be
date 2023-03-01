# Project Friendship App

The **Project Friendship Mobile Application** serves the purpose of connecting St. Olaf and Carleton College students to their mentee's parents to schedule hangouts and events. Also allows for a mean to emergency contact the PF organization or other alert other St. Olaf/Carleton students of any emergencies. 

Here is the initial prototype created in July: [Google Presentation](https://docs.google.com/presentation/d/1YQho84Fd8_VQ12D2q5Jli4o7HsH273ovf5yKlhiTxSM/edit).

## Technologies Used

**NodeJS** - Creating Express.js RESTful API server in MVC environemnt. 

**React Native** - Frontend.

**PostgreSQL** - backend database.

**AWS** - deployment of Express.js server.

**Expo** - SDK environment. 

## Features

Incoming features for baseline deployment are marked with a `*` character.

* **Registration**: the registration screen ensures that every field is complete before sending a registration request to the database. An admin can then approve, edit, deny this request as they please.

* **Google OAuth User Login**: after registration is completed and approved, users can login using their gmail account using safe, passwordless Google Authentication. An admin can still edit user email, phone number and every account detail, even being able to delete the account with cascading delete API calls to the backend to ensure user privacy*. 

* **Phone Number Login\***: for parents who do not have a gmail account, to allow for more accessibility, I would like to allow for phone-number login. To avoid storing phone number in our PF database, password hashing will be used. 

* **Profile page**
    **Mentor's View**:

        My Profile: Mentor is able to view their profile and private information. Mentors must contact admin to edit their personal information for security purposes.

        My Relationships: Mentors can click on this tab to see information about their mentee(s). This includes their pronouns, birth date, any notes on allergies or activities the child likes, and parents' contact information available in case of emergency. Mentor's have QR codes that parents can scan and assign given mentor to a child*. Mentors can scan a child's QR code to add that child to their relationship, so they can start sending event requests. For security purposes, mentors cannot delete their relationships once they've created it with a child (admin will have to handle this).

        Logs: mentors only - mentors of the Project Friendship community will have access to their previously completed events, the number of hours spent at each, and total hours contributed through the duration of their time at the program.

    **Parent's View**:

        My Profile: Parent is able to view their profile and private information. Parents must contact admin to edit their personal information for security purposes.

        My Relationships: Parents can click on this tab to browse all their chidren and their children's mentors. Here, parents can add children, but not delete them to ensure that data is not accidentally lost. Upon creation of a child, parents can assign pronouns, name of their school, and notes on any alergies or activities their kids enjoy. Every child will have a generated barcode. Parents can click on the barcode button to have their unique barcodes pop up, ready to be scanned. Upon scanning, parents can add their children from other parent's profile to see all their activities and even approve events. Each relationship card will also hold whether the child has a mentor, mentor's valid personal information, and clickables to allow texting and calling to mentor whenever necessary. 

        Parents do not have to log events, thus do not have a log tab. 

* **Events Page**: This page has 3 components: a button to create events where you can select which child you want to request an event for from the parents view, and similarly, mentors can request an event to child's parents. Next component is a "Required Actions" section. This includes events that you've created in the past that are pending approval or events that are pending your approval created by the other client, new edited time suggestions for events created by either you or the other client of the app, and if you're a mentor, it will ask for events to be logged. Finally, there is a "Upcoming Events" section that holds events that have been approved and are coming up. This section also has a call button, which allows mentors to call the parent that approved this event and allows parent to call mentors of the child this event is scheduled with to allow for quick access for emergency calls if need be. 

* **Mentor's Thread Wall**: coming soon.
* **Alert Page**: coming soon.

## Extra Features
* **"Delete My Account" Button**: An extra feature would be to have a "Delete My Account" requesting button that an admin can approve for retiring St. Olaf/Carleton students from the PF program*.

* **Admin Relationships Access**: Admin can create, alter and delete relationships. Admin can also add a new child to the profile of a parent.

* **Mentee Accounts**: Older mentees can have their own account. To reduce the scope of this project given limited resources (time and the number of people working on this project), we decided not to focus on this. Parent accounts are very important to ensure that they are aware of their child's location at all times.

## Setup 

### Environment Version
* node.js `v16.14.0`
* npm -v `8.3.1`

### Instructions using anansi.stolaf.edu hosted PSQL server
1. Have a `.pgpass` file with PostgreSQL schema password.
1. Copy/paste psql tables into PostgreSQL schema from `psql-tables` folder. 
1. In lib files, you will have to go through every file and change the url route for the database to your own url (I will work on making this easier to do using a secret file). You can obtain the relavent IP address by going into path `/pf-server`, do `npm i` to install dependencies, and then `npm run deploy` to start running the server. One of the IP addresses shown is the one you swap the url IP address with. 
1. Now to start the frontend, run `npm i` in the base directory of the repo.
1. Finally, run `expo start`, scan the QR code!

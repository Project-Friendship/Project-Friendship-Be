var express = require('express');
var bodyParser = require('body-parser');

const { Pool } = require('pg');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Project Friendship API",
      description: "API created for the Project Friendship Mobile App.",
      contact: {
        name: "Areeba Khan"
      },
      servers: ["http://192.168.1.214:3001"]
    }
  },
  apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

var app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.urlencoded({ extended: true }))

const usersRoute = require("./routes/Users");
const registerRoute = require("./routes/Register");
const relationshipRoute = require("./routes/Relationship");
const sessionsRoute = require("./routes/Sessions");
const eventsRoute = require("./routes/Events");
const eventLogs = require("./routes/EventLogs");
const childRoute = require("./routes/Child");
const childRelationshipRoute = require("./routes/ChildRelationship");

app.use('/users', usersRoute);
app.use('/register', registerRoute);
app.use('/relationship', relationshipRoute);
app.use('/sessions', sessionsRoute);
app.use('/events', eventsRoute);
app.use('/log', eventLogs);
app.use('/child', childRoute);
app.use('/childrs', childRelationshipRoute);
 

app.use(function(request, response, next) {
  // catch 404 and forward to error handler
  console.error("EEError!");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  //response.locals.error = request.app.get('env') === 'development' ? err : {};
  response.locals.error = err;

  // render the error page
  response.status(err.status || 500);
});

module.exports = app;

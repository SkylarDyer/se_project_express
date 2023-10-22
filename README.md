# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. This project offers a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine.

## Express JS

Express.js is responsible for creating the sever, creating routes, listening for http requests, and then routing those requests appropriately.

## Database & Mapper

MongoDB is used in conjunction with a Mongoose, an object data modeling library that's used to interact with MongoDB. Mongoose is used to define the shape of the documents that get stored in MongoDB via Mongoose schemas. Models in Mongoose are used to create, cast, store, delete, & query data.

## Validation

Validator.js is used to verify that certain properties in the database schemas are valid. If invalid, error responses are sent to the user.

### Hot Reload

This backend project uses nodemon to enable hot reloading, or the ability for the server to refresh itself whenever source code is changed.

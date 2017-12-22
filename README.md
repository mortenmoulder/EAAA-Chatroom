# EAAA Chatroom
This whole project was an exam assignment. I chose to use the following frameworks and libraries:

* Ionic 3
* Angular 4 (or 2? or .io? nobody knows)
* TypeScript
* NodeJS
* Mongoose
* Express
* Socket.io

## Project information
I have two folders:

* Server
* Client

These contains the project files for each project. The `Client/` obviously contains Ionic, Angular, and so on. The `Server/` contains the NodeJS backend.

## Installation guide
To run my project, you need to do the following things:

  1. Extract the two folders (Client and Server) into a folder
  2. Open up two CLIs and cd into both Client/ and Server/
  3. Start the server by doing:
      1. `npm install`
      2. `node app.js`
  
To start the client, make sure ionic is installed first, then do:

  1. `npm install`
  2. `ionic serve`
  2. It should now open a browser on http://localhost:8100

## How to test it

  1. Make sure the project can be run (see “How to run it”)
  2. Open up another CLI and run this command:
     1. `npm test`
  3. A browser window should open up with Jasmine, which should return all the tests as passed

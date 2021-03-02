# Introduction
Server-side events stream implementation using Node.js and TypeScript.

# How do I use it?
`npm install`

`npm start`


In one terminal window, issue the following command:

`curl -H "Accept: text/event-stream" http://127.0.0.1:3000/events`


In a second terminal window, issue the following commands:

`curl -X POST -H "Content-Type: application/json" -d '{"name":"test"}' http://127.0.0.1:3000/entity`

`curl -X PUT -H "Content-Type: application/json" -d '{"name":"update"}' http://127.0.0.1:3000/entity/<entity id>`

`curl -X DELETE -H "Content-Type: application/json" http://127.0.0.1:3000/entity/<entity id>`


In the first terminal window you will see a stream of events similar to the following:

`data: {"type":"Created","entity":{"name":"test","id":"<entity id>"}}`

`data: {"type":"Updated","entity":{"name":"update","id":"<entity id>"}}`

`data: {"type":"Deleted","entity":{"name":"update","id":"<entity id>"}}`

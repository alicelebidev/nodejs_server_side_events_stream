import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import SSE from "express-sse-ts";

const app = express();
const sse = new SSE(); // required for the server-side event streaming.

// Future proofing a bit...
// May need to allow connections from front-end app in future.
app.use(cors());

// Use Body-parser middleware to parse incoming request bodies.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register application routes.
require('./core/routes')(app, sse);

// Listen for incoming connections on specified port.
app.listen(3000, () => console.log('Server running on port 3000.'));

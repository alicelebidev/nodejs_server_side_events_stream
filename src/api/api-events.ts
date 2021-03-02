/*
    Exposes a set of RESTful API end-points for the event subject area. 
*/

import { Request, Response } from 'express';
import { EventsDao } from '../dao/dao-events';
import { OperationResultSet, EventOps } from '../models/app-models';

module.exports = function(app: any, sse: any) {

    /*
        Perform server-side event streaming.
    */
    app.get('/events', sse.init); // Initialise SSE. Default retry time is 5000 ms.

    /*
        Creates an event with provided name.
    */
    app.post('/entity', (req: Request, res: Response) => {
        const reqBody = req.body;
        if (reqBody && reqBody.name) {
            let eventDao: EventsDao = new EventsDao();
            const result: OperationResultSet = eventDao.createEvent(reqBody.name);
            // console.log('api - post req - created event record: ' + JSON.stringify(result));
            if (result && result.data) {
                const payload = { "type": EventOps.created, "entity": {"name": reqBody.name, "id": result.data.data.id} };
                sse.send(JSON.stringify(payload));
                res.status(200).send(`Event "${reqBody.name}" created.`);
            } else if (result && result.errorMsg) {
                res.status(400).send(result.errorMsg);
            }
        } else {
            res.status(400).send('Bad request. Event name is missing!');
        }
    });

    /*
        Updates an event with provided event ID and name values.
    */
    app.put('/entity/:id', (req: Request, res: Response) => {
        const eventID: string = req.params.id;
        if (!eventID) {
            res.status(400).send('Bad request. Event ID is missing!');
        }
        const reqBody = req.body;
        if (reqBody && reqBody.name) {
            let eventDao: EventsDao = new EventsDao();
            const result: OperationResultSet = eventDao.updateEvent(eventID, reqBody.name);
            if (result && result.data) {
                const payload = { "type": EventOps.updated, "entity": {"name": reqBody.name, "id": result.data.data.id} };
                sse.send(JSON.stringify(payload));
                res.status(200).send(`Event "${reqBody.name}" with ID "${eventID}" updated!`);
            } else if (result && result.errorMsg) {
                res.status(400).send(result.errorMsg);
            }
        } else {
            res.status(400).send('Bad request. Event name is missing!');
        }
    });

    /*
        Deletes an event with provided event ID.
    */
    app.delete('/entity/:id', (req: Request, res: Response) => {
        const eventID: string = req.params.id;
        if (!eventID) {
            res.status(400).send('Bad request. Event ID is missing!');
        }

        let eventDao: EventsDao = new EventsDao();
        const result: OperationResultSet = eventDao.deleteEvent(eventID);
        if (result && result.data) {
            const payload = { "type": EventOps.deleted, "entity": {"name": result.data.name, "id": result.data.id} };
            sse.send(JSON.stringify(payload));
            res.status(200).send(`Event with ID "${eventID}" deleted!`);
        } else if (result && result.errorMsg) {
            res.status(400).send(result.errorMsg);
        }
    });

}

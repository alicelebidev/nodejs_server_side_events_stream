/*
    Data Access Object (DAO) for the event subject area.
*/

import { OperationResultSet } from '../models/app-models';

const _ = require('lodash');

export class EventsDao {

    database: any = require('../core/database');

	constructor() {}

    createEvent(eventName: string): OperationResultSet {
        const event: Object = this.database.findByName(eventName);
        if (_.isEmpty(event)) {
            const result = this.database.create(eventName);
            return { data: result } as OperationResultSet;
        } else {
            return { data: undefined, errorMsg: `Creating event failed. Event name "${eventName}" already exist!` }
        }
    }

    updateEvent(eventID: string, eventName: string): OperationResultSet {
        const event: Object = this.database.findByID(eventID);
        if (_.isEmpty(event)) {
            return { data: undefined, errorMsg: `Updating event failed. Event with ID "${eventID}" does not exist!` }
        } else {
            const result = this.database.update(eventID, eventName);
            return { data: result } as OperationResultSet;
        }
    }

    deleteEvent(eventID: string): OperationResultSet {
        const event: Object = this.database.findByID(eventID);
        if (_.isEmpty(event)) {
            return { data: undefined, errorMsg: `Deleting event failed. Event with ID "${eventID}" does not exist!` }
        } else {
            const result = this.database.remove(eventID);
            return { data: result } as OperationResultSet;
        }
    }

}

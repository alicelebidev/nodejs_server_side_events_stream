/*
    Creates in-memory database to store documents.
    Performs basic CRUD operations on the event collection.
*/

import loki from 'lokijs';
import { v4 as uuidv4 } from 'uuid';
import { EntityRecord, DatabaseResultSet } from '../models/app-models';

// Create in-memomry DB.
const db = new loki('database');

let eventsCollection = db.getCollection('events');

if (!eventsCollection) {
    // console.log('eventsCollection does not exist. Creating it now...');
    eventsCollection = db.addCollection('events', { unique: ["name"] } );
}

module.exports = {
    // Find an event document by given name.
    findByName: function(_name: string) {
        try {
            const record = eventsCollection.findOne({ 'name': _name });
            if (record) {
                return record;
            }
            return null;
        } catch(error) {
            return null;
        }
    },

    // Find an event document by given event ID.
    findByID: function(_id: string) {
        try {
            const record = eventsCollection.findOne({ 'id': _id });
            if (record) {
                return record;
            }
            return null;
        } catch(error) {
            return null;
        }
    },

    // Create an event document.
    create: function(_name: string): DatabaseResultSet {
        try {
            const record: EntityRecord = { name: _name, id: uuidv4() };
            const result = eventsCollection.insert(record);
            return { data: result } as DatabaseResultSet;
        } catch(error) {
            return { data: undefined, errorMsg: 'Inserting into Events collection failed!' } as DatabaseResultSet;
        }
    },

    // Update an event document with given ID and name.
    update: function(_id: string, _name: string): DatabaseResultSet {
        try {
            let doc = eventsCollection.by("id", _id);
            doc.name = _name;
            const result = eventsCollection.update(doc);
            return { data: result } as DatabaseResultSet;
        } catch(error) {
            return { data: undefined, errorMsg: 'Updating Events collection failed!' } as DatabaseResultSet;
        }
    },

    // Delete an event document by given event ID.
    remove: function(_id: string) {
        try {
            let doc = eventsCollection.by("id", _id);
            const result = eventsCollection.remove(doc);
            return result;
        } catch(error) {
            return null;
        }
    }
};

export const enum EventOps {
    created = 'Created',
    updated = 'Updated',
    deleted = 'Deleted'
};

export interface EntityRecord {
    name: string;
    id: string;
}

interface ResultSet {
    data: any;
    errorMsg?: string;
}

export interface OperationResultSet extends ResultSet {}

export interface DatabaseResultSet extends ResultSet {}

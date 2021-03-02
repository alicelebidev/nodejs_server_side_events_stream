import {Request, Response} from 'express';

module.exports = function(app: any, sse: any) {

    app.get('/', (req: Request, res: Response) => {
        res.send('Wollit BE test application is running.');
    });

    /*
        Application APIs are defined in separate files.
    */
    require('../api/api-events')(app, sse);
}

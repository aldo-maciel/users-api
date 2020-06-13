import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import handleError from '@/shared/errors/error.service';
import { Routes } from '@/config/routes.config';

class App {
    public app: Application = express();

    constructor() {
        this.app = express();
        this.config();
    }

    private async config(): Promise<void> {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());

        new Routes().config(this.app);
        this.app.use(handleError);

        this.app.use(express.static(path.join(__dirname, '..', 'ui-view', 'build')));
    }
}

export default new App().app;

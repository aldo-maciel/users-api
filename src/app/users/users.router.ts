import { Router } from 'express';

import { UsersController } from '@/app/users/users.controller';

export class UsersRouter {
    private router: Router = Router();
    private path: string = '/users';
    private readonly ctrl: UsersController = new UsersController();

    constructor() {
        this.createRoutes();
    }

    get routes(): Router {
        return this.router;
    }

    private createRoutes() {
        this.router
            .get(this.path, this.ctrl.findAll)
            .get(`${ this.path }/:username/details`, this.ctrl.getUser)
            .get(`${ this.path }/:username/repos`, this.ctrl.getRepos);
    }
}

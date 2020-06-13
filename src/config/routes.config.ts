import { Application } from 'express';

import { UsersRouter } from '@/app/users/users.router';

export class Routes {
    public servicesRouter = new UsersRouter();

    public static get BASE_URL() {
        return '/api/v1';
    }

    public config(app: Application): void {
        const baseUrl = Routes.BASE_URL;

        app.use(baseUrl, this.servicesRouter.routes);
    }
}

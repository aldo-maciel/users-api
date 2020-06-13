import { Request, Response } from 'express';

import { UsersService } from '@/app/users/users.service';
import { handleError } from '@/shared/errors/error.service';
import { MandatoryParamError } from '@/shared/errors/mandatory-param.error';
import { IPagination } from '@/shared/components/pagination/pagination';

export class UsersController {
    private static readonly service: UsersService = new UsersService();

    /**
     * Get all records on database
     *
     * @param req
     * @param res
     */
    public async findAll(req: Request, res: Response) {
        try {
            const params = req.query as unknown as IPagination;

            const data = await UsersController.service.findAll(params);

            res.json(data);
        } catch (error) {
            handleError(req, res, error);
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const { username } = req.params;
            if (!username) {
                throw new MandatoryParamError('login param is mandatory');
            }

            const user = await UsersController.service.getUser(username);

            res.json(user);
        } catch (error) {
            handleError(req, res, error);
        }
    }

    public async getRepos(req: Request, res: Response) {
        try {
            const { username } = req.params;
            if (!username) {
                throw new MandatoryParamError('login param is mandatory');
            }

            const repos = await UsersController.service.getRepos(username);

            res.json(repos);
        } catch (error) {
            handleError(req, res, error);
        }
    }
}

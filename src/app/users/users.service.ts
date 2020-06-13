import axios from 'axios';

import logger from '@/shared/logger.service';
import { IPagination, Pagination } from '@/shared/components/pagination/pagination';
import { User } from '@/app/users/user';
import { properties } from '@/properties';
import { Repo } from '@/app/repos/repo';

export class UsersService {

    @Pagination
    public async findAll(pagination: IPagination): Promise<Array<User>> {
        logger.debug('finding users');
        logger.debug('pagination', pagination);

        const { data } = await axios.get<Array<User>>(properties.externalApis.users, {
            params: {
                per_page: pagination.step,
                since: pagination.start
            }
        });

        logger.debug('users', data.length);
        return data;
    }

    async getUser(login: string): Promise<User> {
        logger.debug('getting user: ', login);

        const { data } = await axios.get<User>(`${ properties.externalApis.users }/${ login }`);

        logger.debug('user', data);
        return data;
    }

    async getRepos(login: string): Promise<Array<Repo>> {
        logger.debug('getting repos: ', login);

        const { data } = await axios.get<Array<Repo>>(`${ properties.externalApis.users }/${ login }/repos`);

        logger.debug('repos', data.length);
        return data;
    }
}

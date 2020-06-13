import React from 'react';

import { UsersService } from './users.service';
import { Pagination } from '../shared/paginate/paginate.type';
import { User } from './user';
import { Repo } from '../repos/repo';

type State = {
    rows: Array<User>,
    user: User,
    repos: Array<Repo>
}

export class UsersController extends React.Component<{}, State> {
    private pagination!: Pagination;
    private readonly service: UsersService = new UsersService();
    state = {
        rows: [] as Array<User>,
        user: {} as User,
        repos: []
    };

    async getUsers() {
        const { data: rows } = await this.service.findAll(this.pagination);

        this.setState({ rows, user: {} as User });
    }

    /**
     * Call <code>find</code> method to update view
     * @param pagination
     */
    onChangePaginate(pagination: Pagination) {
        this.pagination = pagination;
        this.getUsers();
    }

    async showDetail(login: string) {
        const { data: user } = await this.service.getUser(login);
        const { data: repos } = await this.service.getRepos(login);

        this.setState({ user, repos });
    }
}

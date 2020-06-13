import { ServiceFacade } from 'src/shared/service/facade.service';
import { Pagination } from '../shared/paginate/paginate.type';
import { User } from './user';
import { Repo } from '../repos/repo';

export class UsersService extends ServiceFacade {
    private get URL(): string {
        return 'users';
    }

    findAll(pagination: Pagination): Promise<{ data: Array<User> }> {
        return this.doGet<{ data: Array<User> }>(this.URL, pagination);
    }

    getUser(username: string): Promise<{ data: User }> {
        return this.doGet<{ data: User }>(`${ this.URL }/${ username }/details`);
    }

    getRepos(username: string): Promise<{ data: Array<Repo> }> {
        return this.doGet<{ data: Array<Repo> }>(`${ this.URL }/${ username }/repos`);
    }
}

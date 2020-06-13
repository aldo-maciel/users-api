import React from 'react';
import { UsersController } from './users.controller';
import { PaginateRender } from '../shared/paginate/paginate.render';

export class UsersView extends UsersController {

    render() {
        return (
            <div className="users">
                <div className="row">
                    <div className="column text-center">
                        <h2>Users</h2>
                    </div>
                </div>
                <div className="users-container">
                    <div className="users-grid">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="text-center">id</th>
                                <th className="text-center">login</th>
                            </tr>
                            </thead>
                            { this.state.rows.length ? (
                                <tbody>
                                { this.state.rows.map(({ id, login }) => (
                                        <tr className="pointer" key={ id } onClick={ () => this.showDetail(login) }>
                                            <td className="text-center">{ id }</td>
                                            <td className="users-api-name">{ login }</td>
                                        </tr>
                                    )
                                ) }
                                </tbody>
                            ) : (
                                <tbody>
                                <tr>
                                    <td className="text-center" colSpan={ 2 }>
                                        Not found users
                                    </td>
                                </tr>
                                </tbody>
                            ) }
                            <tfoot>
                            <tr className="no-hover">
                                <td colSpan={ 2 }>
                                    <PaginateRender
                                        onChange={ pagination => this.onChangePaginate(pagination) }
                                        step={ 20 }
                                    />
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    { this.state.user.login && (
                        <div className="users-user">
                            <div className="row">
                                <div className="users-detail">
                                    <div>{ this.state.user.id }</div>
                                    <div>{ new Date(this.state.user.created_at).toLocaleString() }</div>
                                    <div>{ this.state.user.login }</div>
                                    <div>
                                        <a
                                            href={ this.state.user.html_url }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            { this.state.user.html_url }
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <h3>Repositories</h3>
                            </div>
                            <div className="row users-repositions">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th className="text-center">id</th>
                                        <th>name</th>
                                        <th>url</th>
                                    </tr>
                                    </thead>
                                    { this.state.repos.length ? (
                                        <tbody>
                                        { this.state.repos.map(({ id, name, html_url }) => (
                                                <tr key={ id }>
                                                    <td className="text-center">{ id }</td>
                                                    <td>{ name }</td>
                                                    <td>
                                                        <a
                                                            href={ html_url }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            { html_url }
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        ) }
                                        </tbody>
                                    ) : (
                                        <tbody>
                                        <tr>
                                            <td className="text-center" colSpan={ 3 }>
                                                Not found repos
                                            </td>
                                        </tr>
                                        </tbody>
                                    ) }
                                </table>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        );
    }
}

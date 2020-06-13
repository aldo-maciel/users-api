import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import axios from 'axios';
import httpStatusCode from 'http-status-codes';

import user from '@/fixtures/user.json';
import repo from '@/fixtures/repo.json';
import server from '@/server';
import { properties } from '@/properties';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', () => {
    const sandbox = sinon.createSandbox();

    after(() => {
        sandbox.restore();
    });

    before(() => {
        sandbox.stub(axios, 'get')
            .withArgs(properties.externalApis.users, { params: { per_page: 20, since: 0 } })
            .resolves({ data: [ user ] })

            .withArgs(`${ properties.externalApis.users }/elbowdonkey`)
            .resolves({ data: user })

            .withArgs(`${ properties.externalApis.users }/octocat/repos`)
            .resolves({ data: Array.from({ length: 30 }).map(() => repo) })

            .withArgs(`${ properties.externalApis.users }/elbowdonkey/repos`)
            .throwsException('user not found');
    });

    it('should find all users', async () => {
        const res = await chai.request(server).get('/api/v1/users');

        expect(res).to.have.status(httpStatusCode.OK);
        expect(res.body).to.deep.equal([ user ]);
    });

    it('should find elbowdonkey\'s data', async () => {
        const res = await chai.request(server).get('/api/v1/users/elbowdonkey/details');

        expect(res).to.have.status(httpStatusCode.OK);
        expect(res.body).to.deep.equal(user);
    });

    it('should find all octocat\'s repos ', async () => {
        const res = await chai.request(server).get('/api/v1/users/octocat/repos');

        expect(res).to.have.status(httpStatusCode.OK);
        expect(res.body.length).to.equal(30);
        expect(res.body).to.deep.contain(repo);
    });

    it('should return internal server error', async () => {
        const res = await chai.request(server).get('/api/v1/users/elbowdonkey/repos');

        expect(res).to.have.status(httpStatusCode.INTERNAL_SERVER_ERROR);
    });
});


import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

const fakeTeam = {
  id: 1,
  team_name: 'Santos',
};

describe('Teste da rota Teams', () => {
  before(() => {
    sinon.stub(Teams, 'findAll').resolves(fakeTeam as unknown as Teams[]);
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  });
  it('rota get /teams retorna todos os times', async () => {
    const  chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.have.property('id');
  });
});

describe('Teste da rota Teams: busca por id', () => {
  before(() => {
    sinon.stub(Teams, 'findByPk').resolves(fakeTeam as unknown as Teams);
  });

  after(() => {
    (Teams.findByPk as sinon.SinonStub).restore();
  });

  it('rota get /teams/:id retorna apenas um time', async () => {
    const  chaiHttpResponse = await chai.request(app).get('/teams/:id');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eql(fakeTeam);
  });
  it('rota get /teams/:id retorna erro com id inexistente', async () => {
    try {
      chaiHttpResponse = await chai.request(app).get('/teams/555');
    } catch (error) {
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('team not found');
    }
  });
});

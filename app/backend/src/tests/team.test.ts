import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/TeamsModel';
import { isMapIterator } from 'util/types';

chai.use(chaiHttp);

const { expect } = chai;

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
    const response = await chai.request(app).get('/teams');
   
    expect(response.body).to.have.property('id');
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
    const response = await chai.request(app).get('/teams/:id');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(fakeTeam);
  });

});



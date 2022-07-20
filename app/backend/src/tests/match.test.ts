import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

const fakeMatch = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 1,
  awayTeam: 1,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: "Palmeiras"
  },
  teamAway: {
    teamName: "Internacional"
  }
}

describe('Teste da rota Matches', () => {
  before(() => {
    sinon.stub(Matches, 'findAll').resolves(fakeMatch as unknown as Matches[]);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });
  it('rota get /matches retorna todos os times', async () => {
    const response = await chai.request(app).get('/matches');
   
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('id');
  });
})


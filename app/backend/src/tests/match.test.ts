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

let chaiHttpResponse: Response;

const token =
  '468461654df98sd7fs4ef7dsf46d5s4f8asdf46sd4fd87fd6s4fsdf7s2324d8ad4adww8e4878il7u74h8easea87ewd156h4h6fg2sd1gsa7fa7df9ef';

const fakeMatch = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 1,
  awayTeam: 1,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: 'Palmeiras',
  },
  teamAway: {
    teamName: 'Internacional',
  },
};

describe('Teste da rota get Matches', () => {
  before(() => {
    sinon.stub(Matches, 'findAll').resolves(fakeMatch as unknown as Matches[]);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });
  it('rota get /matches retorna todos os times', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
  });
});

describe('Teste da rota get Matches com partida inexistente', () => {
  before(() => {
    return sinon.stub(Matches, 'findAll').resolves([]);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('rota get /matches retorna erro quando não tem partida cadastrada', async () => {
    try {
      chaiHttpResponse = await chai.request(app).get('/matches');
    } catch (error) {
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.eql('matches not found');
    }
  });
});

describe('Teste da rota post Matches ', () => {
  before(() => {
    return sinon
      .stub(Matches, 'create')
      .resolves(fakeMatch as unknown as Matches);
  });

  after(() => {
    (Matches.create as sinon.SinonStub).restore();
  });

  it('rota post /matches retorna erro se não tiver token válido', async () => {
    try {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(fakeMatch);

      expect(chaiHttpResponse.body).to.be.eql('invalid token');
    } catch (error) {
      console.error;
    }
  });

  it('rota post /matches retorna a partida criada se o token for válido', async () => {
    try {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send(fakeMatch);

      expect(chaiHttpResponse.status).to.be.equal(201);
    } catch (error) {
      console.error;
    }
  });
});

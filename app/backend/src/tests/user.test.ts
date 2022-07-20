import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const fakeUser = {
  id: 1,
  username: 'username',
  role: 'role',
  email: 'teste@email.com',
  password: 'password',
};

describe('Teste da rota Login', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(User, 'findOne').resolves(fakeUser as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Email não pode estar vazio', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: ' ' });

    expect(chaiHttpResponse.status).to.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq(
      '"email" must be a valid email'
    );
  });

  it('O formato de email é válido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste' });

    expect(chaiHttpResponse.status).to.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('"email" must be a valid email');
  });

  it('O login é feito com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ 'email': 'teste@email.com', 'password': 'password' });

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token')
  });

  
  it('Senha não pode estar vazio', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({senha: ' ' });

    expect(chaiHttpResponse.status).to.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq(
      '"email" is required'
    );
  }); 
 
});

import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota Login', () => {
  it('rota get /teams retorna todos os times', async () => {
    const { body } = await chai.request(app).get('/teams');

    expect(body).to.have.property('id');
  });
});

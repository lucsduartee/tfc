import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: "Albert Einstein",
        email: "bertinho.eins@example.com",
        role: "admin",
        password: "$2a$12$r1ry/ELZZgyXSQvtHWo44uogddGZYdsuaGHXGZOVkjnJtQGdAEUgm" // avioesdoforro
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Return OK status code', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'bertinho.eins@example.com',
         password: 'avioesdoforro',
       })

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});

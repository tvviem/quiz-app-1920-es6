//import { boot, shutdown, port } from '../src/bin/www';
  
import { boot } from '../src/bin/www';
import { shutdown } from '../src/bin/www';
import { port } from '../src/bin/www';

import { expect } from 'chai';
import { get } from 'superagent';

describe('server', () => {
  before(() => {
    boot()
  })

  describe('homepage', () => {
    it('should respond to GET', (done) => {
      get(`http://localhost:${port}/login`)
        .end((error, response) => {
          expect(response.status).to.equal(200)
          done()
        })
    })
  })

  after(() => {
    shutdown()
  })
})
import userService from ''
import { describe } from 'mocha';
const assert = require('assert');
const {expect} = require('chai');

describe('Simple test suite:', function() {
  it('one=one', function() {
    expect(1).to.equal(1);
  });
});
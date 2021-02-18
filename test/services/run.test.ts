import assert from 'assert';
import app from '../../src/app';

describe('\'run\' service', () => {
  it('registered the service', () => {
    const service = app.service('run');

    assert.ok(service, 'Registered the service');
  });
});

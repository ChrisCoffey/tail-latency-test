import { HookContext } from '@feathersjs/feathers';

const logError = () => {
  return async (context: HookContext) => {
    console.log("calling context.log", context.error)
    return context;
  }
}


export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [logError()],
    find: [logError()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logError()],
    find: [logError()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

// Initializes the `run` service on path `/run`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Run } from './run.class';
import hooks from './run.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'run': Run & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/run', new Run(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('run');

  service.hooks(hooks);
}

import { Service, MemoryServiceOptions } from 'feathers-memory';
import { Params } from '@feathersjs/feathers';
import { Application } from '../../declarations';

export class Run extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MemoryServiceOptions>, app: Application) {
    super(options);
  }

  calculateGaps(timestamps: Array<number>): Array<number>{
    if(timestamps.length =< 1) { return [] }

    for(var i=0; i < timestamps.length -1; i++) {
      timestamps[i] = timestamps[i+1] - timestamps[i]
    }

    return timestamps;
  }

  find(params?: Params) {
    const size = 2000000
    const arr = new Array(size);
    for(var i=0; i< size; i++) {
      arr[i] = Date.now();
    }

    const gaps = calculateGaps(arr)

  }
}

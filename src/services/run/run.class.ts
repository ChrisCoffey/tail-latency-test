import { Service, MemoryServiceOptions } from 'feathers-memory';
import { Params } from '@feathersjs/feathers';
import { Application } from '../../declarations';

export class Run extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MemoryServiceOptions>, app: Application) {
    super(options);
  }

  async find(params?: Params) {
    const size = 2000000
    const arr = new Array(size);
    for(var i=0; i< size; i++) {
      arr[i] = process.hrtime.bigint()
    }

    for(var i=0; i < arr.length - 2; i++) {
      arr[i] = arr[i+1] - arr[i]
    }

    arr.sort()

    let res = {
      median: Number.parseInt(arr[1000000])
    , p75: Number.parseInt(arr[1500000])
    , p90: Number.parseInt(arr[1800000])
    , p99: Number.parseInt(arr[1980000])
    }

    console.log(res)
    console.log("returning")
    return [res]
  }
}

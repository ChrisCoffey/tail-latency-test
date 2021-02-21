import { Service, MemoryServiceOptions } from 'feathers-memory';
import { Params } from '@feathersjs/feathers';
import { Application } from '../../declarations';

export class Run extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MemoryServiceOptions>, app: Application) {
    super(options);
  }

  async find(params?: Params) {
    const start = process.hrtime.bigint()
    const size = 250000
    const arr = new Array(size);
    for(var i=0; i< size; i++) {
      arr[i] = process.hrtime.bigint()
    }

    for(var i=0; i < arr.length - 2; i++) {
      arr[i] = arr[i+1] - arr[i]
    }

    arr.sort()

    const end = process.hrtime.bigint()

    let res = {
      median: Number.parseInt(arr[125000])
    , p75: Number.parseInt(arr[187500])
    , p90: Number.parseInt(arr[225000])
    , p99: Number.parseInt(arr[247500])
    , max: Number.parseInt(arr[249999])
    , duration: Number.parseInt((end - start).toString())
    }

    return [res]
  }
}

import { Service, MemoryServiceOptions } from 'feathers-memory';
import { Params } from '@feathersjs/feathers';
import { Application } from '../../declarations';
const fs = require('fs')

export class Run extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MemoryServiceOptions>, app: Application) {
    super(options);
  }


  // Perform hundreds of thousands of (mostly) empty loop iterations
  syscallTest(): any {
    const size = 250000
    const arr = new Array(size);
    for(var i=0; i< size; i++) {
      arr[i] = Number(process.hrtime.bigint())
    }

    for(var i=0; i < size - 1; i++) {
      arr[i] = arr[i+1] - arr[i]
    }

    arr.sort((l,r) => {return (l >= r ? 1 : -1)})

    return {
      min: arr[0],
      median: arr[125000],
      p75: arr[187500],
      p90: arr[225000],
      p99: arr[247500],
      maximum: arr[249998] // Second to last index because there are n-1 gaps
    }
  }

  // Load a bunch (6MB) of JSON as a string & parse it
  stringAllocTest() : any {
    const iters = 100
    const arr = new Array(iters)

    const contents : string = fs.readFileSync('data/twentyThousandRecords.json', 'utf8')
    for(var i=0; i< iters; i++) {
      const begin = process.hrtime.bigint()
      const js = JSON.parse(contents)

      const end = process.hrtime.bigint()
      arr[i] = Number(end - begin)
    }

    arr.sort((l,r) => {return (l >= r ? 1 : -1)})

    return {
      min: arr[0],
      median: arr[50],
      p75: arr[75],
      p90: arr[90],
      p99: arr[98],
      maximum: arr[98]
    }
  }

  async find(params?: Params) {
    const start = process.hrtime.bigint()
    let res: any = {}

    switch(params?.query?.style) {
      case "cpu":
        res = this.syscallTest()
        break;
      case "strings":
        res = this.stringAllocTest()
        break;
      default:
        res = this.syscallTest()
    }

    const end = process.hrtime.bigint()

    res.duration = Number.parseInt((end - start).toString())
    return [res]
  }
}

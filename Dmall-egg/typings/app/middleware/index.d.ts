// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGzip = require('../../../app/middleware/gzip');
import ExportLoginAuthority = require('../../../app/middleware/loginAuthority');

declare module 'egg' {
  interface IMiddleware {
    gzip: typeof ExportGzip;
    loginAuthority: typeof ExportLoginAuthority;
  }
}

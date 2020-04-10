// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCar = require('../../../app/service/car');
import ExportHome = require('../../../app/service/home');
import ExportSearch = require('../../../app/service/search');
import ExportShop = require('../../../app/service/shop');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    car: AutoInstanceType<typeof ExportCar>;
    home: AutoInstanceType<typeof ExportHome>;
    search: AutoInstanceType<typeof ExportSearch>;
    shop: AutoInstanceType<typeof ExportShop>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}

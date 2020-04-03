/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/14/2020
 * Time: 6:05 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export interface ContainerContract {
  environment?: string

  make(target: any, args?: any): any

  call(target, method, args: any[]): any
}

export class Container implements ContainerContract {
  // public environment = 'dev'
  [key: string] : any;

  public make (target: any, args?: any): any {
    return new target(...args)
  }

  public call (target, method, args: any[] = []) {
    return target[method](...args)
  }
}

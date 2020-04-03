/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/26/2020
 * Time: 9:54 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import slash from 'slash'
import { join, relative } from 'path'
import { fsReadAll } from '@poppinss/utils'
import { CommandsListFilterFn } from '../Contracts'

/**
 * Returns an array of Javascript files inside the current directory in
 * relative to the application root.
 */
export function listDirectoryFiles (
  scanDirectory: string,
  appRoot: string,
  filterFn?: CommandsListFilterFn,
): string[] {
  return fsReadAll(scanDirectory)
    .filter((name) => !name.endsWith('.json')) // remove .json files
    .map((name) => {
      const relativePath = relative(appRoot, join(scanDirectory, name))
      return slash(relativePath.startsWith('../') ? relativePath : `./${relativePath}`)
    })
    .filter((name) => {
      if (typeof (filterFn) === 'function') {
        return filterFn(name)
      }

      return Array.isArray(filterFn) ? !filterFn.includes(name) : true
    })
}

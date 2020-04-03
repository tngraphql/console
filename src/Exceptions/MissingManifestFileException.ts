/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/26/2020
 * Time: 9:54 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@poppinss/utils'

/**
 * CommandValidationException is used when validating a command before
 * registering it with Ace.
 */
export class MissingManifestFileException extends Exception {
  public static invoke (): MissingManifestFileException {
    return new this('Unable to locate ace-manifest.json file')
  }
}

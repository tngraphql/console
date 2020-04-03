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
export class CommandValidationException extends Exception {
  public static invalidManifestExport (commandPath: string): CommandValidationException {
    return new this(`make sure to have a default export from {${commandPath}} command`)
  }

  public static missingCommandName (className: string): CommandValidationException {
    return new this(`missing command name for {${className}} class`)
  }

  public static invalidSpreadArgOrder (arg: string): CommandValidationException {
    return new this(`spread argument {${arg}} must be at last position`)
  }

  public static invalidOptionalArgOrder (
    optionalArg: string,
    currentArg: string,
  ): CommandValidationException {
    const message = `optional argument {${optionalArg}} must be after required argument {${currentArg}}`
    return new this(message)
  }
}

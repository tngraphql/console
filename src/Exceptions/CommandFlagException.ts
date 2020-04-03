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
import { CommandConstructorContract } from '../Contracts'

/**
 * Raised when an the type of a flag is not as one of the excepted type
 */
export class CommandFlagException extends Exception {
  public command?: CommandConstructorContract
  public argumentName: string
  public exceptedType: string

  /**
   * Flag type validation failed.
   */
  public static invoke (
    prop: string,
    expected: string,
    command?: CommandConstructorContract,
  ): CommandFlagException {
    const message = `"${prop}" must be defined as "${expected}"`

    const exception = new this(message, 500, 'E_INVALID_FLAG')
    exception.argumentName = prop
    exception.command = command

    return exception
  }
}

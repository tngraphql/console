/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/26/2020
 * Time: 9:54 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import logger, { Logger } from '@poppinss/fancy-logs'
import { CommandFlagException } from '../Exceptions/CommandFlagException'
import { InvalidCommandException } from '../Exceptions/InvalidCommandException'
import { CommandArgumentException } from '../Exceptions/CommandArgumentException'

/**
 * Handles the command errors and prints them to the console.
 */
export function handleError (
  error: any,
  callback?: ((error: any, loggerFn: Logger) => void | Promise<void>),
) {
  if (error instanceof CommandArgumentException) {
    logger.error(`Missing argument "${error.argumentName}"`)
    return
  }

  if (error instanceof CommandFlagException) {
    const message = `Expected "${error.argumentName}" to be a valid "${error.exceptedType}"`
    logger.error(message)
    return
  }

  if (error instanceof InvalidCommandException) {
    logger.error(`"${error.commandName}" is not a registered command`)
    return
  }

  if (typeof (callback) === 'function') {
    callback(error, logger)
  } else {
    logger.fatal(error)
  }
}

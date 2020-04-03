/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/26/2020
 * Time: 9:54 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseCommand } from '../BaseCommand'
import { CommandContract } from '../Contracts'

/**
 * The help command for print the help output
 */
export class HelpCommand extends BaseCommand implements CommandContract {
  public static commandName = 'help'
  public static description = 'See help for all the commands'

  public async handle () {
    this.kernel.printHelp()
  }
}

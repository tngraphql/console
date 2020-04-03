/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/26/2020
 * Time: 9:54 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { join } from 'path'
import { Filesystem } from '@poppinss/dev-utils'
import { Logger } from '@poppinss/fancy-logs'
import { Generator } from '../src/Generator'

const fs = new Filesystem(join(__dirname, './app'))

test.group('Generator', (group) => {
  group.after(async () => {
    await fs.cleanup()
  })

  test('generate one or more entity files', async (assert) => {
    const generator = new Generator(new Logger({ fake: true }), fs.basePath)
    generator.addFile('user', { suffix: 'controller' })
    generator.addFile('account', { suffix: 'controller' })

    await generator.run()

    const userExists = await fs.fsExtra.pathExists(join(fs.basePath, 'UserController.ts'))
    const accountExists = await fs.fsExtra.pathExists(join(fs.basePath, 'UserController.ts'))

    assert.isTrue(userExists)
    assert.isTrue(accountExists)
  })

  test('do not overwrite existing files', async (assert) => {
    const generator = new Generator(new Logger({ fake: true }), fs.basePath)
    await fs.add('UserController.ts', 'export const greeting = \'hello world\'')

    generator.addFile('user', { suffix: 'controller' })
    await generator.run()

    const user = await fs.get('UserController.ts')
    assert.equal(user, 'export const greeting = \'hello world\'')
  })
})

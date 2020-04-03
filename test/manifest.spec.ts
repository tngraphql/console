/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/26/2020
 * Time: 9:54 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'
import test from 'japa'
import { join } from 'path'
import { Filesystem } from '@poppinss/dev-utils'
import { Manifest } from '../src/Manifest'

const fs = new Filesystem(join(__dirname, '__app'))

test.group('Manifest', (group) => {
    group.before(async () => {
        await fs.ensureRoot()
    })

    group.afterEach(async () => {
        await fs.cleanup()
    })

    test('generated manifest from command paths', async (assert) => {
        await fs.add('Commands/Make.ts', `
    import { args, flags } from '../../../index'
    import { BaseCommand } from '../../../src/BaseCommand'

    export default class Greet extends BaseCommand {
      public static commandName = 'greet'
      public static description = 'Greet a user'

      @args.string()
      public name: string

      @flags.boolean()
      public adult: boolean

      public async handle () {}
    }`)

        const manifest = new Manifest(fs.basePath)
        await manifest.generate(['./Commands/Make.ts'])

        const manifestJSON = await fs.fsExtra.readJSON(join(fs.basePath, 'ace-manifest.json'))
        assert.deepEqual(manifestJSON, {
            greet: {
                settings: {},
                commandPath: './Commands/Make',
                commandName: 'greet',
                description: 'Greet a user',
                args: [{
                    name: 'name',
                    type: 'string',
                    propertyName: 'name',
                    required: true,
                }],
                flags: [{
                    name: 'adult',
                    propertyName: 'adult',
                    type: 'boolean',
                }],
            },
        })
    })

    test('raise exception when commandPath doesnt exports a command', async (assert) => {
        assert.plan(1)

        await fs.add('Commands/Make.ts', `
    import { args, flags } from '../../../index'
    import { BaseCommand } from '../../../src/BaseCommand'

    export class Greet extends BaseCommand {
      public static commandName = 'greet'
      public static description = 'Greet a user'

      @args.string()
      public name: string

      @flags.boolean()
      public adult: boolean

      public async handle () {}
    }`)

        const manifest = new Manifest(fs.basePath)

        try {
            await manifest.generate(['./Commands/Make.ts'])
        } catch ({ message }) {
            assert.equal(message, 'make sure to have a default export from {./Commands/Make.ts} command')
        }
    })

    test('read manifest file', async (assert) => {
        await fs.add('./Commands/Make.ts', `
    import { args, flags } from '../../../index'
    import { BaseCommand } from '../../../src/BaseCommand'

    export default class Greet extends BaseCommand {
      public static commandName = 'greet'
      public static description = 'Greet a user'

      @args.string()
      public name: string

      @flags.boolean()
      public adult: boolean

      public async handle () {}
    }`)

        const manifest = new Manifest(fs.basePath)
        await manifest.generate(['./Commands/Make.ts'])

        const manifestJSON = await manifest.load()
        assert.deepEqual(manifestJSON, {
            greet: {
                settings: {},
                commandPath: './Commands/Make',
                commandName: 'greet',
                description: 'Greet a user',
                args: [{
                    name: 'name',
                    propertyName: 'name',
                    type: 'string',
                    required: true,
                }],
                flags: [{
                    name: 'adult',
                    type: 'boolean',
                    propertyName: 'adult',
                }],
            },
        })
    })

    test('raise exception when manifest file is missing', async (assert) => {
        assert.plan(1)
        const manifest = new Manifest(fs.basePath)

        try {
            await manifest.load()
        } catch ({ message }) {
            assert.equal(message, 'Unable to locate ace-manifest.json file')
        }
    })

    test('generated manifest from command subpaths', async (assert) => {
        await fs.add('Commands/Make.ts', `
    import { args, flags } from '../../../index'
    import { BaseCommand } from '../../../src/BaseCommand'

    export default class Greet extends BaseCommand {
      public static commandName = 'greet'
      public static description = 'Greet a user'

      @args.string()
      public name: string

      @flags.boolean()
      public adult: boolean

      public async handle () {}
    }`)

        await fs.add('Commands/index.ts', `
      export default [
        './Commands/Make',
      ]
    `)

        const manifest = new Manifest(fs.basePath)
        await manifest.generate(['./Commands/index.ts'])

        const manifestJSON = await fs.fsExtra.readJSON(join(fs.basePath, 'ace-manifest.json'))
        assert.deepEqual(manifestJSON, {
            greet: {
                settings: {},
                commandPath: './Commands/Make',
                commandName: 'greet',
                description: 'Greet a user',
                args: [{
                    name: 'name',
                    type: 'string',
                    propertyName: 'name',
                    required: true,
                }],
                flags: [{
                    name: 'adult',
                    propertyName: 'adult',
                    type: 'boolean',
                }],
            },
        })
    })
})

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
import { GeneratorFile } from '../src/Generator/File'

test.group('Generator File', () => {
  test('use the base name for computing the filename', (assert) => {
    const file = new GeneratorFile('foo/bar')
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'Bar',
      contents: '',
      filepath: join(__dirname, 'foo', 'Bar.ts'),
      relativepath: join(__dirname, 'foo', 'Bar.ts'),
      extension: '.ts',
    })
  })

  test('add suffix when defined', (assert) => {
    const file = new GeneratorFile('foo/user', { suffix: 'controller' })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'UserController',
      contents: '',
      filepath: join(__dirname, 'foo', 'UserController.ts'),
      relativepath: join(__dirname, 'foo', 'UserController.ts'),
      extension: '.ts',
    })
  })

  test('do not add suffix when already defined in the name', (assert) => {
    const file = new GeneratorFile('foo/userController', { suffix: 'controller' })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'UserController',
      contents: '',
      filepath: join(__dirname, 'foo', 'UserController.ts'),
      relativepath: join(__dirname, 'foo', 'UserController.ts'),
      extension: '.ts',
    })
  })

  test('pluralize name when form is plural', (assert) => {
    const file = new GeneratorFile('foo/user', { suffix: 'controller', form: 'plural' })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'UsersController',
      contents: '',
      filepath: join(__dirname, 'foo', 'UsersController.ts'),
      relativepath: join(__dirname, 'foo', 'UsersController.ts'),
      extension: '.ts',
    })
  })

  test('pluralize name properly when name has suffix', (assert) => {
    const file = new GeneratorFile('usercontroller', { suffix: 'controller', form: 'plural' })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'UsersController',
      contents: '',
      filepath: join(__dirname, 'UsersController.ts'),
      relativepath: join(__dirname, 'UsersController.ts'),
      extension: '.ts',
    })
  })

  test('handle case where suffix is name is added after a dash', (assert) => {
    const file = new GeneratorFile('user-controller', { suffix: 'controller', form: 'plural' })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'UsersController',
      contents: '',
      filepath: join(__dirname, 'UsersController.ts'),
      relativepath: join(__dirname, 'UsersController.ts'),
      extension: '.ts',
    })
  })

  test('use app root when destination path is not absolute', (assert) => {
    const file = new GeneratorFile('foo/user-controller', { suffix: 'controller', form: 'plural' })
    file.appRoot(__dirname)
    file.destinationDir('foo')

    assert.deepEqual(file.toJSON(), {
      filename: 'UsersController',
      contents: '',
      filepath: join(__dirname, 'foo', 'foo', 'UsersController.ts'),
      relativepath: join('foo', 'foo', 'UsersController.ts'),
      extension: '.ts',
    })
  })

  test('do not use app root when destination path is absolute', (assert) => {
    const file = new GeneratorFile('user-controller', { suffix: 'controller', form: 'plural' })
    file.appRoot(__dirname)
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'UsersController',
      contents: '',
      filepath: join(__dirname, 'UsersController.ts'),
      relativepath: 'UsersController.ts',
      extension: '.ts',
    })
  })

  test('use process.cwd() when app root is not defined', (assert) => {
    const file = new GeneratorFile('user-controller', { suffix: 'controller', form: 'plural' })
    file.destinationDir('foo')

    assert.deepEqual(file.toJSON(), {
      filename: 'UsersController',
      contents: '',
      filepath: join(process.cwd(), 'foo', 'UsersController.ts'),
      relativepath: join(process.cwd(), 'foo', 'UsersController.ts'),
      extension: '.ts',
    })
  })

  test('substitute stub variables from raw string', (assert) => {
    const file = new GeneratorFile('foo/user-controller', { suffix: 'controller', form: 'plural' })
    file.destinationDir('foo')
    file.stub('Hello ${name}', { raw: true }).apply({ name: 'virk' })

    assert.deepEqual(file.toJSON(), {
      filename: 'UsersController',
      contents: 'Hello virk',
      filepath: join(process.cwd(), 'foo', 'foo', 'UsersController.ts'),
      relativepath: join(process.cwd(), 'foo', 'foo', 'UsersController.ts'),
      extension: '.ts',
    })
  })

  test('add prefix when defined', (assert) => {
    const file = new GeneratorFile('foo/user', { prefix: 'controller' })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'ControllerUser',
      contents: '',
      filepath: join(__dirname, 'foo', 'ControllerUser.ts'),
      relativepath: join(__dirname, 'foo', 'ControllerUser.ts'),
      extension: '.ts',
    })
  })

  test('do not add prefix when already defined in the name', (assert) => {
    const file = new GeneratorFile('foo/controlleruser', { prefix: 'controller' })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'ControllerUser',
      contents: '',
      filepath: join(__dirname, 'foo', 'ControllerUser.ts'),
      relativepath: join(__dirname, 'foo', 'ControllerUser.ts'),
      extension: '.ts',
    })
  })

  test('do not pluralize when word is in ignore list', (assert) => {
    const file = new GeneratorFile('foo/home', {
      suffix: 'controller',
      form: 'plural',
      formIgnoreList: ['Home'],
    })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'HomeController',
      contents: '',
      filepath: join(__dirname, 'foo', 'HomeController.ts'),
      relativepath: join(__dirname, 'foo', 'HomeController.ts'),
      extension: '.ts',
    })
  })

  test('do not pluralize when word is in ignore list and has the suffix', (assert) => {
    const file = new GeneratorFile('homecontroller', {
      suffix: 'controller',
      form: 'plural',
      formIgnoreList: ['Home'],
    })
    file.destinationDir(__dirname)

    assert.deepEqual(file.toJSON(), {
      filename: 'HomeController',
      contents: '',
      filepath: join(__dirname, 'HomeController.ts'),
      relativepath: join(__dirname, 'HomeController.ts'),
      extension: '.ts',
    })
  })
})

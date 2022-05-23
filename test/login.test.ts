import { LoginPage } from '../src/pages/login.page'
import { IDriver } from '../src/domain/services/driver.interface'
import container from '../src/inversify.config'
import TYPES from '../src/types'

import addContext from 'mochawesome/addContext'
import chai from 'chai'
const expect = chai.expect


describe('Login', function () {
  let driver = container.get<IDriver>(TYPES.SeleniumDriver)

  beforeEach(async function () {
    await driver.init()
  })

  describe('Valid user', function () {
    it('should navigate to the Inventory page', async function () {
      const page = container.get(LoginPage)

      const inventoryPage = await page.login('performance_glitch_user', 'secret_sauce')

      expect(await inventoryPage.isFullyLoaded(), 'Login failed').to.be.true
    })
  })

  describe('Invalid user', function () {
    it('should show error message when the password is wrong', async function () {
      const page = container.get(LoginPage)

      await page.login('standard_user', 'secret_sauce[INVALID]')

      expect(await page.getErrorMessage()).to.be.equal('Epic sadface: Username and password do not match any user in this service')
    })

    it('should show error message when the user is locked', async function () {
      const page = container.get(LoginPage)

      await page.login('locked_out_user', 'secret_sauce')

      expect(await page.getErrorMessage()).to.be.equal('Epic sadface: Sorry, this user has been locked out.')
    })
  })

  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      addContext(this, await driver.takeScreenshot())
    }

    await driver.quit()
  })
})

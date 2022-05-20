import { LoginPage } from "../src/login.page"

const { Builder, By, Key, until } = require('selenium-webdriver')
var chai = require('chai');
var expect = chai.expect;

describe('Login', function () {
  let driver

  beforeEach(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build()
  })

  describe('Valid user', function () {
    it('should navigate to the Inventory page', async function () {
      const page = new LoginPage(driver)

      await page.login('standard_user', 'secret_sauce')
      await driver.wait(until.urlContains('inventory.html'), 5000)

      expect(await page.getTitle()).to.be.equal('PRODUCTS')
    })
  })

  describe('Invalid user', function () {
    it('should show error message when the password is wrong', async function () {
      const page = new LoginPage(driver)

      await page.login('standard_user', 'secret_sauce[INVALID]')

      expect(await page.getErrorMessage()).to.be.equal('Epic sadface: Username and password do not match any user in this service')
    })

    it('should show error message when the user is locked', async function () {
      const page = new LoginPage(driver)

      await page.login('locked_out_user', 'secret_sauce')

      expect(await page.getErrorMessage()).to.be.equal('Epic sadface: Sorry, this user has been locked out.')
    })
  })

  afterEach(async function () {
    await driver.quit()
  })
})

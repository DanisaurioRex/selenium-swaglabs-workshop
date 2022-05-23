import { LoginPage } from '../src/pages/login.page'
import { IDriver } from '../src/domain/services/driver.interface'
import container from '../src/inversify.config'
import TYPES from '../src/types'

import addContext from 'mochawesome/addContext'
import chai from 'chai'
import { InventoryPage } from '../src/pages/inventory.page'
const expect = chai.expect


describe('Inventory', function () {
  let driver = container.get<IDriver>(TYPES.SeleniumDriver)

  beforeEach(async function () {
    await driver.init()
  })

  describe('Products', function () {
    it('should navigate to the Inventory page', async function () {
      const page = container.get(InventoryPage)

      await page.autorize('standard_user')
      await page.openPage()
      await page.addItemToCart(1)

      expect(await page.getNumberOfItemOnCart()).to.be.equal(1)
    })
  })


  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      addContext(this, await driver.takeScreenshot())
    }

    await driver.quit()
  })
})

import 'reflect-metadata'
import { By, until } from 'selenium-webdriver'
import { IDriver } from '../domain/services/driver.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../types'
import { SauceBasePage } from './sauce-base.page'

@injectable()
export class InventoryPage extends SauceBasePage {
  constructor(@inject(TYPES.SeleniumDriver) driver: IDriver) {
    super(driver.instance())
    this.pageUrl = 'inventory.html'
  }

  async isFullyLoaded() {
    let result = true
    try {
      const inventoryList = this.webDriver.findElement(By.className('inventory_list'))
      await this.webDriver.wait(until.elementIsVisible(inventoryList))
    } catch (error) {
      result = false
    }
    return result
  }

  async addItemToCart(index: number) {
    const buttons = await this.webDriver.findElements(By.xpath("//*[text()='Add to cart']"))
    await buttons[index - 1].click()
  }

  async getNumberOfItemOnCart() {
    const shoppingCartContianer = await this.webDriver.findElement(By.id('shopping_cart_container'))
    const numberOfItemOnCart = await shoppingCartContianer.getText()
    
    return Number(numberOfItemOnCart)
  }
}

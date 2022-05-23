import 'reflect-metadata'
import { By } from 'selenium-webdriver'
import { IDriver } from '../domain/services/driver.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../types'
import { InventoryPage } from './inventory.page'

@injectable()
export class LoginPage {
  private readonly url = 'https://www.saucedemo.com/'
  private webDriver: any

  constructor(@inject(TYPES.SeleniumDriver) driver: IDriver) {
    this.webDriver = driver
  }

  async login(user: string, password: string) {
    await this.webDriver.instance().get(this.url)

    await this.webDriver.instance().findElement(By.css('[data-test="username"]')).sendKeys(user)
    await this.webDriver.instance().findElement(By.css('[data-test="password"]')).sendKeys(password)
    await this.webDriver.instance().findElement(By.css('[data-test="login-button"]')).click()

    return new InventoryPage(this.webDriver)
  }

  async getTitle() {
    return await this.webDriver.instance().findElement(By.className('title')).getText()
  }

  async getErrorMessage() {
    return await this.webDriver.instance().findElement(By.css('[data-test="error"]')).getText()
  }
}

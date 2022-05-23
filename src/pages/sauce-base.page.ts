import 'reflect-metadata'
import { By, until, WebDriver } from 'selenium-webdriver'
import { IDriver } from '../domain/services/driver.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../types'

@injectable()
export class SauceBasePage {
  protected readonly baseUrl = 'https://www.saucedemo.com/'
  protected pageUrl: string
  protected webDriver: WebDriver

  constructor(driver: WebDriver) {
    this.webDriver = driver
  }

  async openPage() {
    await this.webDriver.get(this.baseUrl + this.pageUrl)
  }

  async isFullyLoaded() {
    let result = true
    try {
      await this.webDriver.wait(until.urlContains(this.baseUrl + this.pageUrl), 5000)
    } catch (error) {
      result = false
    }
    return result
  }

  async autorize(user: string) {
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 24)
    await this.webDriver.get(this.baseUrl)
    await this.webDriver.manage().addCookie({ name: 'session-username', value: user, expiry: expiry }) //TODO: change static date
  }

  async getTitle() {
    return await this.webDriver.findElement(By.className('title')).getText()
  }

  async getErrorMessage() {
    return await this.webDriver.findElement(By.css('[data-test="error"]')).getText()
  }
}

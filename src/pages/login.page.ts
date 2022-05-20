import 'reflect-metadata'
import { By } from 'selenium-webdriver'
import { IDriver } from '../domain/driver.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../types'

@injectable()
export class LoginPage {
  private readonly url = 'https://www.saucedemo.com/'
  private webDriver: any

  constructor(@inject(TYPES.SeleniumDriver) driver: IDriver) {
    this.webDriver = driver.instance()
  }

  async login(user: string, password: string) {
    await this.webDriver.get(this.url)

    await this.webDriver.findElement(By.css('[data-test="username"]')).sendKeys(user)
    await this.webDriver.findElement(By.css('[data-test="password"]')).sendKeys(password)
    await this.webDriver.findElement(By.css('[data-test="login-button"]')).click()
  }

  async getTitle() {
    return await this.webDriver.findElement(By.className('title')).getText()
  }

  async getErrorMessage() {
    return await this.webDriver.findElement(By.css('[data-test="error"]')).getText()
  }
}

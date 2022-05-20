import { By } from 'selenium-webdriver'

export class LoginPage {
  private readonly url = 'https://www.saucedemo.com/'
  private driver: any

  constructor (driver) {
    this.driver = driver
  }
  
  async login (user, password) {
    await this.driver.get(this.url)

    await this.driver.findElement(By.css('[data-test="username"]')).sendKeys(user)
    await this.driver.findElement(By.css('[data-test="password"]')).sendKeys(password)
    await this.driver.findElement(By.css('[data-test="login-button"]')).click()
  }

  async getTitle () {
    return await this.driver.findElement(By.className('title')).getText()
  }

  async getErrorMessage () {
    return await this.driver.findElement(By.css('[data-test="error"]')).getText()
  }
}

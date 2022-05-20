import 'reflect-metadata'
import { WebDriver, Builder } from 'selenium-webdriver'
import { IDriver } from '../domain/driver.interface'
import { injectable } from 'inversify'

@injectable()
export class SeleniumChromeWebDriver implements IDriver {
    private driver: WebDriver

    public async init(): Promise<void> {
        this.driver = await new Builder().forBrowser('chrome').build()
    }

    public instance(): WebDriver {
        return this.driver
    }

    public async quit(): Promise<void> {
        await this.driver.quit()
    }
}

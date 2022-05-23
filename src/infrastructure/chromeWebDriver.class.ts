import 'reflect-metadata'
import { WebDriver, Builder } from 'selenium-webdriver'
import { IDriver } from '../domain/driver.interface'
import { injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import fs from "fs"

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

    public async takeScreenshot(): Promise<string> {
        const reportPath = 'reports/'
        const screenshotsFolder = 'assets/'
        const fileName = `${uuidv4()}.png`

        await fs.promises.mkdir(reportPath + screenshotsFolder, { recursive: true })        
        const image = await this.driver.takeScreenshot()
        await fs.promises.writeFile(reportPath + screenshotsFolder + fileName, image, 'base64')
        return screenshotsFolder + fileName
    }
}

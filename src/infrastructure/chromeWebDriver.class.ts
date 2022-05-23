import 'reflect-metadata'
import { WebDriver, Builder } from 'selenium-webdriver'
import { IDriver } from '../domain/services/driver.interface'
import { inject, injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import fs from "fs"
import TYPES from '../types'
import { IConfiguration } from '../domain/services/configuration.interface'
import { ReportModel } from '../domain/model/report.model'
var path = require('path')

@injectable()
export class SeleniumChromeWebDriver implements IDriver {
    private driver: WebDriver
    private reportConfiguration: ReportModel

    public constructor(@inject(TYPES.Configuration) configuration: IConfiguration) {
        this.reportConfiguration = configuration.getObject<ReportModel>('reports')
    }

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
        const reportPath = this.reportConfiguration.baseDir
        const screenshotsFolder = this.reportConfiguration.screenshotsDir
        const fileName = `${uuidv4()}.png`

        await fs.promises.mkdir(path.join(reportPath, screenshotsFolder), { recursive: true })
        const image = await this.driver.takeScreenshot()
        await fs.promises.writeFile(path.join(reportPath, screenshotsFolder, fileName), image, 'base64')
        return path.join(screenshotsFolder, fileName)
    }
}

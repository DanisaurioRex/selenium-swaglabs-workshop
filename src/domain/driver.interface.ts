import { WebDriver } from 'selenium-webdriver'

export interface IDriver {
    init(): Promise<void>
    instance(): WebDriver
    quit(): Promise<void>
    takeScreenshot(): Promise<string>
}

import { Container } from 'inversify'
import { IDriver } from '../src/domain/services/driver.interface'
import { IConfiguration } from './domain/services/configuration.interface'
import { SeleniumChromeWebDriver } from './infrastructure/chromeWebDriver.class'
import { Configuration } from './infrastructure/configuration.class'
import { InventoryPage } from './pages/inventory.page'
import { LoginPage } from './pages/login.page'
import TYPES from './types'

const container = new Container()
container.bind(LoginPage).toSelf()
container.bind(InventoryPage).toSelf()
container.bind<IDriver>(TYPES.SeleniumDriver).to(SeleniumChromeWebDriver).inSingletonScope()
container.bind<IConfiguration>(TYPES.Configuration).to(Configuration).inSingletonScope()

export default container

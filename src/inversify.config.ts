import { Container } from 'inversify'
import { IDriver } from '../src/domain/driver.interface'
import { SeleniumChromeWebDriver } from './infrastructure/chromeWebDriver.class'
import { LoginPage } from './pages/login.page'
import TYPES from './types'

const container = new Container()
container.bind(LoginPage).toSelf()
container.bind<IDriver>(TYPES.SeleniumDriver).to(SeleniumChromeWebDriver).inSingletonScope()

export default container

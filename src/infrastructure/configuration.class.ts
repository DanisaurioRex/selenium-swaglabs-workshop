import { IConfiguration } from '../domain/services/configuration.interface'
import config from 'config'
import { injectable } from 'inversify'

@injectable()
export class Configuration implements IConfiguration {
    public getObject<T>(path: string): T {
        return config.get(path) as T
    }

    public getValue(path: string): string {
        return config.get(path)
    }
}
export interface IConfiguration {
    getObject<T>(path: string): T
    getValue(path: string): string
}
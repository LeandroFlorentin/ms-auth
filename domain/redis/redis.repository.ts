export default interface IRedisRepository {
  setValue: (key: string, value: string) => Promise<string | null>;
  getValue: (key: string) => Promise<string | null>;
}

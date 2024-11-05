export class User {
  constructor (
    public userName: string,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public permissions: string[]
  ) {}
}

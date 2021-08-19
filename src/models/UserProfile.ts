import { IsDefined, IsEmail } from 'class-validator'

export class UserProfile {
  private _id: number = -1;

  @IsDefined()
  firstName: string

  @IsDefined()
  secondName: string

  @IsDefined()
  @IsEmail()
  email: string

  avatarUrl: string

  constructor(firstName: string, secondName: string, email: string, avatarUrl: string) {
    this.secondName = secondName
    this.firstName = firstName
    this.avatarUrl = avatarUrl
    this.email = email
  }

  getId(): number {
    return this._id
  }

  setId(id: number) {
    this._id = id
  }
}

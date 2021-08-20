import { IsDefined, IsEmail } from 'class-validator'

export class UserProfile {
  private _id: number = -1;

  @IsDefined()
  firstName: string

  @IsDefined()
  lastName: string

  @IsDefined()
  @IsEmail()
  email: string

  avatarUrl: string

  constructor(firstName: string, lastName: string, email: string, avatarUrl: string) {
    this.lastName = lastName
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

import { IsDefined, IsEmail } from 'class-validator'

export class UserProfile {
  @IsDefined()
  firstName: string

  @IsDefined()
  secondName: string

  @IsDefined()
  @IsEmail()
  email: string

  @IsDefined()
  avatarUrl: string

  constructor(firstName: string, secondName: string, email: string, avatarUrl: string) {
    this.secondName = secondName
    this.firstName = firstName
    this.avatarUrl = avatarUrl
    this.email = email
  }
}

import { UserProfile } from './UserProfile'

export interface IUserProfileDao {
  getOne(id: number): UserProfile
  getAll(): UserProfile[]
  delete(id: number): boolean
  update(user: UserProfile): boolean
  save(user: UserProfile): number
}

import { UserProfile } from '../UserProfile'

export interface IUserProfileRepository {
  getOne(id: number): Promise<UserProfile>
  getAll(): Promise<UserProfile[]>
  delete(id: number): Promise<boolean>
  update(user: UserProfile): Promise<boolean>
  save(user: UserProfile): Promise<number>
}

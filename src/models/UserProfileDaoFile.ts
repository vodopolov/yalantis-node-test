import { IUserProfileDao } from './IUserProfileDao'
import { UserProfile } from './UserProfile'
const fs = require('fs')

export class UserProfileDaoFile implements IUserProfileDao {
  private readonly path: string = 'db/users.json';
  private maxId: number = -1;

  getOne(id: number): UserProfile {
    throw new Error('Method not implemented.')
  }

  delete(id: number): boolean {
    const users = this.getAll()
    const filteredUsers = users.filter(user => user.getId() !== id)
    if (users.length === filteredUsers.length) {
      return false
    }
    this.saveUserData(filteredUsers)
    return true
  }

  update(user: UserProfile): boolean {
    throw new Error('Method not implemented.')
  }

  save(user: UserProfile): number {
    const users = this.getAll()
    for (const item of users) {
      this.maxId = Math.max(this.maxId, item.getId())
    }
    user.setId(++this.maxId)
    users.push(user)
    this.saveUserData(users)
    return this.maxId
  }

  getAll(): UserProfile[] {
    const jsonData = JSON.parse(fs.readFileSync(this.path))
    const result: UserProfile[] = []
    for (const item of jsonData) {
      const parsedItem = new UserProfile(item.firstName, item.secondName, item.email, item.avatarUrl)
      parsedItem.setId(Number.parseInt(item._id))
      result.push(parsedItem)
    }
    return result
  }

  private saveUserData(data: UserProfile[]) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(this.path, stringifyData)
  }
}

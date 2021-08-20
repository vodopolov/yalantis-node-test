import { UserProfile } from '../UserProfile'
import { IUserProfileRepository } from './IUserProfileRepository'
const fs = require('fs')

export class UserProfileFileRepository implements IUserProfileRepository {
  private readonly path: string = 'storage/users.json';
  private maxId: number = -1;

  getOne(id: number): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      const jsonData = JSON.parse(fs.readFileSync(this.path))
      for (const item of jsonData) {
        const numId = Number.parseInt(item._id)
        if (numId === id) {
          const parsedItem = new UserProfile(item.firstName, item.secondName, item.email, item.avatarUrl)
          parsedItem.setId(numId)
          resolve(parsedItem)
        }
      }
      reject(new Error(`User not found. Id: ${id}`))
    })
  }

  delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getAll().then((users: UserProfile[]) => {
        const filteredUsers = users.filter(user => user.getId() !== id)
        if (users.length === filteredUsers.length) {
          resolve(false)
        }
        this.saveUserData(filteredUsers)
        return resolve(true)
      }).catch((reason) => {
        return reject(reason)
      })
    })
  }

  update(user: UserProfile): Promise<boolean> {
    return Promise.reject(new Error('Not implemented yet'))
  }

  save(user: UserProfile): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getAll().then((users: UserProfile[]) => {
        for (const item of users) {
          this.maxId = Math.max(this.maxId, item.getId())
        }
        user.setId(++this.maxId)
        users.push(user)
        this.saveUserData(users)
        return resolve(this.maxId)
      }).catch((reason) => {
        return reject(reason)
      })
    })
  }

  getAll(): Promise<UserProfile[]> {
    return new Promise((resolve, reject) => {
      const jsonData = JSON.parse(fs.readFileSync(this.path))
      const result: UserProfile[] = []
      for (const item of jsonData) {
        const parsedItem = new UserProfile(item.firstName, item.secondName, item.email, item.avatarUrl)
        parsedItem.setId(Number.parseInt(item._id))
        result.push(parsedItem)
      }
      resolve(result)
    })
  }

  private saveUserData(data: UserProfile[]) {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(this.path, stringifyData)
  }
}

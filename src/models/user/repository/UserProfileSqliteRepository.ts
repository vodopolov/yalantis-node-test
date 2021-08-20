import sqlite3 from 'sqlite3'
import { UserProfile } from '../UserProfile'
import { UserSavedResponse } from '../UserSavedResponse'
import { IUserProfileRepository } from './IUserProfileRepository'

export class UserProfileSqliteRepository implements IUserProfileRepository {
  private readonly db: sqlite3.Database

  public constructor() {
    this.db = new sqlite3.Database('storage/database.db', this.checkTable.bind(this))
  }

  getOne(id: number): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Users WHERE id = ${id}`
      this.db.get(query, (err, row) => {
        if (err) {
          return reject(err)
        } else if (!row) {
          return reject(new Error(`User not found. Id: ${id}`))
        }
        const profile = new UserProfile(row.firstName, row.lastName, row.email, row.avatarUrl)
        profile.setId(id)
        return resolve(profile)
      })
    })
  }

  getAll(): Promise<UserProfile[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Users'
      this.db.all(query, (err, rows) => {
        if (err) {
          return reject(err)
        }
        const profiles: UserProfile[] = []
        rows.forEach((row) => {
          const rowProfile = new UserProfile(row.firstName, row.lastName, row.email, row.avatarUrl)
          rowProfile.setId(row._id)
          profiles.push(rowProfile)
        })
        return resolve(profiles)
      })
    })
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  update(user: UserProfile): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  save(user: UserProfile): Promise<UserSavedResponse> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Users(firstName, lastName, email, avatarUrl) VALUES(?, ?, ?, ?)'
      this.db.run(query, [user.firstName, user.lastName, user.email, user.avatarUrl], function (err) {
        if (err) {
          return reject(err)
        }
        return resolve(new UserSavedResponse(this.lastID))
      })
    })
  }

  private checkTable(err: Error | null) {
    if (err) {
      throw err
    }
    this.db.run(`CREATE TABLE IF NOT EXISTS Users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        avatarUrl TEXT)`, (err) => {
      if (err) {
        throw new Error(err.message)
      } else {
        console.log('Table was successfully created')
      }
    })
  }
}

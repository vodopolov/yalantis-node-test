import { Request, Response } from 'express'
import multer from 'multer'
import 'reflect-metadata'
import { Body, Controller, Get, Post, Req, Res, UseBefore } from 'routing-controllers'
import { IUserProfileDao } from '../models/IUserProfileDao'
import { UserProfile } from '../models/UserProfile'
import { UserProfileDaoFile } from '../models/UserProfileDaoFile'
import { storage as customStorage } from './CustomMulterStorage'

@Controller()
export class UserController {
  private readonly _userDao: IUserProfileDao = new UserProfileDaoFile()

  @Post('/users/')
  postOne(@Body() info: UserProfile, @Res() response: Response) {
    const id = this._userDao.save(info)
    console.log(JSON.stringify(info))
    return response.send({ success: true, msg: `User data added successfully. Id: ${id}` })
  }

  @Get('/users/all/')
  getAll(@Res() response: Response) {
    return response.send(JSON.stringify(this._userDao.getAll()))
  }

  @Post('/form/')
  @UseBefore(multer({ storage: customStorage }).single('avatar'))
  postOneForm(@Body() profile: UserProfile, @Res() response: Response, @Req() request: Request) {
    const file = request.file
    if (!file || !file.filename) {
      return response.send({ success: false, msg: 'No image or wrong format' })
    }
    const completeProfile = new UserProfile(profile.firstName, profile.secondName, profile.email, file.filename)
    const id = this._userDao.save(completeProfile)
    console.log(JSON.stringify(completeProfile))
    return response.send({ success: true, msg: `User data added successfully. Id: ${id}` })
  }
}

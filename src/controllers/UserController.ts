import { Response } from 'express'
import 'reflect-metadata'
import { Body, Controller, Post, Res } from 'routing-controllers'
import { IUserProfileDao } from '../models/IUserProfileDao'
import { UserProfile } from '../models/UserProfile'
import { UserProfileDaoFile } from '../models/UserProfileDaoFile'

@Controller()
export class UserController {
  private readonly _userDao: IUserProfileDao = new UserProfileDaoFile()

  @Post('/users/')
  postOne(@Body() info: UserProfile, @Res() response: Response) {
    const id = this._userDao.save(info)
    return response.send({ success: true, msg: `User data added successfully. Id: ${id}` })
  }

  // @Get('/users/all/')
  // getAll(@Res() response: Response) {
  //   return response.send(JSON.stringify(this._userDao.getAll()))
  // }
}

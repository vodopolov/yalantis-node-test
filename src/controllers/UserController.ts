import { Request, Response } from 'express'
import multer from 'multer'
import 'reflect-metadata'
import { Body, Controller, Get, Param, Post, Req, Res, UseBefore } from 'routing-controllers'
import { IUserProfileRepository } from '../models/user/repository/IUserProfileRepository'
import { UserProfileFileRepository } from '../models/user/repository/UserProfileFileRepository'
import { UserProfile } from '../models/user/UserProfile'
import { storage as customStorage } from './CustomMulterStorage'

@Controller()
export class UserController {
  private readonly _userRepository: IUserProfileRepository = new UserProfileFileRepository()

  @Post('/form/')
  @UseBefore(multer({ storage: customStorage }).single('avatar'))
  postOneForm(@Body() profile: UserProfile, @Res() response: Response, @Req() request: Request) {
    try {
      const file = request.file
      if (!file || !file.filename) {
        return response.send({ success: false, msg: 'No image or wrong format' })
      }
      const relativeImageUrl = `/${process.env.IMAGES_STORAGE_URL}/${file.filename}`
      const completeProfile = new UserProfile(profile.firstName, profile.secondName, profile.email, relativeImageUrl)
      this._userRepository.save(completeProfile).then(id => {
        console.log(JSON.stringify(completeProfile))
        return response.send({ success: true, msg: `User data added successfully. Id: ${id}` })
      })
    } catch (e) {
      return response.send({ success: true, msg: `User save unsuccessful. Reason: ${JSON.stringify(e)}` })
    }
  }

  @Get('/users/all/')
  getAll(@Res() response: Response) {
    this._userRepository.getAll().then((users: UserProfile[]) => {
      return response.send(JSON.stringify(users))
    })
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number, @Res() response: Response) {
    this._userRepository.getOne(id).then((profile) => {
      return response.send(profile)
    }).catch(reason => {
      return response.send({ success: false, msg: reason.message })
    })
  }
}

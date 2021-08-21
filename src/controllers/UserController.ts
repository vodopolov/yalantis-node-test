import { isNumber } from 'class-validator'
import { Request, Response } from 'express'
import multer from 'multer'
import 'reflect-metadata'
import { Body, Controller, Get, Param, Post, Req, Res, UseBefore } from 'routing-controllers'
import { IUserProfileRepository } from '../models/user/repository/IUserProfileRepository'
import { UserProfileSqliteRepository } from '../models/user/repository/UserProfileSqliteRepository'
import { UserProfile } from '../models/user/UserProfile'
import { ImageProcessor } from '../utils/ImageProcessor'
import { storage as customStorage } from './CustomMulterStorage'

@Controller()
export class UserController {
  private readonly _userRepository: IUserProfileRepository = new UserProfileSqliteRepository()

  @Post('/form/')
  @UseBefore(multer({ storage: customStorage }).single('avatar'))
  postOneForm(@Body() profile: UserProfile, @Res() response: Response, @Req() request: Request) {
    try {
      const file = request.file
      if (!file || !file.filename) {
        return response.status(400).json({ success: false, msg: 'No image or wrong format' })
      }
      return ImageProcessor.cropImage(file.filename, 200, 200).then(croppedFilename => {
        const relativeImageUrl = `/${process.env.IMAGES_STORAGE_URL}/${croppedFilename}`
        const completeProfile = new UserProfile(profile.firstName, profile.lastName, profile.email, relativeImageUrl)
        return this._userRepository.save(completeProfile)
      })
    } catch (e) {
      console.error(e)
    }
  }

  @Get('/users/all/')
  getAll() {
    return this._userRepository.getAll()
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number, @Res() response: Response) {
    if (isNumber(id)) {
      return this._userRepository.getOne(id)
    } else {
      return response.status(400).json({ success: false, msg: 'Id must be number' })
    }
  }
}

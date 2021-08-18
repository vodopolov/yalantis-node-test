import 'reflect-metadata'
import { Body, Controller, Get, OnUndefined, Param, Post } from 'routing-controllers'
import { UserProfile } from '../model/UserProfile'

@Controller()
export class UserController {
  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id
  }

  @Post('/users')
  @OnUndefined(204)
  postOne(@Body() info: UserProfile) {
    console.log(JSON.stringify(info))
  }
}

import { ActionResponse, LoginActionResponse, UserProfile } from '@shared';
import { BodyParams, Controller, Get, Post, QueryParams, UseBefore } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';
import { request } from 'express';
import { system } from 'faker';
import { Schema } from 'mongoose';

import { DistancesService } from '../services/distances.service';
import { RequestUser } from '../decorators/request-user.decorator';
import { RegisterForm } from '../forms';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserProfileDbModel } from '../models';
import * as responses from '../responses';
import { AuthService } from '../services/auth.service';
import { HeatMapService } from '../services/heatmap.service';


@Controller('/')
export class ApiController {
  constructor(
    private authService: AuthService,
    private heatmapservice: HeatMapService,
    private distancesservice: DistancesService
    ) { }

  @Get('/test')
  test(): ActionResponse<void> {
    return responses.getOkayResponse();
  }

  @Get('/error-test')
  errorTest(): ActionResponse<void> {
    throw new BadRequest('This is an error!');
  }

  @Get('/say-something')
  saySomething(
    @QueryParams('whatToSay') asdsa: string
  ): ActionResponse<string> {
    return responses.getOkayResponse<string>(asdsa);
  }

  @Post('/login')
  login(
    @BodyParams('username') username: string,
    @BodyParams('password') password: string
  ): Promise<LoginActionResponse> {
    return this.authService.authenticate(username, password).then((user) => {
      if (!user) throw new BadRequest(`Username or password are invalid!`);

      const token = this.authService.generateToken(user.toJSON());
      const response = responses.getOkayResponse();

      return {
        ...response,
        data: {
          token: token,
          profile: user,
        },
      };
    });
  }

  @Get('/profile')
  @UseBefore(AuthMiddleware)
  getProfile(@RequestUser() user: UserProfile): UserProfile {
    return user;
  }ß

  @Get('/admin')
  @UseBefore(AuthMiddleware)
  adminTest(): ActionResponse<void> {
    return this.test();
  }

  @Get('/logout')
  @UseBefore(AuthMiddleware)
  logout(): Promise<ActionResponse<void>> {
    // TODO: Implement your own logout mechanisem (JWT token blacklists, etc...)
    return Promise.reject(`Logout has not been implemented!`);
  }

  @Get('/heatmaprequest')
  async heatmaprequest(@QueryParams('year') year: string): Promise<ActionResponse<Object>> {

    const results = await this.heatmapservice.getHeatMap(year);
    return responses.getOkayResponse(results);
    //return responses.getOkayResponse({
    //  "doron":"asdsad"
    //});
  }
  @Get('/distances')
  async distancesrequest(@QueryParams('LATITUDE') LATITUDE: number, @QueryParams('LONGITUDE') LONGITUDE: number): Promise<ActionResponse<Object>> {
    
    const results =  await this.distancesservice.getBusDistances(LATITUDE, LONGITUDE);
    return responses.getOkayResponse(results);

  }

  @Get('/assetscore')
  async assetscorerequest(@QueryParams('roomNum') roomNum: string, @QueryParams('lat') lat: string, @QueryParams('lon') lon: string ): Promise<ActionResponse<Object>> {

    // const results = await this.heatmapservice.getHeatMap(year);
    // return responses.getOkayResponse(results);
    return responses.getOkayResponse({
      roomNum : roomNum,
      lat     : lat,
      lon     : lon,
    });
  }

  // TODO: Maybe move to model validations of Ts.ED? http://v4.tsed.io/docs/model.html#example
  @Post('/register')
  register(
    // Don't validate using the built in models
    @BodyParams() registerForm: RegisterForm
  ): Promise<UserProfile> {
    // Hash the user password and create it afterwards
    return registerForm.getHashedPassword().then((hashedPassword) => {
      return UserProfileDbModel.create({
        ...registerForm,
        password: hashedPassword,
      });
    });
  }
}

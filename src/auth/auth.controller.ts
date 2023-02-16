import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles';

  

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get('private')
  @UseGuards(AuthGuard()) 
 testingPrivateRoute(
  // @Req() request:Express.Request
  @GetUser() user:User,
  @GetUser('_id') userId:User,
  @GetUser('email') userEmail:string
 ){
   return{
    ok:true,
    message:'Hola mundo private',
    user, 
    userId,
    userEmail
  }
 }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(),UserRoleGuard) 
 testingPrivateRoute2(
  @GetUser() user:User
 ){

    return {
      ok:true,
      user
    }

 }
 @Get('private3')
 @Auth(ValidRoles.admin)
 testingPrivateRoute3(
 @GetUser() user:User
){

   return {
     ok:true,
     user
   }

}

 
} 
 
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'; 


import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@Injectable()
export class AuthService {
 
  // -----------------------------------------------------
  constructor(
    
    @InjectModel( User.name )
    private readonly userModel: Model<User>,
    private readonly jwtService:JwtService,
    
    private readonly configService:ConfigService,

  ) {}
  // -----------------------------------------------------
  async create(createUserDto: CreateUserDto) {
    try {
      const{ password, ...userData } = createUserDto;
      const user ={
         password: bcrypt.hashSync(password,10),
         ...userData        
      }
      const userCreated = await this.userModel.create(user);
      delete userCreated.password;
      // To do retornar el jwt de acceso
      return {
        email:user.email,
        password:user.password,
        id:userCreated._id,
        token: this.getJwtToken({id:userCreated._id})     
      }; 
        
    } catch (error) {
      this.handleExceptions( error );
    }
  }
  // -----------------------------------------------------

  async login (loginUserDto:LoginUserDto){

  const{ password,email } = loginUserDto;
  const user = await this.userModel.findOne({email},{email:1, password:1,_id:1}); 
  //  db.COLLECTION_NAME.find({},{KEY:1}) 
  if ( !user ) 
  throw new UnauthorizedException('Credentials are not valid (email)');
  if ( !bcrypt.compareSync(password, user.password) )
  throw new UnauthorizedException('Credentials are not valid (password)');
  return { 
    email:user.email,
    password:user.password,
    token: this.getJwtToken({id:user._id})    
  };
  }
  

// -----------------------------------------------------
 
private getJwtToken( payload: JwtPayload ) {

  const token = this.jwtService.sign( payload );
  return token;

}
 // -----------------------------------------------------
  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`User exists in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create User - Check server logs`);
  }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

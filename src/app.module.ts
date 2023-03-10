import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
    // MongooseModule.forRoot(process.env.MONGODB_CNN),
    PrescriptionsModule, 
     
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  // constructor(){
  //   console.log(process.env)
  // }
}

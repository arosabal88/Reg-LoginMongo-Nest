import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose/dist";
import { Document } from "mongoose";


@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        index:true
    })
    fullName:string;
    
    @Prop({
        unique: true,
        index:true
    })
    medicalRecord:string;

    @Prop({
        unique: true,
        index:true
    })
    email:string;
    @Prop({
        // select: false
    })
    password:string;
    
    @Prop()
    healthEntity:string;

    @Prop({
        default: true,
        
    })
    isActive:boolean;
    
    @Prop({
        default:['user']
    })
    roles:string[]


}

export const UserSchema = SchemaFactory.createForClass(User);
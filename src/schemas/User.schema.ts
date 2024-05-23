import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { UserSettings } from "./UserSettings.schema";
import { Megotchi } from "./Megotchi.schema";

@Schema({versionKey: false, validateBeforeSave: true})
export class User {
    @Prop({ required: true})
    displayName: string;

    @Prop({ unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;
    
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Megotchi' })
    megotchi: Megotchi;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User)


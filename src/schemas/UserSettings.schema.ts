import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false, validateBeforeSave: true})
export class UserSettings {
    
    @Prop({required: false})
    receiveNotifications?: boolean;

    @Prop({required: false})
    receiveEmails?: boolean;

    @Prop({required: false})
    receiveSMS?: boolean;

}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings)
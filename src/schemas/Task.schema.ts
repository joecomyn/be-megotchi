import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false, validateBeforeSave: true})
export class Task {

    @Prop({ required: true })
    title: string;
    
    @Prop({ required: true })
    body: string;

    @Prop({ required: true })
    iconUrl: string;

    @Prop({ required: true })
    message: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task)
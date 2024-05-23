import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false, validateBeforeSave: true})
export class Megotchi {
    
    @Prop({required: true})
    color: string;
}

export const MegotchiSchema = SchemaFactory.createForClass(Megotchi);
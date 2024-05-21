import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller"
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSettings.schema";
import { Megotchi, MegotchiSchema } from "src/schemas/Megotchi.schema";

@Module({
    imports: [
        MongooseModule.forFeature(
        [
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: UserSettings.name,
                schema: UserSettingsSchema
            },
            {
                name: Megotchi.name,
                schema: MegotchiSchema
            }

        ])
],
providers:[UsersService],
controllers:[UsersController],
})
export class UsersModule{}

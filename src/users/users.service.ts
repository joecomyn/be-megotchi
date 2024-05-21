import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from './dto/User.dto';
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UserSettings } from "src/schemas/UserSettings.schema";
import { Megotchi } from "src/schemas/Megotchi.schema";
import { UpdateMegotchiDto } from "./dto/UpdateMegotchi.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, 
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
        @InjectModel(Megotchi.name) private megotchiModel: Model<Megotchi>,
    ) {}

    async createUser({ megotchi, settings, ...createUserDto }: CreateUserDto){

            const newMegotchi = new this.megotchiModel(megotchi);
            const savedNewMegotchi = await newMegotchi.save();

        if(settings) {
            const newSettings = new this.userSettingsModel(settings);
            const savedNewSettings = await newSettings.save();
            const newUser = new this.userModel({
                ...createUserDto,
                megotchi: savedNewMegotchi._id,
                settings: savedNewSettings._id,
            });
            return newUser.save();
        }

        const newUser = new this.userModel({
            ...createUserDto,
            megotchi: savedNewMegotchi._id,
        });
        return newUser.save();
    }

    getUsers(){
        return this.userModel.find().populate([{ path: 'settings'}, { path: 'megotchi'}]);
    }

    getUserById(id: string){
        return this.userModel.findById(id).populate([{ path: 'settings'}, { path: 'megotchi'}]);
    }

    updateUser(id: string, updateUserDto: UpdateUserDto){
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
    }

    deleteUser(id: string,) {
        return this.userModel.findByIdAndDelete(id);
    }

    async updateUserMegotchi(id: string, updateMegotchiDto: UpdateMegotchiDto) {
        const user = await this.userModel.findById(id);
        const megotchiId = user.megotchi.toString()
        return this.megotchiModel.findByIdAndUpdate(megotchiId, updateMegotchiDto, {new: true})
    }
}
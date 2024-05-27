import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from './dto/User.dto';
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UserSettings } from "src/schemas/UserSettings.schema";
import { Megotchi } from "src/schemas/Megotchi.schema";
import { UpdateMegotchiDto } from "./dto/UpdateMegotchi.dto";
import { UpdateUserTasksDto } from "./dto/UpdateUserTasks.dto";

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
                tasklist: [],
                balance: 0,
                settings: savedNewSettings._id,
            });
            let savedNewUser;
            try {
                await newUser.save() 
            } catch (error) {
                await this.megotchiModel.findByIdAndDelete(savedNewMegotchi._id);
                return error;
            }
            return await this.userModel.findById(savedNewUser._id).populate([{ path: 'settings'}, { path: 'megotchi'}]).lean();
        }

        const newUser = new this.userModel({
            ...createUserDto,
            megotchi: savedNewMegotchi._id,
            taskList: [],
            balance: 0,
        })
        let savedNewUser;
        try {
            savedNewUser = await newUser.save() 
        } catch (error) {
            await this.megotchiModel.findByIdAndDelete(savedNewMegotchi._id);
            return error;
        }
        return await this.userModel.findById(savedNewUser._id).populate({ path: 'megotchi'}).lean();
    }

    async getUsers(){
        return await this.userModel.find().populate([{ path: 'settings'}, { path: 'megotchi'}]).lean();
    }

    async getUserById(id: string){
        return await this.userModel.findById(id).populate([{ path: 'settings'}, { path: 'megotchi'}]).lean();
    }

    async updateUser(id: string, {balance, ...updateUserDto}: UpdateUserDto){
        if(balance){
            return this.userModel.findByIdAndUpdate(
                id, 
                {$inc: { balance: balance}}, 
                {new: true, runValidators: true })
                .populate([{ path: 'settings'}, { path: 'megotchi'}])
                .lean();
        }
        return this.userModel.findByIdAndUpdate(
            id, 
            updateUserDto, 
            {new: true, runValidators: true })
            .populate([{ path: 'settings'}, 
            { path: 'megotchi'}]).lean();
    }

    deleteUser(id: string,) {
        return this.userModel.findByIdAndDelete(id);
    }

    async updateUserMegotchi(id: string, updateMegotchiDto: UpdateMegotchiDto) {
        const user = await this.userModel.findById(id);
        const megotchiId = user.megotchi.toString()
        return this.megotchiModel.findByIdAndUpdate(megotchiId, updateMegotchiDto, {new: true})
    }

    async updateUserTasks(id: string, {isDelete, ...updateUserTasksDto}: UpdateUserTasksDto) {
        const { taskList } = updateUserTasksDto;
        if(isDelete){
            const taskIds = taskList.map(task => new Types.ObjectId(task._id));
            return this.userModel.findByIdAndUpdate(id, 
                { $pull: { tasklist: { _id: { $in: taskIds } } } },
                { new: true, runValidators: true })
            .populate([{ path: 'settings'}, { path: 'megotchi'}])
            .lean();
        }

        return this.userModel.findByIdAndUpdate(
            id, 
            { $push: { tasklist: { $each: taskList } } }, 
            { new: true, runValidators: true })
        .populate([{ path: 'settings'}, { path: 'megotchi'}])
        .lean();
    }

}
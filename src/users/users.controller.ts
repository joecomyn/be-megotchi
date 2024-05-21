import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/User.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UpdateMegotchiDto } from "./dto/UpdateMegotchi.dto";
import  mongoose  from "mongoose";

@Controller('users')
export class UsersController {
 constructor(private userService: UsersService){}

@Post()
@UsePipes(new ValidationPipe())
createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
}

@Get()
getUsers(){
    return this.userService.getUsers()
}

@Get(':id')
 async getUserById(@Param('id') id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('User not found', 404)
    const findUser = await this.userService.getUserById(id)
    if(!findUser) throw new HttpException('User not found', 404)
    return findUser;
}

@Patch(':id')
@UsePipes(new ValidationPipe())
async updateUser(@Param('id') id: string,@Body() updateUserDto: UpdateUserDto){
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateUser = await this.userService.updateUser(id, updateUserDto)
    if(!updateUser) throw new HttpException('User Not Found', 404)
    return updateUser
}

@Delete(':id')
async deleteUser(@Param('id') id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404) 
    return;
}

@Patch(':id/megotchi')
@UsePipes(new ValidationPipe())
async updateUserMegotchi(@Param('id') id: string, @Body() updateMegotchiDto: UpdateMegotchiDto){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateMegotchi = await this.userService.updateUserMegotchi(id, updateMegotchiDto)
    if(!updateMegotchi) throw new HttpException('Megotchi Not Found', 404)
    return updateMegotchi;
}

}
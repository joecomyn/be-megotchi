import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/User.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UpdateMegotchiDto } from "./dto/UpdateMegotchi.dto";
import  mongoose  from "mongoose";
import { UpdateUserTasksDto } from "./dto/UpdateUserTasks.dto";

@Controller('users')
export class UsersController {
 constructor(private userService: UsersService){}

@Post()
@UsePipes(new ValidationPipe())
async createUser(@Body() createUserDto: CreateUserDto){
    const {email, password, ...createdUser} = await this.userService.createUser(createUserDto);
    return createdUser;
}

@Get()
async getUsers(){
    const returnedUsers = await this.userService.getUsers();
    return returnedUsers.map((user) => {
        const {email, password, ...strippedUser} = user;
        return strippedUser;
    })
}

@Post('/signin')
async signInUser(@Body() userCredentials: { email: string, password: string}){
    const users = await this.userService.getUsers()
    const foundUser = users.filter((user) => user.email === userCredentials.email && user.password === userCredentials.password)

    if(foundUser.length > 0){

        const {email, password, ...returnUser} = foundUser[0];
        return returnUser;
    }
    else{
        throw new HttpException('User Not Found', 404)
    }
}

@Patch(':id/tasks')
@UsePipes(new ValidationPipe())
async updateUserTasks(@Param('id') id: string, @Body() updateUserTasksDto: UpdateUserTasksDto){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedUser = await this.userService.updateUserTasks(id, updateUserTasksDto);
    if(!updatedUser) throw new HttpException('User Not Found', 404);
    const {email, password,...returnUser} =  updatedUser;
    return returnUser;
}

@Get(':id')
async getUserById(@Param('id') id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('User not found', 404);
    const foundUser = await this.userService.getUserById(id);
    if(!foundUser) throw new HttpException('User not found', 404);
    const {email, password,...returnUser} =  foundUser;
    return returnUser;
}

@Patch(':id')
@UsePipes(new ValidationPipe())
async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedUser = await this.userService.updateUser(id, updateUserDto)
    if(!updatedUser) throw new HttpException('User Not Found', 404)
    const {email, password,...returnUser} =  updatedUser;
    return returnUser;
}

@Delete(':id')
async deleteUser(@Param('id') id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);this.userService.getUsers()
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404) 
    return;
}

@Patch(':id/megotchi')
@UsePipes(new ValidationPipe())
async updateUserMegotchi(@Param('id') id: string, @Body() updateMegotchiDto: UpdateMegotchiDto){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateMegotchi = await this.userService.updateUserMegotchi(id, updateMegotchiDto);
    if(!updateMegotchi) throw new HttpException('Megotchi Not Found', 404);
    return updateMegotchi;
}

}
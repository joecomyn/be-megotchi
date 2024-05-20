import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/User.dto";

@Controller('users')
export class UsersController {
 constructor(private userService: UsersService){}

@Post()
@UsePipes(new ValidationPipe())
createUser(@Body() createUserDto: CreateUserDto){
    console.log(createUserDto)
}
}
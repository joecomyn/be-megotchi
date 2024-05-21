import { IsObject, IsOptional, IsString } from "class-validator";
import { UpdateMegotchiDto } from "./UpdateMegotchi.dto";

export class UpdateUserDto{
    
    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;

}
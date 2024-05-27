import { IsNotEmpty, IsOptional, IsString, IsBoolean, ValidateNested, IsEmail, Matches } from "class-validator";
import { Type } from 'class-transformer';
import { CreateMegotchiDto } from "./Megotchi.dto";

export class CreateUserSettingsDto {
    
    @IsOptional()
    @IsBoolean()
    receiveNotifications?: boolean;

    @IsOptional()
    @IsBoolean()
    receiveEmails?: boolean;

    @IsOptional()
    @IsBoolean()
    receiveSMS?: boolean;
}

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    displayName?: string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/)
    password : string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateMegotchiDto)
    megotchi: CreateMegotchiDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;
 

}
import { IsNotEmpty, IsOptional, IsString, IsBoolean, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

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
    @IsNotEmpty()
    @IsString()
    username : string;

    @IsString()
    @IsOptional()
    displayName?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;
}
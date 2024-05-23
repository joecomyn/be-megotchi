import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
export class UpdateUserDto{
    
    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @IsOptional()
    @IsNumber()
    balance?: number;
}
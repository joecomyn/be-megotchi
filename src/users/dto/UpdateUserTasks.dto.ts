import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateUserTasksDto{
    
    @IsNotEmpty()
    @IsBoolean()
    isDelete: boolean;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateUserTaskDto)
    taskList: UpdateUserTaskDto[];

}

export class UpdateUserTaskDto {

    @IsOptional()
    @IsString()
    _id?: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @IsNotEmpty()
    @IsString()
    iconUrl: string;

    @IsNotEmpty()
    @IsString()
    message: string;

}
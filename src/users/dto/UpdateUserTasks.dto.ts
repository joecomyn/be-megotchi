import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";
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
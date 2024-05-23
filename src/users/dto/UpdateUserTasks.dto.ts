import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Expose, Type } from 'class-transformer';

export class UpdateUserTasksDto{
    
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateUserTaskDto)
    taskList: UpdateUserTaskDto[];
}

export class UpdateUserTaskDto {

    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    body: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    iconUrl: string;

}
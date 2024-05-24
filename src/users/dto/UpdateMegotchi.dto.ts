import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateMegotchiDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsHexColor()
    color?: string;

}
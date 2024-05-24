import { IsHexColor, IsString, IsNotEmpty } from 'class-validator';

export class CreateMegotchiDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsHexColor()
    color: string;

}
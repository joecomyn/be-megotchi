import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateMegotchiDto {

    @IsNotEmpty()
    @IsHexColor()
    color: string;

}
import { IsHexColor, IsOptional } from 'class-validator';

export class UpdateMegotchiDto {

    @IsOptional()
    @IsHexColor()
    color?: string;

}
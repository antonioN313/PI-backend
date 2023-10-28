import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class recotarDto {
    @IsNotEmpty({ message: 'A data não pode estar vazia' })
    @IsDateString({}, { message: 'A data inserida não é válida' })
    data: Date;

    @ApiProperty({
        description:
            'O valor serve para descrever o quanto o insumo de uma cotação especifica esta custando',
        example: '100',
    })
    @IsNotEmpty({ message: 'O valor não pode estar vazio' })
    @IsNumber({}, { message: 'O valor inserido não é válido' })
    valor: number;
}

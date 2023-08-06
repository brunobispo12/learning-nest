import { ArrayMinSize, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { AuthorDTO } from "./author.dto"

export class BookDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly name: string

    @Type(() => AuthorDTO)
    @ArrayMinSize(1)
    @IsNotEmpty({ each: true })
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    readonly author: AuthorDTO[]

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly language: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly releaseYear: number

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly publisher: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly pages: number

}
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthorDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly surname: string

}
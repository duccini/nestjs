import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthDTO {
  @IsString()
  @MinLength(4, {
    message: 'username must be at least 4 characters long',
  })
  @MaxLength(20, {
    message: 'username must be at maximum 20 characters long',
  })
  username: string;

  @IsString()
  @MinLength(8, {
    message: 'password must be at least 8 characters long',
  })
  @MaxLength(32, {
    message: 'password must be at least 32 characters long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have a least 1 Uppercase, 1 Lower case and 1 special character',
  })
  password: string;
}

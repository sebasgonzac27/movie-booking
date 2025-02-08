import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../security/password.service';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('user or password is wrong');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('user or password is wrong');
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token, email };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new ConflictException('user already exists');
    }

    const newUser = await this.usersService.create({
      ...signUpDto,
      password: await this.passwordService.hashPassword(password),
    });

    return await this.usersService.create(newUser);
  }
}

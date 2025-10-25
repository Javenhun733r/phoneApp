import { faker } from '@faker-js/faker';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { User } from 'src/generated/client';
import { PrismaService } from 'src/prisma.service';
import { AuthDTO } from './dto/auth.dto';
interface JwtPayload {
  id: string;
}
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async login(dto: AuthDTO) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);
    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }
  async getNewTokens(refreshToken: string) {
    const result: JwtPayload = await this.jwt.verifyAsync(refreshToken);
    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: result.id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const tokens = this.issueTokens(user.id);
    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }
  async register(dto: AuthDTO) {
    const oldUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (oldUser) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        password: await hash(dto.password),
        phone: faker.phone.number(),
      },
    });
    const tokens = this.issueTokens(user.id);
    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }
  private issueTokens(userId: string) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }
  private async validateUser(dto: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');
    return user;
  }
}

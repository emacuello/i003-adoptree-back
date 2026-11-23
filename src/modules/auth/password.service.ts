import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ERROR_KEYS } from "../../constants/index.js";
import { UsersService } from "../users/users.service.js";
import type { WrapperType } from "../../utils/index.js";

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: WrapperType<UsersService>,
  ) {}

  async validateOrThrowException(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        throw new ForbiddenException(ERROR_KEYS.AUTH_INVALID_CREDENTIALS);
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        throw new ForbiddenException(ERROR_KEYS.AUTH_INVALID_CREDENTIALS);
      }

      return user;
    } catch (error) {
      this.logger.error("Validate error: ", error);
      throw error;
    }
  }

  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      this.logger.error("Hashing error: ", error);
      throw error;
    }
  }
}

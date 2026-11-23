import { ForbiddenException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RoleEnum, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UsersService } from "../../users/users.service.js";
import { PasswordService } from "../password.service.js";

describe("PasswordService", () => {
  let passwordService: PasswordService;

  const mockUserService = {
    findOneByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  describe("validateOrThrowException", () => {
    it("should return user if credentials are valid", async () => {
      const email = "test@example.com";
      const password = "password";
      const user: User = {
        id: 1,
        email,
        password: await bcrypt.hash(password, 10),
        role: RoleEnum.USER,
        name: "",

        googleId: "1",
        avatar: "",
      };

      mockUserService.findOneByEmail.mockResolvedValue(user);

      const result = await passwordService.validateOrThrowException(
        email,
        password,
      );

      expect(result).toEqual(user);
      expect(mockUserService.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it("should throw ForbiddenException if user not found", async () => {
      const email = "nonexistent@example.com";
      const password = "password";

      mockUserService.findOneByEmail.mockResolvedValue(null);

      await expect(
        passwordService.validateOrThrowException(email, password),
      ).rejects.toThrow(ForbiddenException);
    });

    it("should throw ForbiddenException if password is invalid", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";
      const user: User = {
        id: 1,
        email,
        password: await bcrypt.hash("correctpassword", 10),
        role: RoleEnum.USER,
        name: "",
        googleId: "2",
        avatar: "",
      };

      mockUserService.findOneByEmail.mockResolvedValue(user);

      await expect(
        passwordService.validateOrThrowException(email, password),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe("hash", () => {
    it("should hash the password so that bcrypt can verify it", async () => {
      const password = "password";

      const result = await passwordService.hash(password);

      expect(result).not.toEqual(password);
      expect(await bcrypt.compare(password, result)).toBe(true);
    });
  });
});

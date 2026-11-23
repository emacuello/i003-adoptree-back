import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { PasswordService } from "./password.service.js";
import { GoogleAuthService } from "./google-auth.service.js";

const authConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    GoogleAuthService,
    {
      provide: "AUTH_CONFIG",
      useValue: authConfig, // Proveedor que define la configuración de AUTH_CONFIG
    },
  ],
  exports: [],
})
export class AuthModule {}

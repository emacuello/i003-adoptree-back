import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import Joi from "joi";
import { PrismaModule } from "./prisma.service.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ArbolModule } from "./modules/arbol/arbol.module.js";
import { AuthConfig, AuthEnvSchema } from "./modules/auth/auth.config.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { CosechaModule } from "./modules/cosecha/cosecha.module.js";
import { FincaModule } from "./modules/finca/finca.module.js";
import { PaymentsController } from "./modules/payments/payments.controller.js";
import { PaymentsService } from "./modules/payments/payments.service.js";
import { UsersModule } from "./modules/users/users.module.js";
import { ShippingAddressModule } from "./modules/shipping-address/shipping-address.module.js";
import { AdoptionModule } from "./modules/adoption/adoption.module.js";
import { ProductorModule } from "./modules/productor/productor.module.js";
import { seederOnDb, prisma } from "./seed.js";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AuthConfig],
      validationSchema: Joi.object({
        ...AuthEnvSchema,
        // ... otras variables de entorno que puedas tener
      }),
    }),
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60m" },
    }),
    UsersModule,
    AuthModule,
    ArbolModule,
    FincaModule,
    CosechaModule,
    ShippingAddressModule,
    AdoptionModule,
    ProductorModule,
  ],
  controllers: [AppController, PaymentsController],
  providers: [AppService, PaymentsService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      try {
        return await seederOnDb();
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    } finally {
      await prisma.$disconnect();
    }
  }
}

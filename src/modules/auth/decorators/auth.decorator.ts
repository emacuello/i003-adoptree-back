import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleEnum } from "@prisma/client";
import { CheckRoles } from "./roles.decorator.js";

export function Auth(role: RoleEnum) {
  return applyDecorators(CheckRoles(role), UseGuards(AuthGuard));
}

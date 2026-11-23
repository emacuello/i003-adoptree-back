import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "@prisma/client";
import { COMMON_KEYS } from "../../../constants/index.js";

export const CheckRoles = (...role: RoleEnum[]) => {
  return SetMetadata(COMMON_KEYS.DECORATOR_ROLE_CHECK, role);
};

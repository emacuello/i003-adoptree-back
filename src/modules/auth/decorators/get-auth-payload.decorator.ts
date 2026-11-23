import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { getReqResFromCtx } from "../../../utils/index.js";
import { AuthPayloadDTO } from "../dto/auth-payload.dto.js";

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

type AuthUserKeys = DotNestedKeys<AuthPayloadDTO>;

export const GetAuthPayload = createParamDecorator(
  (
    authUserKey: AuthUserKeys,
    context: ExecutionContext,
  ): AuthPayloadDTO | null => {
    const { req } = getReqResFromCtx(context);

    const authUser: AuthPayloadDTO = req.user;

    return authUserKey
      ? authUserKey.split(".").reduce((value, key) => value?.[key], authUser)
      : authUser;
  },
);

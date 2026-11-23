import { ExecutionContext } from "@nestjs/common";

export function getReqResFromCtx(context: ExecutionContext) {
  const httpContext = context.switchToHttp();
  return {
    req: httpContext.getRequest(),
    res: httpContext.getResponse(),
  };
}

// En ESM, la metadata de decoradores referencia la clase al definirse: en un ciclo (forwardRef) da TDZ.
// Tipar con WrapperType<T> hace que se emita Object en vez de la clase.
export type WrapperType<T> = T;

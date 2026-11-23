// En modo ESM, Jest no define `jest` como global: se expone acá para que los specs lo usen igual que en CJS.
import { jest } from "@jest/globals";

(globalThis as unknown as { jest: typeof jest }).jest = jest;

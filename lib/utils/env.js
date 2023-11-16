"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    VITE_KEYCLOAK_URL: zod_1.z.string(),
    VITE_KEYCLOAK_REALM: zod_1.z.string(),
    VITE_KEYCLOAK_CLIENT_ID: zod_1.z.string(),
    VITE_KEYCLOAK_REDIRECT_URI: zod_1.z.string(),
});
exports.env = envSchema.parse(import.meta.env);

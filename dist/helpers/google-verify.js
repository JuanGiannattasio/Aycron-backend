"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleVerify = void 0;
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_ID || '522246527978-l9g2m51un5mfd5ci47qo1ddpq7nei4dp.apps.googleusercontent.com');
const googleVerify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID || '522246527978-l9g2m51un5mfd5ci47qo1ddpq7nei4dp.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    // @ts-ignore
    const { name, email, picture } = payload;
    return { name, email, picture };
});
exports.googleVerify = googleVerify;
//# sourceMappingURL=google-verify.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentBody = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentBody = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('___REQUEST BODY_________');
    console.log(request.user.bodies[0]);
    const body = request.user.bodies[0];
    return data ? body[data] : body;
});
//# sourceMappingURL=body.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('___REQUEST USER_________');
    console.log(request.user);
    const user = request.user;
    return data ? user[data] : user;
});
//# sourceMappingURL=user.decorator.js.map
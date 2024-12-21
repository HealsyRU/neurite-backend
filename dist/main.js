"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function start() {
    const PORT = process.env.PORT;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Neurite Life. API Documentation')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Neurite.Life')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());
    app.enableCors({
        origin: ['http://localhost:3000', 'http://192.168.31.94:3000', 'http://192.168.31.94:3001', '0.0.0.0', 'http://192.168.31.94/', 'https://healsy.vercel.app', 'https://healsy.onrender.com'],
        credentials: true,
        exposedHeaders: 'set-cookie'
    });
    await app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map
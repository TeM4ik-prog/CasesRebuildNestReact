"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    app.use(express.static((0, path_1.join)(__dirname, '../..', 'client', 'dist')));
    app.use((req, res, next) => {
        if (req.path.startsWith('/api')) {
            next();
        }
        else {
            res.sendFile((0, path_1.join)(__dirname, '../..', 'client', 'dist', 'index.html'));
        }
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.enableCors();
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`App is running at port: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
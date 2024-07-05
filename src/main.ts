import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppLogger } from "./core/logger/logger.service";
import bodyParser from "body-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { VersioningType } from "@nestjs/common";
import { AppModule } from "./core/module/app.module";


const logger = new AppLogger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger
  })
  const httpAdapterHost = app.get(HttpAdapterHost)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('exchange')
    .setDescription('The exchange API description')
    .setVersion('1.0.0.1')
    .addBearerAuth()
    .setExternalDoc('Download JSON Specifications', '/v1/api/swagger.json')
    .addServer('/v1')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: []
  })
  app.use('/v1/api/swagger.json', (req, res) => {
    res.send(document)
  })
  SwaggerModule.setup('swagger', app, document)

  app.enableVersioning({
    type: VersioningType.URI
  })

  await app.listen(process.env.APP_PORT, () => {
    logger.log(
      `****************** Project mode: ${process.env.NODE_ENV || 'local'} ******************`
    )
  })
}
bootstrap()
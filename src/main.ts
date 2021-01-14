import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/dto/Base';
import * as fs from "fs";
import { konsole } from './utils/js';

async function bootstrap() {
  console.log("Servicio de conexión con Amtech");
  try {
    let config: Config;

    const app = await NestFactory.create(AppModule);

    app.enableCors();
    let data = fs.readFileSync('./config.json', "utf8");
    config = JSON.parse(data);
    await app.listen(config.env.port);
  } catch (err) {
    konsole.error(err);
  }
}

bootstrap();

function closeAll(x) {
  konsole.trace(`interrupt ${x} `);
  setTimeout(() => {
    konsole.trace("Exiting ");
    process.exit(0);
  }, 2000);
}

process.on('SIGTERM', function (x) {
  closeAll(x)
});
process.on('SIGINT', function (x) {
  closeAll(x)
});
process.on('SIGQUIT', function (x) {
  closeAll(x)
});
process.on('SIGHUP', function (x) {
  closeAll(x)
});
process.on('SIGUSR2', function (x) {
  closeAll(x)
});
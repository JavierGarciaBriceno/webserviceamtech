import { Injectable } from '@nestjs/common';
import { Config, PlatformConfig, EnvConfig } from './dto/Base';
import { konsole } from '../utils/js';
import * as fs from "fs";

@Injectable()
export class ConfigService {
   private config: Config;
   private configFileRoute: string = "./config.json";

   constructor() {
      konsole.info("Reading config file");
      this.config = this.readConfigFile();
   }

   public readConfigFile() {
      let data = fs.readFileSync(this.configFileRoute, "utf8");
      return JSON.parse(data);
   }

   public getPlatformConfig(): PlatformConfig {
      if (!this.config) this.config = this.readConfigFile();
      return this.config.platform;
   }

   public getEnvConfig(): EnvConfig {
      if (!this.config) this.config = this.readConfigFile();
      return this.config.env;
   }
}
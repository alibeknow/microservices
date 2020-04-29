/**
 * File: config.service.ts
 * Project: nest-microservice-boilerplate
 * Version:1.0.0
 * Created Date: Saturday, February 1st 2020, 1:24:50 pm
 * Author: Georgian Stan (georgian.stan8@gmail.com)
 * -----
 * Last Modified: Saturday, 1st February 2020 1:51:56 pm
 * Modified By: Georgian Stan (georgian.stan8@gmail.com>)
 * ------------------------------------
 * Javascript will save your soul!
 */

/**
 * * Dependencies
 */
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  private envPath: any;
  private readonly nodeEnv: string = process.env.NODE_ENV
    ? process.env.NODE_ENV.trim()
    : undefined;

  private readonly envConfig: { [key: string]: string };
  constructor() {
    this.logger.log('SERVICE INIT');

    switch (this.nodeEnv) {
      case 'test':
        this.envPath = path.resolve(__dirname, '../../.env.test');
        break;
      case 'production':
        this.envPath = path.resolve(__dirname, '../../.env.production');
        break;
      case 'development':
        this.envPath = path.resolve(__dirname, '../../.env.development');
        break;
      default:
        this.envPath = path.resolve(__dirname, '../../.env.development');
    }
    this.envConfig = dotenv.parse(fs.readFileSync(this.envPath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

export const kafkaHost = new ConfigService().get('kafkaHost');

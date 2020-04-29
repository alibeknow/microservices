import { Injectable } from '@nestjs/common';
import * as umgC from 'umg-config';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class ConfService {
  channels = null;
  protocols = null;
  providers = null;
  configuration = null;
  parameters = null;
  routes = null;
  routeTypes = null;
  constructor(private readonly configService: ConfigService) {
    const config = {
      dbName: this.configService.get('dbName'),
      dbUser: this.configService.get('dbUser'),
      dbPass: this.configService.get('dbPass'),
      dbHost: this.configService.get('dbHost'),
      dbDialect: this.configService.get('dbDialect'),
      createTable: false,
    };
    const {
      ChannelsService,
      ParameterService,
      ConfigurationService,
      ProtocolsService,
      ProvidersService,
      RouteTypeService,
      RoutesService,
    } = umgC(config);
    this.channels = ChannelsService;
    this.protocols = ProtocolsService;
    this.providers = ProvidersService;
    this.configuration = ConfigurationService;
    this.parameters = ParameterService;
    this.routes = RoutesService;
    this.routeTypes = RouteTypeService;
  }
  getObjects() {
    return this;
  }
}

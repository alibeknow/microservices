/**
 * File: create-user.dto.ts
 * Project: nest-microservice-boilerplate
 * Version:1.0.0
 * Created Date: Saturday, February 1st 2020, 1:24:51 pm
 * Author: Georgian Stan (georgian.stan8@gmail.com)
 * -----
 * Last Modified: Saturday, 1st February 2020 1:50:41 pm
 * Modified By: Georgian Stan (georgian.stan8@gmail.com>)
 * ------------------------------------
 * Javascript will save your soul!
 */

import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateMessageDto {
  routeType?: string;
  uid?: string;
  module?: string;
  method?: string;
  // @IsString()
  // @MaxLength(30)
  // channel?: string;
  @IsString()
  @MaxLength(255)
  text: string;
  @IsString()
  @MinLength(10)
  @MaxLength(12)
  msisdn?: string;
  // @IsString()
  // @IsEmail()
  // email?: string;
  // @IsString()
  // systemId?: string;
  constructor(text, msisdn, routeType = '00') {
    (this.text = text), (this.msisdn = msisdn), (this.routeType = routeType);
  }
}

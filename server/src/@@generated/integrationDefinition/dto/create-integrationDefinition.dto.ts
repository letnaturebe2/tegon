
import {Prisma,IntegrationName} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateIntegrationDefinitionDto {
  deleted?: Date;
@ApiProperty({ enum: IntegrationName})
name: IntegrationName;
icon: string;
spec: Prisma.InputJsonValue;
clientId: string;
clientSecret: string;
scopes: string;
}

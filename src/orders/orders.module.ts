import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NATS_SERVICE, ORDER_SERVICE, envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
   NatsModule
  ],
})
export class OrdersModule {}

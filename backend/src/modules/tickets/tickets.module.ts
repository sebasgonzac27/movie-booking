import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { FunctionsModule } from '../functions/functions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), FunctionsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}

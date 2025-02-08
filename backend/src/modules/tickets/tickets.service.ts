import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionsService } from '../functions/functions.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly functionService: FunctionsService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const { quantity, functionId } = createTicketDto;
    const foundedFunction = await this.functionService.findOne(functionId);
    if (!foundedFunction) {
      throw new NotFoundException(`function with id ${functionId} not found`);
    }

    if (quantity > foundedFunction.availableTickets) {
      throw new ConflictException(
        `only ${foundedFunction.availableTickets} tickets available`,
      );
    }

    const totalPrice = foundedFunction.price * quantity;
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      totalPrice,
    });

    const savedTicket = await this.ticketRepository.save(ticket);

    foundedFunction.availableTickets -= quantity;
    await this.functionService.update(foundedFunction.id, foundedFunction);

    return savedTicket;
  }

  async findAll() {
    return await this.ticketRepository.find();
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`ticket with id ${id} not found`);
    }
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const result = await this.ticketRepository.update(id, updateTicketDto);
    if (!result.affected) {
      throw new NotFoundException(`ticket with id ${id} not found`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.ticketRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`ticket with id ${id} not found`);
    }
    return result;
  }
}

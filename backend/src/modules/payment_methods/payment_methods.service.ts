import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './entities/payment_method.entity';
@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.paymentMethodRepository.save(createPaymentMethodDto);
  }

  async findAll() {
    return await this.paymentMethodRepository.find();
  }

  async findOne(id: number) {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { id },
    });
    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with id ${id} not found.`);
    }
    return paymentMethod;
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const result = await this.paymentMethodRepository.update(
      id,
      updatePaymentMethodDto,
    );
    if (!result.affected) {
      throw new NotFoundException(`Payment method with id ${id} not found.`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.paymentMethodRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`Payment method with id ${id} not found.`);
    }
    return result;
  }
}

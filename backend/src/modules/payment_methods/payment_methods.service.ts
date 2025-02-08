import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment_method.entity';
import { Repository } from 'typeorm';
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
      throw new NotFoundException(`payment method with id ${id} not found`);
    }
    return paymentMethod;
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const result = await this.paymentMethodRepository.update(
      id,
      updatePaymentMethodDto,
    );
    if (!result.affected) {
      throw new NotFoundException(`payment method with id ${id} not found`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.paymentMethodRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`payment method with id ${id} not found`);
    }
    return result;
  }
}

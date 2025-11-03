import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Auth } from 'src/auth/decorator/auth.decorator';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  getAll() {
    return this.orderService.getAll();
  }

  @Get('by-user')
  @Auth()
  getByUserId(@CurrentUser('id') userId: string) {
    return this.orderService.getByUserId(userId);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  placeOrder(@Body() dto: OrderDTO, @CurrentUser('id') userId: string) {
    return this.orderService.placeOrder(dto, userId);
  }
}

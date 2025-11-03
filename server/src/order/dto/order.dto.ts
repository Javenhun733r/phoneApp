import { IsArray, IsNumber, IsString } from 'class-validator';

export class OrderItemDTO {
  @IsNumber()
  price: number;
  @IsString()
  productId: string;
  @IsNumber()
  quantity: number;
}
export class OrderDTO {
  @IsArray()
  items: OrderItemDTO[];
}

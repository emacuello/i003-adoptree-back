import { Module } from "@nestjs/common";
import { ShippingAddressController } from "./shipping-address.controller.js";
import { ShippingAddressService } from "./shipping-address.service.js";
import { ShippingAddressRepository } from "./shipping-address.repository.js";

@Module({
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService, ShippingAddressRepository],
  exports: [ShippingAddressService],
})
export class ShippingAddressModule {}

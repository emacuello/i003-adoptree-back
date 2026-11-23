import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { PaymentsService } from "./payments.service.js";
import { CreatePreferenceDto } from "./dto/create-preference.dto.js";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post("create-order")
  async createPayment(
    @Req() req: Request,
    @Body() createPreferenceDto: CreatePreferenceDto,
  ) {
    return this.paymentsService.createPayment(req, createPreferenceDto);
  }

  @Get("success")
  async successPayment() {
    return "success";
  }
  @Get("failure")
  async failurePayment() {}
  @Get("pending")
  async pendingPayment() {}

  @Post("webhook")
  async receiveWebhook(@Req() req: Request) {
    return this.paymentsService.receiveWebhook(req);
  }
}

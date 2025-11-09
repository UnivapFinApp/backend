import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from './domain/transaction.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Request() request,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const req = request.user;
    const userId = req.id;
    return this.transactionsService.createTransaction(
      userId,
      createTransactionDto,
    );
  }

  // @Get()
  // findAll(@Request() request) {
  //   return this.transactionsService.transactions({
  //     isActive: true,
  //     userId: request.user.id,
  //   });
  // }

  @Get('amount')
  getBalance(@Request() request) {
    return this.transactionsService.getBalance({
      isActive: true,
      userId: request.user.id,
    });
  }

  @Get()
  paginate(
    @Request() request,
    @Query('cursor') cursorId?: string,
    @Query('take') take?: string,
  ) {
    const takeValue =
      take && !isNaN(parseInt(take, 10)) ? parseInt(take, 10) : undefined;

    return this.transactionsService.transactions(
      {
        isActive: true,
        userId: request.user.id,
      },
      cursorId,
      takeValue,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request) {
    return this.transactionsService.transaction({
      id,
      userId: request.user.id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() request,
  ) {
    return this.transactionsService.updateTransaction(
      { id, userId: request.user.id },
      updateTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    return this.transactionsService.removeTransaction({
      id,
      userId: request.user.id,
    });
  }
}

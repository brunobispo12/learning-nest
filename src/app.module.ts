import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books/books.controller';
import { BooksService } from './services/books/books.service';
import { MongooseModule } from '@nestjs/mongoose'
import { BookRepository } from './mongo/repository/book.repository';
import { BookSchema } from './mongo/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/biblioteca'),
    MongooseModule.forFeature([
      { name: 'book', schema: BookSchema }
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule { }

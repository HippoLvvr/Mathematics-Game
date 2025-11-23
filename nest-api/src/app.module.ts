import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/books/book.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { ClientModule } from './modules/clients/client.module';
import { SaleModule } from './modules/sales/sale.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'react-app', 'dist'),
      exclude: ['/api*'],
    }),

    DatabaseModule,
    AuthorModule,
    BookModule,
    ClientModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

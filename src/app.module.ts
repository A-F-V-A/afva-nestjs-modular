import { Module } from '@nestjs/common'
import { HttpModule, HttpService  } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HttpModule,ProductsModule, DatabaseModule],
  controllers: [],
  providers: [
  {
    provide: 'TASKS',
    useFactory: async (http:HttpService) => {
      const request = http.get('https://jsonplaceholder.typicode.com/todos')
      const tasks = await lastValueFrom(request)
      return tasks.data
    },
    inject: [HttpService]
  }],
})
export class AppModule {}

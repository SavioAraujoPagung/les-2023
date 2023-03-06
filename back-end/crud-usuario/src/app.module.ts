import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/model/user.entity';
import { UserModule } from './users/modules/user.module';


@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'les2023',
      database: 'les2023',
      entities: [User],
      synchronize: true,
    }),  
  ],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService, UserRepository],
})
export class AppModule {}

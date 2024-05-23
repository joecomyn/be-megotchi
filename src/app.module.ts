import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://comynjoe1:lWjIZA6lP2LSk7uh@megotchi.blcchpm.mongodb.net/megotchi_0')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

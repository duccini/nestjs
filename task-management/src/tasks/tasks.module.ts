import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}

/**
 * No curso não há exportação
 * Nest can't resolve dependencies of the TasksService (?). Please make sure that the
 * argument TasksRepository at index [0] is available in the TasksModule context.
 */

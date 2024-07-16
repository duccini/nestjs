import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.local.service';
import { Task, TaskStatus } from './task.local.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  // The modifier `private`allow us to create a property `tasksService`
  constructor(private tasksService: TasksService) {}

  // Get All Tasks
  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
    // if we have any filters defined, call getTasksWithFilters
    if (Object.keys(filterDTO).length) {
      // otherwise, just get all tasks
      return this.tasksService.getTasksWithFilters(filterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  // Create a Task
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    // console.log(createTaskDTO);
    return this.tasksService.createTask(createTaskDTO);
  }

  // Get a Task By Id
  @Get('/:id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // Delete a Task By Id
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id); // return void
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Task {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }
}

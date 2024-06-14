import { IsString, Length } from "class-validator";

export class AddTaskDto {
  @IsString()
  @Length(5, 50)
  task_name!: string;
}

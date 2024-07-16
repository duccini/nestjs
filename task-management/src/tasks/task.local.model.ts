// separado por ' ; '
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// separado por ' , '
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

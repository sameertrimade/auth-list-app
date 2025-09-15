import { Department } from './department.model';

export interface DepartmentState {
  departments: Department[];
  isLoading: boolean;
  error: string | null;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
}

export type Department = 
  | 'Engineering'
  | 'Design'
  | 'Marketing'
  | 'Sales'
  | 'HR'
  | 'Finance'
  | 'Operations';

export const departments: Department[] = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

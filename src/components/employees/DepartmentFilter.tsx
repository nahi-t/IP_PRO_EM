import { motion } from 'framer-motion';
import { departments, Department } from '@/types/employee';
import { Button } from '@/components/ui/button';

interface DepartmentFilterProps {
  selectedDepartment: string | null;
  onSelectDepartment: (department: string | null) => void;
}

const DepartmentFilter = ({
  selectedDepartment,
  onSelectDepartment,
}: DepartmentFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedDepartment === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectDepartment(null)}
        className={
          selectedDepartment === null
            ? 'gradient-primary text-primary-foreground'
            : ''
        }
      >
        All
      </Button>
      {departments.map((dept) => (
        <Button
          key={dept}
          variant={selectedDepartment === dept ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectDepartment(dept)}
          className={
            selectedDepartment === dept
              ? 'gradient-primary text-primary-foreground'
              : ''
          }
        >
          {dept}
        </Button>
      ))}
    </div>
  );
};

export default DepartmentFilter;

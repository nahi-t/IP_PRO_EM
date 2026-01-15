import { departments } from '@/data/mockEmployees';
import { Button } from '@/components/ui/button';

const DepartmentFilter = ({ selectedDepartment, onSelectDepartment }) => {
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

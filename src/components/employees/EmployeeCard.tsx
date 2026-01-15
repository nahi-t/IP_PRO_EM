import { motion } from 'framer-motion';
import { Mail, Phone, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Employee } from '@/types/employee';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EmployeeCardProps {
  employee: Employee;
  index: number;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const getStatusStyles = (status: Employee['status']) => {
  switch (status) {
    case 'active':
      return 'bg-success/10 text-success border-success/20';
    case 'inactive':
      return 'bg-muted text-muted-foreground border-muted';
    case 'on-leave':
      return 'bg-warning/10 text-warning border-warning/20';
    default:
      return '';
  }
};

const getDepartmentColor = (department: string) => {
  const colors: Record<string, string> = {
    Engineering: 'bg-primary/10 text-primary',
    Design: 'bg-accent/10 text-accent',
    Marketing: 'bg-warning/10 text-warning',
    Sales: 'bg-success/10 text-success',
    HR: 'bg-destructive/10 text-destructive',
    Finance: 'bg-primary/10 text-primary',
    Operations: 'bg-muted text-muted-foreground',
  };
  return colors[department] || 'bg-muted text-muted-foreground';
};

const EmployeeCard = ({ employee, index, onView, onEdit, onDelete }: EmployeeCardProps) => {
  const initials = `${employee.firstName[0]}${employee.lastName[0]}`;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="p-5 glass-card hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{employee.position}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(employee)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(employee)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(employee.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className={getDepartmentColor(employee.department)}>
            {employee.department}
          </Badge>
          <Badge variant="outline" className={getStatusStyles(employee.status)}>
            {employee.status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{employee.phone}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EmployeeCard;

import { Mail, Phone, Building, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

const getStatusStyles = (status) => {
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

const EmployeeDetails = ({ employee, isOpen, onClose, onEdit }) => {
  if (!employee) return null;

  const initials = `${employee.firstName[0]}${employee.lastName[0]}`;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] glass-card p-0 overflow-hidden">
        <div className="gradient-primary p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary-foreground/20">
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-primary-foreground/80">{employee.position}</p>
              <Badge variant="outline" className="mt-2 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                {employee.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground truncate max-w-[120px]">
                  {employee.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{employee.phone}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Building className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium text-foreground">{employee.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Briefcase className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Position</p>
                <p className="text-sm font-medium text-foreground">{employee.position}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Salary</p>
                <p className="text-sm font-medium text-foreground">
                  {formatCurrency(employee.salary)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Calendar className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="text-sm font-medium text-foreground">
                  {formatDate(employee.startDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                onClose();
                onEdit(employee);
              }}
              className="gradient-primary text-primary-foreground"
            >
              Edit Employee
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetails;

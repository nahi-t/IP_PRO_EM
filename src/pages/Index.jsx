import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Clock, Plus } from 'lucide-react';
import { mockEmployees } from '@/data/mockEmployees';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import EmployeeCard from '@/components/employees/EmployeeCard';
import EmployeeModal from '@/components/employees/EmployeeModal';
import EmployeeDetails from '@/components/employees/EmployeeDetails';
import DepartmentFilter from '@/components/employees/DepartmentFilter';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === 'active').length;
    const inactive = employees.filter((e) => e.status === 'inactive').length;
    const onLeave = employees.filter((e) => e.status === 'on-leave').length;
    return { total, active, inactive, onLeave };
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        searchQuery === '' ||
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === null || employee.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchQuery, selectedDepartment]);

  const handleAddEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    setEmployees((prev) => [...prev, newEmployee]);
    toast.success('Employee added successfully!');
  };

  const handleEditEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    toast.success('Employee updated successfully!');
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    toast.success('Employee deleted successfully!');
  };

  const handleSave = (employee) => {
    if ('id' in employee) {
      handleEditEmployee(employee);
    } else {
      handleAddEmployee(employee);
    }
    setEditingEmployee(null);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const openViewDetails = (employee) => {
    setViewingEmployee(employee);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={stats.total}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            delay={0}
          />
          <StatCard
            title="Active"
            value={stats.active}
            icon={UserCheck}
            delay={0.1}
          />
          <StatCard
            title="On Leave"
            value={stats.onLeave}
            icon={Clock}
            delay={0.2}
          />
          <StatCard
            title="Inactive"
            value={stats.inactive}
            icon={UserX}
            delay={0.3}
          />
        </div>

        {/* Filters & Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
        >
          <DepartmentFilter
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
          <Button
            onClick={() => {
              setEditingEmployee(null);
              setIsModalOpen(true);
            }}
            className="gradient-primary text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </motion.div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              index={index}
              onView={openViewDetails}
              onEdit={openEditModal}
              onDelete={handleDeleteEmployee}
            />
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Users className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No employees found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
        }}
        onSave={handleSave}
        employee={editingEmployee}
      />

      <EmployeeDetails
        employee={viewingEmployee}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setViewingEmployee(null);
        }}
        onEdit={openEditModal}
      />
    </div>
  );
};

export default Index;

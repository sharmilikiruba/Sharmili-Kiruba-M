'use client';

import React, { useState, useMemo } from 'react';
import { Student, StudentFormData } from './types';
import { StudentDirectoryView } from './StudentDirectoryView';
import { AddStudentModal } from './AddStudentModal';
import { EditStudentModal } from './EditStudentModal';
import { ViewStudentModal } from './ViewStudentModal';
import apiClient from '@/lib/api-client';

const departments = ['physics', 'chemistry', 'history', 'tamil', 'english', 'economics', 'maths', 'commerce', 'statistics', 'others'];
const years = ['1 year', '2 year', '3 year'];

const HostelStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All Departments');
  const [yearFilter, setYearFilter] = useState<string>('All Years');

  // Debounce search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Form & Photo states
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',
    department: '',
    course: '',
    currentYear: '',
    semester: '',
    room_no: '',
    parentName: '',
    parent_phone: '',
    parentRelation: '',
    address: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    emergencyContact: '',
    guardianName: '',
    guardian_contact: ''
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null);

  React.useEffect(() => {
    fetchStudents(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchStudents = async (search: string = '') => {
    try {
      const response = await apiClient.get('/warden/students', {
        params: { search }
      });
      if (response.data.success) {
        const formattedStudents = response.data.data.map((s: any) => ({
          id: s.student_id || s.id,
          fullName: s.fullName || s.name || 'Unknown',
          rollNumber: s.rollNumber || s.roll_no || 'N/A',
          email: s.user?.email || s.email || '',
          phone: s.user?.phone || s.phone || 'N/A',
          room_no: s.room?.room_no || (typeof s.room_no === 'object' ? s.room_no?.room_no : (s.room_no || 'N/A')),
          department: s.department || 'N/A',
          year: s.current_year?.toString() || s.year || 'N/A',
          semester: s.semester?.toString() || 'N/A',
          gender: s.gender,
          dob: s.dob,
          address: s.address,
          parentName: s.parent_name || s.parentName,
          parent_phone: s.parent_phone || s.parentMobile,
          guardianName: s.guardian_name || s.guardianName,
          guardian_contact: s.guardian_contact || s.guardian_phone || s.guardianMobile,
          dateOfJoining: s.user?.created_at || 'N/A',
        }));
        setStudents(formattedStudents);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const name = student.fullName?.toLowerCase() || '';
      const roll = student.rollNumber?.toLowerCase() || '';
      const room = student.room_no?.toLowerCase() || '';
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        name.includes(search) ||
        roll.includes(search) ||
        room.includes(search);

      const matchesDepartment = departmentFilter === 'All Departments' || student.department === departmentFilter;
      const matchesYear = yearFilter === 'All Years' || student.year === yearFilter;

      return matchesSearch && matchesDepartment && matchesYear;
    });
  }, [students, searchTerm, departmentFilter, yearFilter]);

  // Export to PDF function
  const exportToPDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Krishna Hostel - Student Directory', 14, 20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
      doc.setFontSize(12);
      doc.text(`Total Students: ${filteredStudents.length}`, 14, 36);

      const tableData = filteredStudents.map(student => [
        student.fullName || '',
        student.rollNumber || '',
        student.department || '',
        student.year || '',
        student.room_no || '',
        student.phone || '',
        student.email || ''
      ]);

      autoTable(doc, {
        startY: 42,
        head: [['Name', 'Roll No', 'Department', 'Year', 'Room', 'Phone', 'Email']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: { fontSize: 9 },
        margin: { top: 42 }
      });

      doc.save(`Hostel_Students_${new Date().toISOString().split('T')[0]}.pdf`);
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF.');
    }
  };

  const resetForm = (): void => {
    setFormData({
      fullName: '', rollNumber: '', email: '', phone: '', department: '', course: '', currentYear: '', semester: '', room_no: '',
      parentName: '', parent_phone: '', parentRelation: '', address: '', gender: '', dob: '', bloodGroup: '', emergencyContact: '',
      guardianName: '', guardian_contact: ''
    });
    setIsEditing(false);
    setCurrentStudentId(null);
  };

  const handleAddSubmit = async () => {
    if (!formData.fullName || !formData.rollNumber || !formData.phone || !formData.room_no) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        fullName: formData.fullName,
        rollNumber: formData.rollNumber,
        email: formData.email,
        phone: formData.phone,
        room_no: formData.room_no,
        department: formData.department,
        course: formData.course,
        current_year: formData.currentYear ? parseInt(formData.currentYear) : 1,
        semester: formData.semester ? parseInt(formData.semester) : 1,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
        parent_name: formData.parentName,
        parent_phone: formData.parent_phone,
        guardian_name: formData.guardianName,
        guardian_contact: formData.guardian_contact
      };

      const response = await apiClient.post('/warden/students', payload);

      if (response.data.success) {
        fetchStudents();
        setShowAddModal(false);
        resetForm();
        alert('Student added successfully!');
      }
    } catch (error: any) {
      console.error('Error adding student:', error);
      alert(error.response?.data?.message || 'Failed to add student');
    }
  };

  const handleEditSubmit = async () => {
    if (!currentStudentId) return;

    try {
      const payload = {
        fullName: formData.fullName,
        rollNumber: formData.rollNumber,
        email: formData.email,
        phone: formData.phone,
        room_no: formData.room_no,
        department: formData.department,
        course: formData.course,
        current_year: formData.currentYear ? parseInt(formData.currentYear) : 1,
        semester: formData.semester ? parseInt(formData.semester) : 1,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
        parent_name: formData.parentName,
        parent_phone: formData.parent_phone,
        guardian_name: formData.guardianName,
        guardian_contact: formData.guardian_contact,
      };

      const response = await apiClient.put(`/warden/students/${currentStudentId}`, payload);

      if (response.data.success) {
        fetchStudents();
        setShowEditModal(false);
        resetForm();
        alert('Student info updated successfully!');
      }
    } catch (error: any) {
      console.error('Error updating student:', error);
      alert(error.response?.data?.message || 'Failed to update student');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Permanently delete this student record?')) {
      try {
        const response = await apiClient.delete(`/warden/students/${id}`);
        if (response.data.success) {
          fetchStudents();
          alert('Student record deleted successfully!');
        }
      } catch (error: any) {
        console.error('Error deleting student:', error);
        alert(error.response?.data?.message || 'Failed to delete student');
      }
    }
  };

  const handleOpenEdit = (student: Student): void => {
    setCurrentStudentId(student.id);
    setFormData({
      fullName: student.fullName,
      rollNumber: student.rollNumber,
      email: student.email,
      phone: student.phone,
      department: student.department,
      course: '',
      currentYear: student.year,
      semester: student.semester,
      room_no: student.room_no || '',
      parentName: student.parentName || '',
      parent_phone: student.parent_phone || '',
      parentRelation: '',
      address: student.address || '',
      gender: student.gender || '',
      dob: student.dob || '',
      bloodGroup: '',
      emergencyContact: '',
      guardianName: student.guardianName || '',
      guardian_contact: student.guardian_contact || ''
    });
    setShowEditModal(true);
  };

  const handleView = (student: Student): void => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setYearFilter('All Years');
    setDepartmentFilter('All Departments');
  };

  return (
    <>
      <StudentDirectoryView
        studentsCount={students.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        yearFilter={yearFilter}
        onYearFilterChange={setYearFilter}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={setDepartmentFilter}
        years={years}
        departments={departments}
        onResetFilters={handleResetFilters}
        onExportPDF={exportToPDF}
        onAddClick={() => { resetForm(); setShowAddModal(true); }}
        filteredStudents={filteredStudents}
        onViewClick={handleView}
        onEditClick={handleOpenEdit}
        onDeleteClick={handleDelete}
      />

      <AddStudentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <EditStudentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      {selectedStudent && (
        <ViewStudentModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          student={selectedStudent}
        />
      )}
    </>
  );
};

export default HostelStudents;
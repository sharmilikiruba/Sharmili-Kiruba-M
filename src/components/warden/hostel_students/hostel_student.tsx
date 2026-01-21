'use client';

import React, { useState, useMemo } from 'react';
import { Student, StudentFormData, StudentPhotos } from './types';
import { StudentDirectoryView } from './StudentDirectoryView';
import { AddStudentModal } from './AddStudentModal';
import { EditStudentModal } from './EditStudentModal';
import { ViewStudentModal } from './ViewStudentModal';

const departments: string[] = ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics'];
const years: string[] = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const semesters: string[] = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];

const HostelStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Rahul Sharma',
      rollNumber: '21CS101',
      email: 'rahul.sharma@university.edu',
      mobile: '+91 98765 43210',
      roomNumber: 'A-204',
      department: 'Computer Science',
      year: '3rd Year',
      semester: '5th Semester',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      parentName: 'Mr. Sharma',
      parentMobile: '+91 98765 43211',
      guardianName: 'Mr. Sharma',
      guardianMobile: '+91 98765 43211',
      fatherPhoto: null,
      motherPhoto: null,
      guardianPhoto: null
    },
    {
      id: 2,
      name: 'Amit Kumar',
      rollNumber: '22ME103',
      email: 'amit.kumar@university.edu',
      mobile: '+91 98765 43212',
      roomNumber: 'C-310',
      department: 'Mechanical',
      year: '2nd Year',
      semester: '3rd Semester',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      parentName: 'Mrs. Kumar',
      parentMobile: '+91 98765 43213',
      guardianName: 'Mrs. Kumar',
      guardianMobile: '+91 98765 43213',
      fatherPhoto: null,
      motherPhoto: null,
      guardianPhoto: null
    }
  ]);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All Departments');
  const [yearFilter, setYearFilter] = useState<string>('All Years');

  // Form & Photo states
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    rollNumber: '',
    email: '',
    mobile: '',
    department: '',
    year: '',
    semester: '',
    roomNumber: '',
    parentName: '',
    parentMobile: '',
    parentRelation: '',
    address: '',
    bloodGroup: '',
    emergencyContact: '',
    guardianName: '',
    guardianMobile: ''
  });

  const [photos, setPhotos] = useState<StudentPhotos>({
    student: null,
    father: null,
    mother: null,
    guardian: null
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null);

  // Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());

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
        student.name,
        student.rollNumber,
        student.department,
        student.year,
        student.roomNumber,
        student.mobile,
        student.email
      ]);

      autoTable(doc, {
        startY: 42,
        head: [['Name', 'Roll No', 'Department', 'Year', 'Room', 'Mobile', 'Email']],
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

      doc.save(`Krishna_Hostel_Students_${new Date().toISOString().split('T')[0]}.pdf`);
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF.');
    }
  };

  const handlePhotoUpload = (type: keyof StudentPhotos, e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (type: keyof StudentPhotos): void => {
    setPhotos(prev => ({ ...prev, [type]: null }));
  };

  const resetForm = (): void => {
    setFormData({
      fullName: '', rollNumber: '', email: '', mobile: '', department: '', year: '', semester: '', roomNumber: '',
      parentName: '', parentMobile: '', parentRelation: '', address: '', bloodGroup: '', emergencyContact: '',
      guardianName: '', guardianMobile: ''
    });
    setPhotos({ student: null, father: null, mother: null, guardian: null });
    setIsEditing(false);
    setCurrentStudentId(null);
  };

  const handleAddSubmit = (): void => {
    if (!formData.fullName || !formData.rollNumber || !formData.mobile || !formData.roomNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name: formData.fullName,
      rollNumber: formData.rollNumber,
      email: formData.email,
      mobile: formData.mobile,
      roomNumber: formData.roomNumber,
      department: formData.department,
      year: formData.year,
      semester: formData.semester,
      photo: photos.student,
      parentName: formData.parentName,
      parentMobile: formData.parentMobile,
      guardianName: formData.guardianName,
      guardianMobile: formData.guardianMobile,
      fatherPhoto: photos.father,
      motherPhoto: photos.mother,
      guardianPhoto: photos.guardian
    };

    setStudents(prev => [...prev, newStudent]);
    setShowAddModal(false);
    resetForm();
    alert('Student added successfully!');
  };

  const handleEditSubmit = (): void => {
    if (!currentStudentId) return;

    setStudents(prev => prev.map(student => {
      if (student.id === currentStudentId) {
        return {
          ...student,
          name: formData.fullName,
          rollNumber: formData.rollNumber,
          email: formData.email,
          mobile: formData.mobile,
          roomNumber: formData.roomNumber,
          department: formData.department,
          year: formData.year,
          semester: formData.semester,
          photo: photos.student || student.photo,
          parentName: formData.parentName,
          parentMobile: formData.parentMobile,
          guardianName: formData.guardianName,
          guardianMobile: formData.guardianMobile,
          fatherPhoto: photos.father || student.fatherPhoto,
          motherPhoto: photos.mother || student.motherPhoto,
          guardianPhoto: photos.guardian || student.guardianPhoto
        };
      }
      return student;
    }));

    setShowEditModal(false);
    resetForm();
    alert('Student info updated!');
  };

  const handleDelete = (id: number): void => {
    if (confirm('Permanently delete this student record?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleOpenEdit = (student: Student): void => {
    setCurrentStudentId(student.id);
    setFormData({
      fullName: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      mobile: student.mobile,
      department: student.department,
      year: student.year,
      semester: student.semester,
      roomNumber: student.roomNumber,
      parentName: student.parentName || '',
      parentMobile: student.parentMobile || '',
      parentRelation: '',
      address: '',
      bloodGroup: '',
      emergencyContact: '',
      guardianName: student.guardianName || '',
      guardianMobile: student.guardianMobile || ''
    });
    setPhotos({
      student: student.photo,
      father: student.fatherPhoto || null,
      mother: student.motherPhoto || null,
      guardian: student.guardianPhoto || null
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
        photos={photos}
        onPhotoUpload={handlePhotoUpload}
        onRemovePhoto={handleRemovePhoto}
        departments={departments}
        years={years}
        semesters={semesters}
      />

      <EditStudentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        formData={formData}
        setFormData={setFormData}
        photos={photos}
        onPhotoUpload={handlePhotoUpload}
        onRemovePhoto={handleRemovePhoto}
        departments={departments}
        years={years}
        semesters={semesters}
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
import React from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { StudentFormData, StudentPhotos } from './types';

interface StudentFormProps {
    formData: StudentFormData;
    setFormData: (data: StudentFormData) => void;
    photos: StudentPhotos;
    onPhotoUpload: (type: keyof StudentPhotos, e: React.ChangeEvent<HTMLInputElement>) => void;

    // departments, years, semesters props are no longer needed for select options
}

export const StudentForm: React.FC<StudentFormProps> = ({
    formData,
    setFormData,
    photos,
    onPhotoUpload,

}) => {
    const handleInputChange = (field: keyof StudentFormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const PhotoUploadBox: React.FC<{ type: keyof StudentPhotos; label: string; photo: string | null }> = ({ type, label, photo }) => (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            {photo ? (
                <div className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                        src={photo}
                        alt={label}
                        className="w-full h-32 object-cover transition-all group-hover:scale-105"
                    />


                </div>
            ) : (
                <label className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-600 cursor-pointer bg-gray-50/50">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100">
                        <Upload size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">Upload Photo</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onPhotoUpload(type, e)}
                        className="hidden"
                    />
                </label>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Photo Uploads */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <h4 className="text-lg font-bold text-gray-900">Identification Photos</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <PhotoUploadBox type="student" label="Student Photo *" photo={photos.student} />
                </div>
            </section>

            {/* Personal Information */}
            <section className="bg-gray-50/50 p-4 sm:p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                    <h4 className="text-lg font-bold text-gray-900 tracking-tight">Personal Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Roll Number <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={formData.rollNumber}
                            onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                            placeholder="e.g. 21CS101"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="student@university.edu"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            required
                            value={formData.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>


                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Gender <span className="text-red-500">*</span></label>
                        <select
                            required
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            required
                            value={formData.dob}
                            onChange={(e) => handleInputChange('dob', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700">Permanent Address <span className="text-red-500">*</span></label>
                        <textarea
                            required
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Full address here..."
                            rows={2}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium resize-none"
                        />
                    </div>
                </div>
            </section>

            {/* Academic Information */}
            <section className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                    <h4 className="text-lg font-bold text-gray-900 tracking-tight">Academic & Residence Info</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Course <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={formData.course}
                            onChange={(e) => handleInputChange('course', e.target.value)}
                            placeholder="e.g. B.Tech"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Department <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            placeholder="e.g. Computer Science"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Current Year <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            required
                            value={formData.currentYear}
                            onChange={(e) => handleInputChange('currentYear', e.target.value)}
                            placeholder="e.g. 1"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Semester <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            required
                            value={formData.semester}
                            onChange={(e) => handleInputChange('semester', e.target.value)}
                            placeholder="e.g. 1"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Room Number <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={formData.room_no}
                            onChange={(e) => handleInputChange('room_no', e.target.value)}
                            placeholder="e.g. A-101"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>
                </div>
            </section>

            {/* Parental/Guardian Information */}
            <section className="bg-gray-50/50 p-4 sm:p-6 rounded-2xl border border-gray-100 mb-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-1.5 h-6 bg-amber-600 rounded-full"></div>
                    <h4 className="text-lg font-bold text-gray-900 tracking-tight">Guardian Contact Info</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Parent's Name</label>
                        <input
                            type="text"
                            value={formData.parentName}
                            onChange={(e) => handleInputChange('parentName', e.target.value)}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Parent's Mobile</label>
                        <input
                            type="tel"
                            value={formData.parent_phone}
                            onChange={(e) => handleInputChange('parent_phone', e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Guardian's Name</label>
                        <input
                            type="text"
                            value={formData.guardianName}
                            onChange={(e) => handleInputChange('guardianName', e.target.value)}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Guardian's Mobile</label>
                        <input
                            type="tel"
                            value={formData.guardian_phone}
                            onChange={(e) => handleInputChange('guardian_phone', e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

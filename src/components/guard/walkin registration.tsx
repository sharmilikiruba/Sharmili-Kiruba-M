// 'use client'

// import { Camera, Users, LogOut, UserPlus, X } from 'lucide-react'
// import { useState } from 'react'

// export default function WalkInRegistration() {
//   const [activeNav, setActiveNav] = useState('Walk-in Registration')
//   const [showPhoto, setShowPhoto] = useState(true)
//   const [formData, setFormData] = useState({
//     visitorName: '',
//     mobileNumber: '',
//     relation: '',
//     student: '',
//     idProofType: '',
//     idProofNumber: '',
//     purposeOfVisit: '',
//     remarks: '',
//   })


//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log('Form submitted:', formData)
//     // Handle form submission
//   }

//   const handleCancel = () => {
//     setFormData({
//       visitorName: '',
//       mobileNumber: '',
//       relation: '',
//       student: '',
//       idProofType: '',
//       idProofNumber: '',
//       purposeOfVisit: '',
//       remarks: '',
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//               {/* Header */}
//               <div className="flex items-center gap-2 mb-8">
//                 <Users className="h-6 w-6 text-gray-700" />
//                 <h1 className="text-2xl font-bold text-gray-900">Visitor Information</h1>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 {/* Photo Upload Section */}
//                 {showPhoto && (
//                   <div className="mb-8 flex justify-center">
//                     <button
//                       type="button"
//                       className="flex flex-col items-center justify-center w-48 h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 transition-colors"
//                     >
//                       <Camera className="h-12 w-12 text-gray-400 mb-2" />
//                       <span className="text-sm text-gray-600">Take Photo</span>
//                     </button>
//                   </div>
//                 )}

//                 {/* Form Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Visitor Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Visitor Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="visitorName"
//                       value={formData.visitorName}
//                       onChange={handleInputChange}
//                       placeholder="Enter visitor name"
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       required
//                     />
//                   </div>

//                   {/* Mobile Number */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Mobile Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       name="mobileNumber"
//                       value={formData.mobileNumber}
//                       onChange={handleInputChange}
//                       placeholder="+91 98765 43210"
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       required
//                     />
//                   </div>

//                   {/* Relation */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="relation"
//                       value={formData.relation}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
//                       required
//                     >
//                       <option value="">Select relation</option>
//                       <option value="Parent">Parent</option>
//                       <option value="Sibling">Sibling</option>
//                       <option value="Friend">Friend</option>
//                       <option value="Relative">Relative</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   {/* Student */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Student <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="student"
//                       value={formData.student}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
//                       required
//                     >
//                       <option value="">Select student</option>
//                       <option value="student1">Rahul Sharma - A-204</option>
//                       <option value="student2">Amit Kumar - C-310</option>
//                       <option value="student3">Priya Singh - B-105</option>
//                     </select>
//                   </div>

//                   {/* ID Proof Type */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       ID Proof Type <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="idProofType"
//                       value={formData.idProofType}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
//                       required
//                     >
//                       <option value="">Select ID type</option>
//                       <option value="Aadhaar">Aadhaar Card</option>
//                       <option value="PAN">PAN Card</option>
//                       <option value="Driving License">Driving License</option>
//                       <option value="Voter ID">Voter ID</option>
//                       <option value="Passport">Passport</option>
//                     </select>
//                   </div>

//                   {/* ID Proof Number */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       ID Proof Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="idProofNumber"
//                       value={formData.idProofNumber}
//                       onChange={handleInputChange}
//                       placeholder="Enter ID number"
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Purpose of Visit */}
//                 <div className="mt-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Purpose of Visit <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="purposeOfVisit"
//                     value={formData.purposeOfVisit}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
//                     required
//                   >
//                     <option value="">Select purpose</option>
//                     <option value="Personal Visit">Personal Visit</option>
//                     <option value="Academic">Academic</option>
//                     <option value="Emergency">Emergency</option>
//                     <option value="Official">Official</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 {/* Remarks */}
//                 <div className="mt-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Remarks
//                   </label>
//                   <textarea
//                     name="remarks"
//                     value={formData.remarks}
//                     onChange={handleInputChange}
//                     placeholder="Any additional notes..."
//                     rows={4}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
//                   />
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 mt-8">
//                   <button
//                     type="submit"
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                   >
//                     <UserPlus className="h-5 w-5" />
//                     Register & Notify Warden
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                   >
//                     <X className="h-5 w-5" />
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
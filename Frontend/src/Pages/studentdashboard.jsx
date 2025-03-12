import { useState } from "react";

const StudentDashboard = () => {
  // Sample Student Info
  const studentInfo = {
    name: "Ajay",
    rollNumber: "S101",
  };
  const [marks, setMarks] = useState([
    { id: 1, student: "Ajay", studentNo: "S101", subjects: { Sub1: [20, 22], Sub2: [18, 19], Sub3: [21, 23], Sub4: [20, 21], Sub5: [22, 24], Sub6: [18, 20], Sub7: [19, 22], Sub8: [21, 23], Sub9: [25, 28] }, status: {} }
  ]);

  // Marks Data
  

  const attendanceData = [
    { subject: "Mathematics", totalClasses: 40, attended: 34 },
    { subject: "Physics", totalClasses: 40, attended: 24 },
    { subject: "Chemistry", totalClasses: 40, attended: 36 },
    { subject: "Computer Science", totalClasses: 40, attended: 31 },
  ];

  // Calculate Attendance Percentage
  const calculateAttendance = (attended, total) => ((attended / total) * 100).toFixed(2);

  // Total Attendance Calculation
  const totalClasses = attendanceData.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const totalAttended = attendanceData.reduce((acc, curr) => acc + curr.attended, 0);
  const totalAttendance = calculateAttendance(totalAttended, totalClasses);

  // Exam Eligibility Check (Attendance >= 75%)
  const checkEligibility = (attendance) => (attendance >= 75 ? "✅ Eligible" : "❌ Not Eligible");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex flex-auto justify-between">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <p className="text-lg">Welcome, {studentInfo.name}  USN: {studentInfo.rollNumber}</p>
        <button className="bg-red-500 px-4 py-2 rounded-lg justify-self-end"onClick={() => {
      localStorage.clear();   
      window.location.href = "/"; 
      }}>Logout</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Attendance</h3>
          <p className={`text-3xl font-bold ${totalAttendance >= 75 ? "text-green-500" : "text-red-500"}`}>
            {totalAttendance}%
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Exam Eligibility</h3>
          <p className={`text-3xl font-bold ${totalAttendance >= 75 ? "text-green-500" : "text-red-500"}`}>
            {checkEligibility(totalAttendance)}
          </p>
        </div>
      </div>

      {/* IA Marks Section */}
      <div className="p-6 bg-white shadow-md rounded-md overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Approve & Freeze Marks</h2>
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Student No.</th>
              {Object.keys(marks[0].subjects).map((subject) => (
                <th key={subject} className="border p-2">{subject}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <>
                {/* IA1 Row */}
                <tr key={mark.id + "-IA1"}>
                  <td rowSpan={2} className="border p-2 font-bold">{mark.student}</td>
                  <td rowSpan={2} className="border p-2">{mark.studentNo}</td>
                  {Object.entries(mark.subjects).map(([subject, [ia1, ia2]]) => (
                    <td key={subject + "-IA1"} className="border p-2">{ia1}</td>
                  ))}
                </tr>

                {/* IA2 Row */}
                <tr key={mark.id + "-IA2"}>
                  {Object.entries(mark.subjects).map(([subject, [ia1, ia2]]) => (
                    <td key={subject + "-IA2"} className="border p-2">{ia2}</td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {/* Attendance Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Attendance Details</h2>
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Total Classes</th>
              <th className="border p-2">Attended</th>
              <th className="border p-2">Attendance (%)</th>
              <th className="border p-2">Exam Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((data, index) => {
              const attendancePercentage = calculateAttendance(data.attended, data.totalClasses);
              return (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="border p-2 font-semibold">{data.subject}</td>
                  <td className="border p-2">{data.totalClasses}</td>
                  <td className="border p-2">{data.attended}</td>
                  <td className={`border p-2 ${attendancePercentage >= 75 ? "text-green-500" : "text-red-500"}`}>
                    {attendancePercentage}%
                  </td>
                  <td className="border p-2 font-semibold">{checkEligibility(attendancePercentage)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;

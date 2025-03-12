import { useState } from "react";
import { FaClipboardList, FaFileAlt, FaChartBar, FaCheckCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";


const FacultyDashboard = () => {
  const [activePage, setActivePage] = useState("attendance");
  const [attendance, setAttendance] = useState([]);
  const [submittedAttendance, setSubmittedAttendance] = useState([]);
  const [totalClassesConducted, setTotalClassesConducted] = useState(42);
  const [studentAttendanceRecords, setStudentAttendanceRecords] = useState({
    Alice: { attended: 35 },
    Bob: { attended: 28 },
    Charlie: { attended: 30 },
  });
  
  const [iaMrks, setIaMrks] = useState({"Class A":[
    { no:"S101",student: "Alice", ia1: "", ia2: "", assign1: "", assign2: "", assess1: "", assess2: "", frozen: false },
    { no:"S102",student: "Bob", ia1: "", ia2: "", assign1: "", assign2: "", assess1: "", assess2: "", frozen: false },
    { no:"S103",student: "Charlie", ia1: "", ia2: "", assign1: "", assign2: "", assess1: "", assess2: "", frozen: false },
  ],"Class B": [
      { no: 1, student: "Mike Johnson", ia1: "", ia2: "", assign1: "", assign2: "", assess1: "", assess2: "", frozen: false },
      { no: 2, student: "Emily Davis", ia1: "", ia2: "", assign1: "", assign2: "", assess1: "", assess2: "", frozen: false },
    ]});
    const [iaMarks, setIaMarks] = useState([
      { no:"S101",student: "Alice", ia1: "15", ia2: "12", assign1: "4", assign2: "4", assess1: "3", assess2: "5"},
      { no:"S102",student: "Bob", ia1: "12", ia2: "13", assign1: "3", assign2: "3", assess1: "5", assess2: "4" },
      { no:"S103",student: "Charlie", ia1: "15", ia2: "10", assign1: "3", assign2: "4", assess1: "5", assess2: "4" },
    ]);

  // Handle IA Marks Submission
  const handleMarksChange = (index, field, value, maxLimit) => {
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= maxLimit)) {
      setIaMrks((prevMarks) =>
        prevMarks.map((mark, i) =>
          i === index ? { ...mark, [field]: value } : mark
        )
      );
    }
  };
  const [selectedClass, setSelectedClass] = useState(""); // Track selected class
  const [students, setStudents] = useState([]); // Track students of the selected class
  
  // Dummy data for classes and students
  const classOptions = ["Class A", "Class B", "Class C"];
  const studentData = {
    "Class A": ["Alice", "Bob", "Charlie"],
    "Class B": ["David", "Emma", "Frank"],
    "Class C": ["Grace", "Hannah", "Isaac"],
  };
  
  // Handle class change and update students
  const handleClassChange = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);
    setStudents(studentData[selected] || []);
  };

  const handleAttendanceChange = (index, status) => {
  const updatedAttendance = { ...studentAttendanceRecords };
  updatedAttendance[students[index]] = {
    attended: (updatedAttendance[students[index]]?.attended || 0) + (status === "Present" ? 1 : 0),
  };
  setStudentAttendanceRecords(updatedAttendance);
};
  // const handleSubmitAttendance = () => {
  //   if (attendance.length === students.length) {
  //     setSubmittedAttendance(attendance);
  //     setTotalClassesConducted((prev) => prev + 1);
      
  //     const updatedRecords = { ...studentAttendanceRecords };
  //     attendance.forEach(({ student, status }) => {
  //       if (status === "Present") {
  //         updatedRecords[student].attended += 1;
  //       }
  //     });
  //     setStudentAttendanceRecords(updatedRecords);
      
  //     alert("Attendance submitted successfully!");
  //   } else {
  //     alert("Please mark attendance for all students before submitting.");
  //   }
  // };
  const handleSubmitAttendance = () => {
    setSubmittedAttendance(students);
  };
  const handleLogout = () => {
    window.location.href = "/faculty";
  };
  // Freeze Data Function
  const handleFreezeData = () => {
    setIaMrks((prevMarks) =>
      prevMarks.map((mark) => ({ ...mark, frozen: true }))
    );
    alert("IA Marks have been frozen and sent for approval!");
  };
  const [studentAttendance, setStudentAttendance] = useState([
    { student: "Alice", rollNo: "S101", conducted: 40, attended: 35 },
    { student: "Bob", rollNo: "S102", conducted: 40, attended: 28 },
    { student: "Charlie", rollNo: "S103", conducted: 40, attended: 30 },
  ]);
 

  const attendanceRef = useRef(null);
  const iaMarksRef = useRef(null);

  const generatePDF = (reportRef, title) => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${title}.pdf`);
    });
  };

  


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 fixed h-full">
        <h2 className="text-xl font-bold mb-5">Faculty Dashboard</h2>
        <ul className="space-y-4">
          <li className={`p-3 rounded-md cursor-pointer ${activePage === "attendance" ? "bg-gray-700" : ""}`} onClick={() => setActivePage("attendance")}>
            <FaClipboardList className="inline mr-2" /> Take Attendance
          </li>
          <li className={`p-3 rounded-md cursor-pointer ${activePage === "ia-marks" ? "bg-gray-700" : ""}`} onClick={() => setActivePage("ia-marks")}>
            <FaFileAlt className="inline mr-2" /> Submit IA Marks
          </li>
          <li className={`p-3 rounded-md cursor-pointer ${activePage === "freeze" ? "bg-gray-700" : ""}`} onClick={() => setActivePage("freeze")}>
            <FaCheckCircle className="inline mr-2" /> Freeze Data
          </li>
          <li className={`p-3 rounded-md cursor-pointer ${activePage === "reports" ? "bg-gray-700" : ""}`} onClick={() => setActivePage("reports")}>
            <FaChartBar className="inline mr-2" /> Generate Reports
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full">
        {/* Navbar */}
        <nav className="bg-gray-900 shadow-md p-4 flex justify-between items-center text-white">
          <h1 className="text-xl font-semibold">Faculty Panel</h1>
          <button className="bg-red-500 px-4 py-2 rounded-md" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Page Content */}
        <div className="p-6">
        {activePage === "attendance" && (
    <div>
      <h2 className="text-2xl font-bold mb-4">Take Attendance</h2>

      {/* Dropdown for selecting class */}
      <select
        className="border p-2 w-full mb-4"
        value={selectedClass}
        onChange={handleClassChange}
      >
        <option value="">Select Class</option>
        {classOptions.map((className, index) => (
          <option key={index} value={className}>
            {className}
          </option>
        ))}
      </select>

      {/* Display table only if a class is selected */}
      {selectedClass && (
        <>
          <input type="date" className="border p-2 w-full mb-2" />
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Present</th>
                <th className="border p-2">Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="border p-2">{student}</td>
                  <td className="border p-2">
                    <input
                      type="radio"
                      name={`attendance-${index}`}
                      value="Present"
                      onChange={() => handleAttendanceChange(index, "Present")}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="radio"
                      name={`attendance-${index}`}
                      value="Absent"
                      onChange={() => handleAttendanceChange(index, "Absent")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleSubmitAttendance}>
            Submit Attendance
          </button>

          {/* Attendance Summary */}
          {submittedAttendance.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>
              <p>Total Classes Conducted: {totalClassesConducted}</p>
              <table className="w-full border-collapse border border-gray-300 text-center mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Total Classes Attended</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td className="border p-2">{student}</td>
                      <td className="border p-2">{studentAttendanceRecords[student]?.attended || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )}
 
          {/* IA Marks Entry */}
          {activePage === "attendance" && selectedClass && (
        <div>
          
          <h2 className="text-2xl font-bold mb-4">Take Attendance - {selectedClass}</h2>
          <input type="date" className="border p-2 w-full mb-2" />
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Present</th>
                <th className="border p-2">Absent</th>
              </tr>
            </thead>
            <tbody>
              {students[selectedClass]?.map((student, index) => (
                <tr key={index}>
                  <td className="border p-2">{student}</td>
                  <td className="border p-2">
                    <input type="radio" name={`attendance-${index}`} value="Present" />
                  </td>
                  <td className="border p-2">
                    <input type="radio" name={`attendance-${index}`} value="Absent" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* IA Marks Page */}
      {activePage === "ia-marks" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Submit IA & Other Marks</h2>

          {/* Class Selection Dropdown inside IA Marks Page */}
          <label className="block font-bold mb-2">Select Class:</label>
          <select className="border p-2 mb-4" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">-- Select Class --</option>
            {Object.keys(iaMrks).map((className) => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>

          {selectedClass && (
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Roll No</th>
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2">IA1 (15)</th>
                  <th className="border p-2">IA2 (15)</th>
                  <th className="border p-2">Assign1 (5)</th>
                  <th className="border p-2">Assign2 (5)</th>
                  <th className="border p-2">Assess1 (5)</th>
                  <th className="border p-2">Assess2 (5)</th>
                </tr>
              </thead>
              <tbody>
                {iaMrks[selectedClass]?.map((mark, index) => (
                  <tr key={index}>
                    <td className="border p-2">{mark.no}</td>
                    <td className="border p-2">{mark.student}</td>
                    <td className="border p-2"><input type="number" className="border p-1 w-16 text-center" value={mark.ia1} /></td>
                    <td className="border p-2"><input type="number" className="border p-1 w-16 text-center" value={mark.ia2} /></td>
                    <td className="border p-2"><input type="number" className="border p-1 w-16 text-center" value={mark.assign1} /></td>
                    <td className="border p-2"><input type="number" className="border p-1 w-16 text-center" value={mark.assign2} /></td>
                    <td className="border p-2"><input type="number" className="border p-1 w-16 text-center" value={mark.assess1} /></td>
                    <td className="border p-2"><input type="number" className="border p-1 w-16 text-center" value={mark.assess2} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

          {/* Freeze Data Section */}
          {activePage === "freeze" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Freeze Data</h2>
              <table className="w-full border-collapse border border-gray-300 text-center mt-4">
                <thead>
                  <tr className="bg-gray-200">
                  <th className="border p-2">Roll No</th>
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">IA1</th>
                    <th className="border p-2">IA2</th>
                    <th className="border p-2">Assign1</th>
                    <th className="border p-2">Assign2</th>
                    <th className="border p-2">Assess1</th>
                    <th className="border p-2">Assess2</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {iaMrks.map((mark, index) => (
                    <tr key={index}>
                      <td className="border p-2">{mark.no}</td>
                      <td className="border p-2">{mark.student}</td>
                      <td className="border p-2">{mark.ia1 || "-"}</td>
                      <td className="border p-2">{mark.ia2 || "-"}</td>
                      <td className="border p-2">{mark.assign1 || "-"}</td>
                      <td className="border p-2">{mark.assign2 || "-"}</td>
                      <td className="border p-2">{mark.assess1 || "-"}</td>
                      <td className="border p-2">{mark.assess2 || "-"}</td>
                      <td className="border p-2">{mark.frozen ? "Frozen" : "Not Frozen"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleFreezeData} disabled={iaMrks.every((mark) => mark.frozen)}>
                {iaMrks.every((mark) => mark.frozen) ? "Data Already Frozen" : "Freeze Data"}
              </button>
            </div>
          )}
          {activePage === "reports" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Attendance Report</h2>
            <div ref={attendanceRef} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Roll No</th>
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Conducted Classes</th>
                    <th className="border p-2">Attended Classes</th>
                    <th className="border p-2">Attendance (%)</th>
                    <th className="border p-2">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAttendance.map((student, index) => {
                    const attendancePercentage = ((student.attended / student.conducted) * 100).toFixed(2);
                    return (
                      <tr key={index}>
                        <td className="border p-2">{student.rollNo}</td>
                        <td className="border p-2">{student.student}</td>
                        <td className="border p-2">{student.conducted}</td>
                        <td className="border p-2">{student.attended}</td>
                        <td className="border p-2">{attendancePercentage}%</td>
                        <td className={`border p-2 ${attendancePercentage >= 75 ? "text-green-500" : "text-red-500"}`}>
                          {attendancePercentage >= 75 ? "Eligible" : "Not Eligible"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => generatePDF(attendanceRef, "Attendance_Report")}>
              Download Attendance Report
            </button>
            
            <h2 className="text-2xl font-bold mb-4 mt-6">IA Marks Report</h2>
            <div ref={iaMarksRef} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Roll No</th>
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">IA1</th>
                    <th className="border p-2">IA2</th>
                    <th className="border p-2">Assignment 1</th>
                    <th className="border p-2">Assignment 2</th>
                    <th className="border p-2">Assessment 1</th>
                    <th className="border p-2">Assessment 2</th>
                    <th className="border p-2">Total Marks</th>
                    <th className="border p-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {iaMarks.map((mark, index) => {
                    const totalMarks = Number(mark.ia1) + Number(mark.ia2) + Number(mark.assign1) + Number(mark.assign2) + Number(mark.assess1) + Number(mark.assess2);
                    return (
                      <tr key={index}>
                      <td className="border p-2">{mark.no}</td>
                      <td className="border p-2">{mark.student}</td>
                      <td className="border p-2">{mark.ia1 || "-"}</td>
                      <td className="border p-2">{mark.ia2 || "-"}</td>
                      <td className="border p-2">{mark.assign1 || "-"}</td>
                      <td className="border p-2">{mark.assign2 || "-"}</td>
                      <td className="border p-2">{mark.assess1 || "-"}</td>
                      <td className="border p-2">{mark.assess2 || "-"}</td>
                        <td className="border p-2">{totalMarks}</td>
                        <td className={`border p-2 ${totalMarks >= 25 ? "text-green-500" : "text-red-500"}`}>{totalMarks >= 25 ? "Pass" : "Fail"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => generatePDF(iaMarksRef, "IA_Marks_Report")}>Download IA Marks Report</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

import { useState } from "react";
import { FaUserCheck, FaFileAlt, FaClipboardList, FaChartBar } from "react-icons/fa";

const HodDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const totalStudents = 120;
  const totalFaculty = 35;
  const [marks, setMarks] = useState([
    { id: 1, student: "Alice", studentNo: "S101", subjects: { Sub1: [20, 22], Sub2: [18, 19], Sub3: [21, 23], Sub4: [20, 21], Sub5: [22, 24], Sub6: [18, 20], Sub7: [19, 22], Sub8: [21, 23], Sub9: [25, 28] }, status: "Pending" },
    { id: 2, student: "Bob", studentNo: "S102", subjects: { Sub1: [25, 27], Sub2: [22, 20], Sub3: [24, 26], Sub4: [23, 25], Sub5: [22, 20], Sub6: [18, 19], Sub7: [19, 22], Sub8: [21, 24], Sub9: [26, 29] }, status: "Pending" },
    { id: 3, student: "Charlie", studentNo: "S103", subjects: { Sub1: [19, 18], Sub2: [20, 22], Sub3: [21, 24], Sub4: [23, 22], Sub5: [22, 21], Sub6: [19, 20], Sub7: [18, 19], Sub8: [20, 21], Sub9: [24, 27] }, status: "Pending" },
  ]);
  const [assignedDuties, setAssignedDuties] = useState([]);
  const [dutyDetails, setDutyDetails] = useState({ date: "", faculty: "", dutyType: "" });

  const handleAssignDuty = () => {
    if (dutyDetails.date && dutyDetails.faculty && dutyDetails.dutyType) {
      setAssignedDuties((prev) => [...prev, dutyDetails]);
      setDutyDetails({ date: "", faculty: "", dutyType: "" });
      alert("Duty assigned successfully!");
    } else {
      alert("Please fill all fields!");
    }
  };
  const handleApprove = (id) => {
    setMarks((prev) =>
      prev.map((mark) => (mark.id === id ? { ...mark, status: "Approved" } : mark))
    );
  };

  // Reject Entire Row (All Subjects for a Student)
  const handleReject = (id) => {
    setMarks((prev) =>
      prev.map((mark) => (mark.id === id ? { ...mark, status: "Rejected" } : mark))
    );
  };

  // Freeze Approved Marks
  const handleFreeze = () => {
    setMarks((prev) =>
      prev.map((mark) => ({
        ...mark,
        status: mark.status === "Approved" ? "Frozen" : mark.status,
      }))
    );
    alert("Approved marks have been frozen!");
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 fixed h-full">
        <h2 className="text-xl font-bold mb-5">HOD Dashboard</h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-3 rounded-md cursor-pointer" onClick={() => setActivePage("dashboard")}>
            📊 Dashboard
          </li>
          <li className="hover:bg-gray-700 p-3 rounded-md cursor-pointer" onClick={() => setActivePage("approve")}>
            <FaUserCheck className="inline mr-2" /> Approve & Freeze Data
          </li>
          <li className="hover:bg-gray-700 p-3 rounded-md cursor-pointer" onClick={() => setActivePage("faculty")}>
            <FaClipboardList className="inline mr-2" /> Manage Faculty Exam Duties
          </li>
          
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full">
        {/* Navbar */}
        <nav className="bg-gray-900 shadow-md p-4 flex justify-between items-center text-white">
          <h1 className="text-xl font-semibold ">HOD Panel</h1>
          <button className="bg-red-500 px-4 py-2 rounded-lg"onClick={() => {
      localStorage.clear();  
      window.location.href = "/hod"; 
      }}>Logout</button>
        </nav>

        {/* Page Content */}
        <div className="p-6">
        {activePage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-500 text-white p-5 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Total Students</h3>
                <p className="text-3xl font-bold">{totalStudents}</p>
              </div>
              <div className="bg-green-500 text-white p-5 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Total Faculty</h3>
                <p className="text-3xl font-bold">{totalFaculty}</p>
              </div>
            </div>
          )}

          {activePage === "approve" && (
            <div className="p-6 bg-white shadow-md rounded-md overflow-auto">
              <h2 className="text-2xl font-bold mb-4">Approve & Freeze Marks</h2>
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Student No.</th>
                    {Object.keys(marks[0].subjects).map((subject) => (
                      <th className="border p-2">{subject}</th>
                    ))}
                    <th className="border p-2">Actions</th>
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
                        <td rowSpan={2} className="border p-2">
                          {mark.status === "Pending" && (
                            <>
                              <button
                                className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                                onClick={() => handleApprove(mark.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                                onClick={() => handleReject(mark.id)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {mark.status !== "Pending" && (
                            <span
                              className={`font-semibold ${
                                mark.status === "Approved"
                                  ? "text-green-500"
                                  : mark.status === "Rejected"
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {mark.status}
                            </span>
                          )}
                        </td>
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
              <div className="mt-4 text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleFreeze}>
                  Freeze Approved Marks
                </button>
              </div>
            </div>
          )}

          {activePage === "faculty" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Assign Duties</h2>
              <div className="bg-white p-4 rounded shadow-md">
                <input
                  type="date"
                  className="border mb-2 p-2 w-full"
                  value={dutyDetails.date}
                  onChange={(e) => setDutyDetails({ ...dutyDetails, date: e.target.value })}
                />
                <input
                  type="text"
                  className="border mb-2 p-2 w-full"
                  placeholder="Faculty Name"
                  value={dutyDetails.faculty}
                  onChange={(e) => setDutyDetails({ ...dutyDetails, faculty: e.target.value })}
                />
                <select
                  className="border mb-2 p-2 w-full"
                  value={dutyDetails.dutyType}
                  onChange={(e) => setDutyDetails({ ...dutyDetails, dutyType: e.target.value })}
                >
                  <option value="">Select Duty Type</option>
                  <option value="Exam Duty">Exam Duty</option>
                  <option value="Reliever Duty">Reliever Duty</option>
                </select>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full" onClick={handleAssignDuty}>
                  Assign Duty
                </button>
              </div>

              {/* Display Assigned Duties Below */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Assigned Duties</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="text-left px-4 py-2">Date</th>
                      <th className="text-left px-4 py-2">Faculty</th>
                      <th className="text-left px-4 py-2">Duty Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedDuties.length > 0 ? (
                      assignedDuties.map((duty, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{duty.date}</td>
                          <td className="border px-4 py-2">{duty.faculty}</td>
                          <td className="border px-4 py-2">{duty.dutyType}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="border px-4 py-2 text-center text-gray-500">
                          No duties assigned yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;

import { useState } from "react";
import { FaBars, FaTicketAlt, FaUpload } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { jsPDF } from "jspdf";

const Sidebar = ({ open, setOpen, setActivePage }) => {
  return (
    <div className={`bg-gray-900 text-white h-screen p-5 ${open ? "w-64" : "w-20"} transition-all duration-300`}>
      <button onClick={() => setOpen(!open)} className="mb-5">
        <FaBars size={24} />
      </button>
      <nav className="space-y-4">
        <button onClick={() => setActivePage("hallticket")} className="flex items-center space-x-2 hover:text-gray-400 w-full">
          <FaTicketAlt />
          {open && <span>Generate Hall Tickets</span>}
        </button>
        <button onClick={() => setActivePage("upmarks")} className="flex items-center space-x-2 hover:text-gray-400 w-full">
          <FaUpload />
          {open && <span>Upload Marks</span>}
        </button>
        <button className="flex items-center space-x-2 hover:text-gray-400 w-full" onClick={() => {
          localStorage.clear();    
          window.location.href = "/examdept"; 
        }}>
          <FiLogOut />
          {open && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
};
const students = [
  { studentNo: "1001", name: "Alice Johnson", semester: "6", year: "2025", eligible: true },
  { studentNo: "1002", name: "Bob Smith", semester: "6", year: "2025", eligible: false },
  { studentNo: "1003", name: "Charlie Davis", semester: "6", year: "2025", eligible: true },
];

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Exam Department Dashboard</h1>
      <span>Welcome, Exam Department</span>
    </div>
  );
};

const ExamdeptDashboard = () => {
  const [open, setOpen] = useState(true);
  const [activePage, setActivePage] = useState("hallticket");
  const [studentNo, setStudentNo] = useState("");
  const [eligible, setEligible] = useState(null);

  const checkEligibility = () => {
    const student = students.find(s => s.studentNo === studentNo);
    setStudentData(student || null);
  };

  const generatePDF = () => {
    if (!eligible) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("College Name", 105, 20, null, null, "center");
    
    doc.setFontSize(12);
    doc.text(`Student Name: John Doe`, 20, 40);
    doc.text(`Student No: ${studentNo}`, 20, 50);
    doc.text(`Semester: 6`, 20, 60);
    doc.text(`Examination Year: 2025`, 20, 70);
    
    doc.line(20, 75, 190, 75);
    
    // Table Header
    const subjects = ["CS101", "CS102", "CS103", "CS104", "CS105", "CS106", "CS107", "CS108", "CS109"];
    let xPos = 20;
    subjects.forEach((sub, index) => {
      doc.text(sub, xPos, 85);
      xPos += 18;
    });

    // Empty row for attendance signature
    xPos = 20;
    subjects.forEach(() => {
      doc.text("____", xPos, 95);
      xPos += 18;
    });

    doc.save("Hall_Ticket.pdf");
  };

  return (
    <div className="flex h-screen">
      <Sidebar open={open} setOpen={setOpen} setActivePage={setActivePage} />
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <main className="p-6">
          {activePage === "hallticket" && (
            <section className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold mb-2">Generate Hall Tickets</h2>
              <input
                type="number"
                className="border p-2 w-full mb-2"
                placeholder="Enter Student Number"
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
              />
              <button
                onClick={checkEligibility}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
              >
                Check Eligibility
              </button>
              {eligible === false && <p className="text-red-500">Not Eligible for Exam</p>}
              {eligible && (
                <>
                  <iframe
                    title="Hall Ticket Preview"
                    src={URL.createObjectURL(new Blob([], { type: "application/pdf" }))}
                    className="w-full h-64 border mt-4"
                  ></iframe>
                  <button
                    onClick={generatePDF}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Download Hall Ticket
                  </button>
                </>
              )}
            </section>
          )}
          {activePage === "upmarks" && (
            <section className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Upload Semester-End Marks</h2>
              <input type="file" className="border p-2 w-full" />
              <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">Upload</button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ExamdeptDashboard;

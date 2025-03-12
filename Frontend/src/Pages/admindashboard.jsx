import React, { useState, useMemo } from "react";
import { FiUsers, FiSettings, FiUserCheck, FiClipboard } from "react-icons/fi";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li onClick={() => setActivePage("dashboard")} className="mb-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">Dashboard</li>
        <li onClick={() => setActivePage("departments")} className="mb-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">Manage Departments</li>
        <li onClick={() => setActivePage("users")} className="mb-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">Manage Users</li>
        <li onClick={() => setActivePage("students")} className="mb-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">Approve Students</li>
        <li onClick={() => setActivePage("config")} className="mb-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">System Configuration</li>
      </ul>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <button className="bg-red-500 px-4 py-2 rounded-lg"onClick={() => {
      localStorage.clear();    
      window.location.href = "/"; 
      }}>Logout</button>
    </div>
  );
};

const DashboardCard = ({ title, icon: Icon, color, value }) => {
  return (
    <div className={`p-4 ${color} text-white rounded-lg flex items-center gap-3 shadow-md`}>
      <Icon size={24} />
      <div>
        <span className="text-lg font-semibold">{title}</span>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science", hod: "Dr.Sathish", faculty: 10, students: 200 },
    { id: 2, name: "Mechanical Engineering", hod: "Dr.Prashanth", faculty: 8, students: 180 },
  ]);
  const [newDepartment, setNewDepartment] = useState({ name: "", hod: "", faculty: "", students: "" });
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "Amodh", email: "Amodh@example.com", phone: "1234567890", role: "Faculty" },
    { id: 2, name: "Manjunath", email: "Manjunath@example.com", phone: "0987654321", role: "Exam Staff" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", role: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingStudents, setPendingStudents] = useState([
    { id: 1, name: "Ananya", email: "ananya@example.com", department: "Computer Science", enrollment: "CS2023001", status: "Pending" },
    { id: 2, name: "Rajkumar", email: "raj@example.com", department: "Mechanical Engineering", enrollment: "ME2023002", status: "Pending" },
  ]);
  const [config, setConfig] = useState({
    passwordPolicy: "Minimum 8 characters",
    academicYear: "2023-2024",
    emailNotifications: true,
    iaMarksStructure: { IA1: 20, IA2: 20, Assignment: 10 },
  });

  // Recalculate the total departments, faculty, and students whenever departments change
  const dummyData = useMemo(() => {
    const totalDepartments = departments.length;
    const totalFaculty = departments.reduce((total, dept) => total + parseInt(dept.faculty || 0), 0);
    const totalStudents = departments.reduce((total, dept) => total + parseInt(dept.students || 0), 0);

    return {
      totalDepartments,
      totalFaculty,
      totalStudents,
    };
  }, [departments]);

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.hod || !newDepartment.faculty || !newDepartment.students) {
      alert("Please fill all fields!");
      return;
    }
    setDepartments([...departments, { id: Date.now(), ...newDepartment }]);
    setNewDepartment({ name: "", hod: "", faculty: "", students: "" });
    alert("New Department Added!");
  };

  const handleEditDepartment = (dept) => {
    setSelectedDepartment(dept);
  };

  const handleSaveEdit = () => {
    setDepartments(departments.map(dept => dept.id === selectedDepartment.id ? selectedDepartment : dept));
    setSelectedDepartment(null);
    alert("Department Updated!");
  };

  const handleRemoveDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    alert("Department Removed!");
  };
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.role) {
      alert("Please fill all fields!");
      return;
    }
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "", phone: "", role: "" });
    alert("New User Added!");
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleSaveEditUser = () => {
    setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
    setSelectedUser(null);
    alert("User Updated!");
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    alert("User Removed!");
  };
  const handleApproveStudent = (id) => {
    setPendingStudents(pendingStudents.map(student => student.id === id ? { ...student, status: "Approved" } : student));
    alert("Student Approved!");
  };

  const handleRejectStudent = (id) => {
    setPendingStudents(pendingStudents.filter(student => student.id !== id));
    alert("Student Rejected!");
  };
  const handleConfigChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          {activePage === "dashboard" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
              <div className="grid grid-cols-3 gap-4">
                <DashboardCard title="Total Departments" icon={FiUsers} color="bg-blue-500" value={dummyData.totalDepartments} />
                <DashboardCard title="Total Faculty" icon={FiClipboard} color="bg-green-500" value={dummyData.totalFaculty} />
                <DashboardCard title="Total Students" icon={FiUserCheck} color="bg-purple-500" value={dummyData.totalStudents} />
              </div>
            </>
          )}

          {activePage === "departments" && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Manage Departments</h2>
              <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">Add Department</h3>
                <input className="border p-2 w-full mb-2" placeholder="Department Name" value={newDepartment.name} onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="HOD Name" value={newDepartment.hod} onChange={(e) => setNewDepartment({ ...newDepartment, hod: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Total Faculty" value={newDepartment.faculty} onChange={(e) => setNewDepartment({ ...newDepartment, faculty: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Total Students" value={newDepartment.students} onChange={(e) => setNewDepartment({ ...newDepartment, students: e.target.value })} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddDepartment}>Add Department</button>
              </div>
              <table className="w-full mt-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Department Name</th>
                    <th className="p-2 border">HOD Name</th>
                    <th className="p-2 border">Total Faculty</th>
                    <th className="p-2 border">Total Students</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id} className="text-center border">
                      <td className="p-2 border">{dept.name}</td>
                      <td className="p-2 border">{dept.hod}</td>
                      <td className="p-2 border">{dept.faculty}</td>
                      <td className="p-2 border">{dept.students}</td>
                      <td className="p-2 border">
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEditDepartment(dept)}>Edit</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemoveDepartment(dept.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedDepartment && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                  <h3 className="text-lg font-semibold mb-2">Edit Department</h3>
                  <input className="border p-2 w-full mb-2" value={selectedDepartment.name} onChange={(e) => setSelectedDepartment({ ...selectedDepartment, name: e.target.value })} />
                  <input className="border p-2 w-full mb-2" value={selectedDepartment.hod} onChange={(e) => setSelectedDepartment({ ...selectedDepartment, hod: e.target.value })} />
                  <input className="border p-2 w-full mb-2" value={selectedDepartment.faculty} onChange={(e) => setSelectedDepartment({ ...selectedDepartment, faculty: e.target.value })} />
                  <input className="border p-2 w-full mb-2" value={selectedDepartment.students} onChange={(e) => setSelectedDepartment({ ...selectedDepartment, students: e.target.value })} />
                  <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveEdit}>Save</button>
                </div>
              )}
            </div>
          )}

          {/* Other pages (users, students, config) would go here */}
          {activePage === "users" && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
              <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">Add User</h3>
                <input className="border p-2 w-full mb-2" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Phone" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                <input className="border p-2 w-full mb-2" placeholder="Role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddUser}>Add User</button>
              </div>
              <table className="w-full mt-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="text-center border">
                      <td className="p-2 border">{user.name}</td>
                      <td className="p-2 border">{user.email}</td>
                      <td className="p-2 border">{user.phone}</td>
                      <td className="p-2 border">{user.role}</td>
                      <td className="p-2 border">
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEditUser(user)}>Edit</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemoveUser(user.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedUser && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                  <h3 className="text-lg font-semibold mb-2">Edit User</h3>
                  <input className="border p-2 w-full mb-2" value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
                  <input className="border p-2 w-full mb-2" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                  <input className="border p-2 w-full mb-2" value={selectedUser.phone} onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} />
                  <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveEditUser}>Save</button>
                </div>
              )}
            </div>
          )}
          {activePage === "students" && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Approve Students</h2>
              <table className="w-full mt-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Department</th>
                    <th className="p-2 border">Enrollment</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingStudents.map((student) => (
                    <tr key={student.id} className="text-center border">
                      <td className="p-2 border">{student.name}</td>
                      <td className="p-2 border">{student.email}</td>
                      <td className="p-2 border">{student.department}</td>
                      <td className="p-2 border">{student.enrollment}</td>
                      <td className={`p-2 border ${student.status === "Approved" ? "text-green-600" : "text-red-600"}`}>{student.status}</td>
                      <td className="p-2 border">
                        {student.status === "Pending" && (
                          <>
                            <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleApproveStudent(student.id)}>Approve</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRejectStudent(student.id)}>Reject</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activePage === "config" && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
              <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">General Settings</h3>
                <label className="block">Password Policy:</label>
                <input className="border p-2 w-full mb-2" value={config.passwordPolicy} onChange={(e) => handleConfigChange("passwordPolicy", e.target.value)} />
                <label className="block">Academic Year:</label>
                <input className="border p-2 w-full mb-2" value={config.academicYear} onChange={(e) => handleConfigChange("academicYear", e.target.value)} />
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
                <label className="flex items-center">
                  <input type="checkbox" checked={config.emailNotifications} onChange={(e) => handleConfigChange("emailNotifications", e.target.checked)} />
                  <span className="ml-2">Enable Email Notifications</span>
                </label>
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">IA Exam Configuration</h3>
                <label className="block">IA1 Marks:</label>
                <input className="border p-2 w-full mb-2" type="number" value={config.iaMarksStructure.IA1} onChange={(e) => handleConfigChange("iaMarksStructure", { ...config.iaMarksStructure, IA1: Number(e.target.value) })} />
                <label className="block">IA2 Marks:</label>
                <input className="border p-2 w-full mb-2" type="number" value={config.iaMarksStructure.IA2} onChange={(e) => handleConfigChange("iaMarksStructure", { ...config.iaMarksStructure, IA2: Number(e.target.value) })} />
                <label className="block">Assignment Marks:</label>
                <input className="border p-2 w-full mb-2" type="number" value={config.iaMarksStructure.Assignment} onChange={(e) => handleConfigChange("iaMarksStructure", { ...config.iaMarksStructure, Assignment: Number(e.target.value) })} />
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => alert("Configuration Saved!")}>Save Configuration</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

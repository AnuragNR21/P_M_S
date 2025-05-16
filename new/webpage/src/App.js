import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homes from "./screens/Homes.js";
import PayrollCalendar from "./screens/Components/PayrollCalendar.js";
import Task from "./screens/Components/Task.js";
import Payroll from "./screens/Components/Payroll.js";
import Performance from "./screens/Components/Performance.js";
import HelpCenter from "./screens/Components/HelpCenter.js";
import Hiring from "./screens/Components/Hiring.js";
import EmployeePage from "./screens/Components/EmployeePage.js";
import ProcessSalaryPage from "./screens/Components/ProcessSalaryPage.js";
import SalaryInfo from "./screens/Components/SalaryInfo.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homes />} /> {/* This makes '/' go to Homes */}
        <Route path="/homes" element={<Homes />} />
        <Route path="/payrollCalendar" element={<PayrollCalendar />} />
        <Route path="/task" element={<Task />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/hiring" element={<Hiring />} />
        <Route path="/employeepage" element={<EmployeePage   />} />
        <Route path="/processsalarypage" element={<ProcessSalaryPage />} />
        <Route path="/salaryinfo" element={<SalaryInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Router } from "express";
import { Employee_login , view_employee , Change , otpsend , forget } from "../controller/Employee.controller.js";
import { EmployeeAuth } from "../middleware/Adminauth.js";

const employeeRouter = Router()

employeeRouter.post("/change_password",EmployeeAuth,Change)
employeeRouter.post("/login",Employee_login)
employeeRouter.get("/:id",EmployeeAuth,view_employee)
employeeRouter.post("/optsend",otpsend)
employeeRouter.post("/forget",forget)

export default employeeRouter
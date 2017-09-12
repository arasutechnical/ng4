import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { SearchDetails } from '../search-details';
import 'rxjs/add/operator/map';
import {findIndex,clone} from 'lodash';


@Component({
  selector:'emp-comp',
    moduleId: module.id,
    templateUrl: 'employees.component.html'
})

export class EmployeeComponent implements OnInit{

	employeeForm : boolean = false;
	editedEmployeeForm : boolean = false;
	isNewForm : boolean;
	newEmployee: any ={};
	editedEmployee: any ={};
	employee: Employee;
	employees: Employee[];	
	searchEmployeeForm: boolean = false;
	searchDetails: any ={};
	list: Array<string>= ['FirstName','LastName','EMail','Designation'];
	constructor(private _employeeService : EmployeeService){}
	
	ngOnInit(){
		this.getEmployees();
		//console.log('@@@@@@@@@@@@@@@@'+this.searchDetails.searchKey);
	}
	
getEmployees(){	
	console.log('after http call');
	this._employeeService.getEmloyeesR().subscribe(res =>{(this.employees=res)});
	
}
showEditEmployeeForm(employee:Employee){
	if(!employee){
		console.log('inside showeditform inside if ');
		this.employeeForm= false;
		return;
		
	}
	this.editedEmployeeForm = true;
	//this.isNewForm=false;
	this.editedEmployee=clone(employee);
	console.log('inside showeditform after if ');
	
}

showAddEmployeeForm(){
	//resets form if edited employee
	if(this.employees.length){
		this.newEmployee = {};
		console.log("inside empty condition");
		
	}
	this.employeeForm = true;
	this.isNewForm = true;
	
}

saveEmployee(employee:Employee){
	if(this.isNewForm){
		//add a new Employee
		console.log('entering add employee method');
		this._employeeService.addEmployeeR(employee).subscribe(res =>{(this.employee=res)});
		//this._employeeService.addEmployee(employee);
		this.employees.push(employee);
		console.log("inside save method11")
		
	}
	
	this.employeeForm=false
}

updateEmployee(employee:Employee){
	let empeditindex=findIndex(this.employees,(e:Employee)=>{
		return e._id===employee._id
	});
	this.employees[empeditindex]=employee;
	this._employeeService.updateEmployeeR(employee).subscribe(res =>{(this.employee=res)});
this.editedEmployeeForm=false;
this.editedEmployee={};

}
cancelEdit(){
	this.editedEmployee={};
	this.editedEmployeeForm=false;
}
cancelAdd(){
	this.newEmployee={};
	this.employeeForm=false;
}
removeEmployee(employee:Employee){
	console.log(employee._id+employee.firstname);
	this._employeeService.deleteEmployeeR(employee).subscribe(res =>{(this.employee=res)});
	this.employees.splice(this.employees.indexOf(employee),1);
	
}
showSearchEmployeeForm(){
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2');
	this.cancelEdit();
	this.cancelAdd();

this.searchEmployeeForm=true;

}
searchEmployee(serachDetails:SearchDetails){
console.log("search value"+serachDetails.searchValue);
console.log("search key"+serachDetails.searchKey);
}
cancelSearch(){
	//this.editedEmployee={};
	this.searchEmployeeForm=false;
}

uploadExcel(){

	console.log('sfsdkfdsbfdsbfdsfExcel upload');
}
}

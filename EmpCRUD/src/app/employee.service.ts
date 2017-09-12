
import {Injectable} from '@angular/core';
import {Employee} from './employee';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {
	constructor(private __http : Http){}	
	private emplurl ='http://localhost:8089/api/employees/';

	getEmloyeesR():Observable<Employee[]>{
		return this.__http.get(this.emplurl)
		 .map((res=><Employee[]> res.json())
		 //.do(data=>console.log(data);)
		);
		}

	addEmployeeR(employee:Employee):Observable<Employee>{
		let bodyString = JSON.stringify(employee); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); 
		return this.__http.post(this.emplurl,employee,options)
		.map((res=><Employee>res.json())
		//.do(data=>console.log(data);)
	)
		//.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
			} 
	updateEmployeeR(employee:Employee):Observable<Employee>{
		let bodyString = JSON.stringify(employee); // Stringify payload
		let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options       = new RequestOptions({ headers: headers }); 
		let urlUpdate = `${this.emplurl}${employee._id}`;
		console.log('here url for update =>'+urlUpdate);
		return this.__http.put(urlUpdate,employee,options)
		.map((res=><Employee>res.json()))
		//.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
			} 
	
	deleteEmployeeR(employee:Employee):Observable<Employee>{
		console.log("okkkkkkkkkkkkkk"+employee.firstname);
		return this.__http.delete(`${this.emplurl}${employee._id}`)
		.map((res:Response) => res.json())	
		//.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
		
	}
	
	
}
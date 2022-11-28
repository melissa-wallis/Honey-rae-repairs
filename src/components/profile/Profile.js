import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"

export const Profile = () => {
    const localHoneyUser = localStorage.getItem("honey_user") //get honeyUser object out of local storage, return as a string
    const honeyUserObject = JSON.parse(localHoneyUser) //makes variable above an object so we can use it. this is an oject with two properties: id and staff
    
    if (honeyUserObject.staff) {
        //return employee profile view
        return <EmployeeForm/>
    } else {
        //return customer profile view
        return <CustomerForm/>
    }
}

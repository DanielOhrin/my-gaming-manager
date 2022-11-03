import { useEffect, useState } from "react"
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./Nav.css"

export const Nav = () => {
    const [staff, setStaff] = useState(false)

    useEffect(() => {
        setStaff(JSON.parse(localStorage.getItem("mgm_user")).isStaff)
    }, [])

    if (staff) {
        return <EmployeeNav />
    } else {
        return <CustomerNav />
    }
}
import { useEffect, useState } from "react"
import { CustomerView } from "./CustomerView"
import { EmployeeView } from "./EmployeeView"

export const ApplicationViews = () => {
    const [staff, setStaff] = useState(false)

    useEffect(() => {
        setStaff(JSON.parse(localStorage.getItem("mgm_user")).staff)
    }, [])

    if (staff) {
        return <EmployeeView />
    } else {
        return <CustomerView />
    }
}
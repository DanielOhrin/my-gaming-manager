import { useState } from "react"
import { CustomerView } from "./CustomerView"
import { EmployeeView } from "./EmployeeView"

export const ApplicationViews = () => {
    const [staff] = useState(JSON.parse(localStorage.getItem("mgm_user")).staff)

    if (staff) {
        return <EmployeeView />
    } else {
        return <CustomerView />
    }
}
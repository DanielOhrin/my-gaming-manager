import { Navigate } from "react-router-dom"

export const Authorized = ({ children }) => {

    if (localStorage.getItem("mgm_user")) {
        return children
    }
    else {
        return <Navigate
            to="/login"
            replace />
    }
}
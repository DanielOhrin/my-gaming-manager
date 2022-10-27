import { Link, useNavigate } from "react-router-dom"
import "./Nav.css"

export const Nav = () => {
    const navigate = useNavigate()

    return (
        <ul id="nav" className=" flex justify-evenly items- bg-blue-200 m-0 border-solid border-2">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to={`/profile/${JSON.parse(localStorage.getItem("mgm_user")).id}`}>Profile</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to={`/my-lists/${JSON.parse(localStorage.getItem("mgm_user")).id}`}>My Lists</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/search">Search</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/login" onClick={() => {
                    localStorage.removeItem("mgm_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link> 
                    </li>
                    : ""
            }
        </ul>
    )
}

//12-21 link for logout
//15-18 <Link> component creates hyperlink for us. everytime clicked honey_user is removed from local storage and redirecting user to baseroute of application "/"
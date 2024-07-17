import { NavLink } from "react-router-dom"
import "./Footer.css"

export const Footer = () => {
    return <>

        <footer className="footer">
            <NavLink className="footer-NavLink" to="https://www.linkedin.com/in/sourav-roy-10e7" target="/blank">LinkedIn</NavLink>
        </footer>

    </>
}
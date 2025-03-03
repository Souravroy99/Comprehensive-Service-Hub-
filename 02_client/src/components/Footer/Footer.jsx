import { NavLink } from "react-router-dom"
import "./Footer.css"

export const Footer = () => {
    return <>

        <footer className="footer">
            <NavLink className="footer-NavLink" to="https://www.linkedin.com/in/sourav-roy-117447256/" target="/blank">LinkedIn</NavLink>
        </footer>

    </>
}
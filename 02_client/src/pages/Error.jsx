import { NavLink } from "react-router-dom"

export const Error = () => {
    return <>  
        <section id="error-page">
            <div className="content">
                <h2 className="header">404</h2>
                <h4>Sorry! Page is not found</h4>
                <p>
                    Oops! It seems like the page you are trying to access does not exists. If you believe there is an issue, feel free to report it, and we will look into it
                </p>
                <div className="btns">
                <button><NavLink to="/">Return Home</NavLink></button>
                
                <button><NavLink to="/contact">Report Problem</NavLink></button>
                </div>

            </div>
        </section>
    </>
}
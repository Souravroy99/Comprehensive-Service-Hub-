import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


const Login = () => {
    
    const [user, setUser] = useState({ 
        email: "",
        password: "",
    })  

    const handleInput = (event) => {
        let name = event.target.name ;
        let value = event.target.value ;
        
        setUser({
            ...user, 
            [name]: value,
        }) 
    }

    const navigator = useNavigate() ;

    const { storeTokenInLocalStorage, url } = useAuth() ;

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(user) ; 
 
        try{
            const response = await fetch('${url}/api/auth/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
            });

            if(response.ok) {
                const responseData = await response.json() ;

                toast.success(responseData.message)

              // Store the token in Local Host
                storeTokenInLocalStorage(responseData.token) ;

                setUser({ 
                    email: "",
                    password: "",
                })
 
                navigator("/") ;
            }
            else {
                const errorData = await response.json() ;
                toast.error(errorData.extraDetails ? errorData.extraDetails : errorData.message)
            }
        }
        catch(error){
            console.log(`Login.jsx Error: ${error}`) ;
        }
    }

    return <>
        <section className="section-register">
            <div className="container section-registration">
                <div className="grid grid-two-cols">

                    {/* Login Image */}
                    <div className="registration-image">
                        <img src="/images/login.png" alt="Login image" width="400" height="400"/>
                    </div>

                    {/* Login Form */}
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Login Form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="Enter your email" id="email" required autoComplete="off"
                                value={user.email} 
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password_" name="password" placeholder="Password" id="password" required autoComplete="off"
                                value={user.password} 
                                onChange={handleInput}
                                />
                            </div>

                            <br />

                            <button type="submit" className="btn reg-btn-submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default Login;
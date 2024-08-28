import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Register = () => {

    const [user, setUser] = useState({ 
        username: "",
        email: "",
        phone: "",
        password: "",
    });  


    const navigator = useNavigate() ;

    // Handling Input on form
    const handleInput = (event) => {
        console.log(event) ;
        const name = event.target.name ;
        const value = event.target.value ;
        
        // setUser({
        //     ...user, // Spread operator
        //     [name] : value ,  // [] <-- denotes that dynamically change of variable
        // });
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const { storeTokenInLocalStorage, url } = useAuth() ;

    // Handling form submission 
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user);
  
      try { 
        const response = await fetch(`${url}/api/auth/register`, {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(user),
        });
   
        if (response.ok) { 
            const responseData = await response.json();
            toast.success("Registration successfully done.");

            // Store the token in Local Host
            storeTokenInLocalStorage(responseData.token) ; 

            setUser({ 
                username: "",  
                email: "", 
                phone: "", 
                password: "",
            });      
    
            navigator('/') ;
        } 
        else {
            const errorData = await response.json();
            console.log("Error inside registration response: ", errorData);
            toast.error(errorData.extraDetails ? errorData.extraDetails : errorData.message);
        }
      } 
      catch (error) {
        console.error("Register Error: ", error);
      }
    };

    return <>
        <section className="section-register">
            <div className="container section-registration">
                <div className="grid grid-two-cols">

                    {/* Registration Image */}
                    <div className="registration-image">
                        <img src="/images/register.png" alt="Registration image" width="400" height="400"/>
                    </div>

                    {/* Registration Form */} 
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Registration Form</h1>
                        <br />
                        <div>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input 
                                type="text" 
                                name="username" 
                                placeholder="Sourav Roy" 
                                id="username" 
                                required 
                                autoComplete="off" 
                                value={user.username} 
                                onChange={handleInput} 
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                id="email" 
                                required 
                                autoComplete="off"
                                value={user.email} 
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input 
                                type="number" 
                                name="phone" 
                                placeholder="Enter Phone Number" 
                                id="phone" 
                                required 
                                autoComplete="off"
                                value={user.phone} 
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input 
                                type="password_" 
                                name="password" 
                                placeholder="Password" 
                                id="password" 
                                required 
                                autoComplete="off"
                                value={user.password} 
                                onChange={handleInput}
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn reg-btn-submit">Register Now</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default Register;
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Contact = () => {

    const [Contact, setContact] = useState({
        username: "",
        email: "",
        message:"", 
    })

    // Update username and email if the user LoggedIn
    const [userData, setUserData] = useState(true) ;

    const { user, token, isLoggedIn, url } = useAuth() ;

    if(userData && user){
        setContact({
            username: user.username,
            email: user.email,
            message: ""
        });

        setUserData(false) ; 
    }



    const handleInput = (e) => {
        console.log(e) ;

        const name = e.target.name ;
        const value = e.target.value ;

        // setContact({
        //     ...Contact ,
        //     [name]: value,
        // })
        // OR
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleSubmit = async(e) => {
        // console.log(e) ;
        e.preventDefault() ;
        
        try{
            const response = await fetch(`${url}/api/form/contact`, {
                method: "POST",
                headers: {'Content-Type': "application/json"},
                'body': JSON.stringify(Contact),
            });

            console.log("Contact.jsx Response : ", response) ;

            if(response.ok){
                setContact({
                    ...Contact, 
                    message: "",
                }); 

                console.log("TOKEN : " , token , " AND : ", isLoggedIn)
                
                const responseData = await response.json() ;

                toast.success(responseData.message)
            }
            else {
                const errorData = await response.json() ;
                toast.error(errorData.extraDetails ? errorData.extraDetails : errorData.message);

                console.log(`Connection error in Frontend part 'Contact form' response`) ;
            }
        }   
        catch(error){
            console.log(`Error in 'Contact form' from Frontend part`) ;
        }
    };

    return <>
        <section className="section-contact">
                <div>
                    <div className="container contact-content">
                        <h1 className="main-heading">Contact us</h1>
                    </div>

                    {/* Contact Page Main */}
                    <div className="container grid grid-two-cols">
                        <div className="contact-img">
                            <img src="/images/support.png" alt="Contact image" width="400" height="400"/>
                        </div>

                        {/* Contact Form */}
                        <section className="section-form">
                            <h1 className="main-heading mb-3">Contact Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" placeholder="Username" id="username" required autoComplete="off"  
                                    value={Contact.username} 
                                    onChange={handleInput} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" placeholder="Enter your email" id="email" required autoComplete="off" 
                                    value={Contact.email} 
                                    onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Message</label>
                                    <br />
                                    <textarea name="message" id="message" required cols="30" rows="7" autoComplete="off" placeholder="Write message for us..." value={Contact.message} onChange={handleInput}></textarea>
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-submit">Submit</button>
                                </div>

                            </form>

                        </section>

                    </div>
                </div>
        </section>
    </> 
};

export default Contact; 
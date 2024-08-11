import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";


const AdminUpdate = () => {

    const {id} = useParams();
    const { token, url } = useAuth();
    const navigator = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
    });

    console.log("ID : " , id) ;

    // Fetching initial information
    const fetchUser = async () => {
        try {
            const response = await fetch(`${url}/api/admin/users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
 
            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else {
                toast.error("Server issue!! data update is not possible");
            }
        } catch (error) {
            console.log(`Frontend Error At Admin-Update.jsx : ${error}`);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id, token]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Updating information
    const handleSubmit = async (eve) => {
        eve.preventDefault();  // Stops the refreshment

        try {
            const response = await fetch(`${url}/api/admin/users/update/${id}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json(); 

            if (response.ok) {
                setUser(data);
                toast.success("Updated successfully");
                navigator('/admin/users');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(`Frontend Error At Admin-Update.jsx : ${error}`);
        }
    };

    return (
    <section className="section-register">
        <div className="container section-registration">
            <div className="grid grid-two-cols">

                    {/* Update Image */}
                <div className="registration-image">
                    <img src="/images/webdev.png" alt="Registration image" width="400" height="400"/>
                </div>

                    {/* Update Form */} 
                <div className="registration-form">
                    <h1 className="main-heading mb-3">Update Form</h1>
                    <br />
                <div>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                required
                                value={user.username}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                required
                                value={user.email}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                required
                                value={user.phone}
                                onChange={handleInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="isAdmin">isAdmin</label>
                            <input
                                type="text"
                                name="isAdmin"
                                id="isAdmin"
                                autoComplete="off"
                                placeholder="Type 'true' or 'false'"
                                required
                                value={user.isAdmin}
                                onChange={handleInput}
                            />
                        </div>

                        <button type="submit" className="btn reg-btn-submit">Update</button>
                    </form>
                    </div>
                </div>                                
            </div>
        </div>
    </section>
    );
};

export default AdminUpdate; 
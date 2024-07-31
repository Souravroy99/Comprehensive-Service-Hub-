import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const AdminUpdate = () => {
    const { id } = useParams();
    const { token } = useAuth();

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
    });

    console.log("ID : " , id) ;

    // Fetching initial information
    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/admin/users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
 
            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else {
                toast.error("Update is not possible");
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
            const response = await fetch(`http://localhost:4000/api/admin/users/update/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            const data = await response.json(); 

            if (response.ok) {
                toast.success("Updated successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(`Frontend Error At Admin-Update.jsx : ${error}`);
        }
    };

    return (
        <div className="container grid grid-two-cols">
            <h1>User Data</h1>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default AdminUpdate;

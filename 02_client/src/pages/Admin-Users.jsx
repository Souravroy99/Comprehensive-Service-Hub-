import { useEffect, useState } from "react" ;
import { useAuth } from "../store/auth" ;
import { toast } from 'react-toastify' ;
import { Link, useNavigate } from 'react-router-dom';


export const AdminUsers = () => { 

    const [users, setUsers] = useState([]) ; 
    const { token, url } = useAuth() ;
    const navigate = useNavigate() ;

    const getAllUsersData = async() => {
        console.log(token) ;

        try{
            const response = await fetch(`${url}/api/admin/users`, {
                method: 'GET',
                headers: {Authorization: `Bearer ${token}`}
            });

            const data = await response.json() ;
            console.log("Admin-Users.jsx",data) ;
            
            if(response.ok) {
                setUsers(data) ;
            } 
            else{
                toast.warning(data.message) ;
                navigate('/');
            }
        }
        catch(error){
            console.log(`Admin Users frontend error : ${error}`) ;
        }
    }

    useEffect(() => {
        getAllUsersData() ;
    }, []);


  //*************** Delete User ***************//
    
    const deleteUser = async(id) => {
        try{
            const response = await fetch(`${url}/api/admin/users/delete/${id}`, {
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json() ;
             
            if(response.ok) {
                alert(`Deleted user token: ${data.token} \nyour token : ${token}`) ;

                toast.success("User successfully deleted") ;
                getAllUsersData() ;  // After using this we do not need to reload the page
            }
            else {
                toast.warning("Failed to delete the user!!") ;
                navigate('/');
            }
        }
        catch(error){
            console.log(`Admin Users frontend error : ${error}`) ;
        }
    }



    return (<>
        <section>
            <div className="container">
                <h1 className="main-heading">Admin Users Data</h1>
            </div>
 
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr className="table-row users-table-tr">
                            <th className="No">No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Admin</th>

                            <th>Update</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((curr, index) => { 
                        return (
                            <tr key={index} className="users-table-tr">
                                <td className="index">{index+1}</td>
                                <td><div className="username">{curr.username}</div></td>
                                <td><div className="email">{curr.email}</div></td>
                                <td><div className="phone">{curr.phone}</div></td>
                                <td><div className="isAdmin">{curr.isAdmin === true ? "YES" : "NO"}</div></td>

                                <td><div className="edit"><button><Link to={`${curr._id}/edit`} >Edit</Link></button></div></td>
                                <td><div className="delete"><button onClick={() => deleteUser(curr._id)}> Delete </button></div></td>
                            </tr> 
                        )
                        })
                    }
                    </tbody>
                </table>

            </div>
        </section>
    </>)
}

export default AdminUsers;
import { useEffect, useState } from "react"
import {useAuth} from "../store/auth"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

export const AdminContacts = () => {

    const [contacts, setContacts] = useState([]) ;
    const {token, url} = useAuth() ;
    const navigate = useNavigate() ;


    const getAllContacts = async() => {
        try{
            const response = await fetch(`${url}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
 
            const ContactData = await response.json() ;

            console.log("Admin-Contacts.jsx Data : ", ContactData) ;

            if(response.ok){
                setContacts(ContactData) ;
            }
            else{
                toast.warning(ContactData.message) ;
                navigate('/');
            }
        }
        catch(error){
            console.log(`Admin Contacts frontend error : ${error}`) ;
        }
    }

    useEffect(() => {
        getAllContacts() ;
    }, []) ;


    const deleteUser = async(id) => {
        try{
            const response = await fetch(`${url}/api/admin/contacts/delete/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const data = await response.json() ;

            if(response.ok) {
                toast.success(data.message) ; 
                getAllContacts() ;
            }
            else {
                toast.warning(data.message) ;
                navigate('/');
            }
        }
        catch(error){
            console.log(`Admin-Contacts.jsx DELETE Contact Error : ${error}`) ;
        }
    }

    return (<>
        <section>
            <div className="container">
                <h1 className="main-heading">Contacts Data</h1>
            </div>

            <div >
                <div className="container ">
                    <table>
                        <thead>
                            <tr className="table-row contacts-table-tr">
                                <th className="No">No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            contacts.map((curr, index) => { 
                            return (
                                <tr key={index} className="contacts-table-tr">
                                    <td className="index">{index+1}</td>
                                    <td><div className="username">{curr.username}</div></td>
                                    <td><div className="email">{curr.email}</div></td>
                                    <td><div className="message">{curr.message}</div></td>
                                    <td><div className="delete"><button onClick={() => deleteUser(curr._id)}> Delete </button></div></td>

                                </tr> 
                            )
                            })
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        </section>
    </>)
}  
// Outlet --> When we use nested loop then for showing the child routes we need to use 'Outlet'.
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {FaUser , FaRegListAlt , FaHome} from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';


const AdminLayout = () => {

    const { user, isLoading, isLoggedIn } = useAuth() 
    const navigate = useNavigate()

    if(isLoading === true) {
        return <h1>Loading...</h1>
    }
    else {

        console.log("Admin-Layout : ", user)
        
        if(isLoggedIn === false) {
            toast.warning('Login First') ;
            navigate('/login')
            return ;
        }

        if(user.isAdmin === false) {
            toast.warning('User is not an admin') ;
            console.log("If user is not an admin then, user is unable to visit Admin Panel")
            navigate('/')
            return ;
        }
    }
    

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li> <NavLink to='/admin/users'> <FaUser/> Users </NavLink> </li>
                            <li> <NavLink to='/admin/contacts'> <FaMessage/> Contacts </NavLink> </li>
                            <li> <NavLink to='/service'> <FaRegListAlt/> Services </NavLink> </li>
                            <li> <NavLink to='/'> <FaHome/> Home </NavLink> </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Outlet/>

        </>
    )
}

export default AdminLayout ;
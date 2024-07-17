import { useAuth } from "../store/auth";

const Service = () => {

    const { services } = useAuth() ; 
    
    return ( 
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="card-container">

            {
                services.map((currEle, index) => {

                    const {price, provider, service, description, image} = currEle ;

                    return (
                        <div className="card" key={index}>
                        
                            <div className="card-img">
                                <img src={ image } alt="Services Image" width="240px" />
                            </div>

                            <div className="card-details">
                                <div className="grid grid-two-cols card-dist"> 
                                    <p>{ provider }</p>
                                    <p>{ price }</p>
                                </div>
                                <div className="card-others">
                                    <h2>{ service }</h2>
                                    <p>{ description }</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
                
            </div>
        </section> 
    )
};

export default Service; 
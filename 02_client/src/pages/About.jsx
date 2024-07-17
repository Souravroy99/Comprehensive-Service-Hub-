import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {

    const { user } = useAuth() ;
    const isUserExists = !!user ;

    return (<>
        <section className="section-hero">
            <div className="container grid grid-two-cols">
                <div className="hero-content">
                
                {
                    isUserExists 
                    ? (<p style={{color:'red'}}>Hi, {user.username}</p>)
                    : (<p>Hello Everyone</p>)
                }
                    <h1>Why Choose Us?</h1>
            
                    <p>Lorem ipsum dolor sit amet consectetur adipindis provident facilis iusto. Lorem ipsum dolor sit amet consectetur, adipisndis provident facilis iusto. Lorem ipsum dolor sit amet consectetur, adipisusto.</p>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exiendis provident facilis iusto. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet blanditiis illum quia ut harum a similique officiis velit exercitationem qui.</p>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisndis provident facilis iusto. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita similique eum ex quod laborum voluptatibus? Facere reiciendis provident facilis iusto.</p>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedndis provident facilis iusto. Lorem ipsum dolor sit amet consectetur, adipisita similique eum ex quod laborum voluptatibus? Facere reiciendis provident facilis iusto.</p>

                        <br />
                    <div className="btn btn-group">
                        <a href="/contact">
                        <button className="btn">connect now</button>
                        </a>
                        <a href="/services">
                        <button className="btn secondary-btn">learn more</button>
                        </a>
                    </div>
                </div>

                <div>
                    <img src="/images/about.png" alt="About Image Error!" width="400" height="500"/>
                </div>
            </div>
            <Analytics/>
        </section>

    </>
    )
}; 
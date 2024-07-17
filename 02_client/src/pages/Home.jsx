import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";

const Home = () => {
    return <>
        
        {/* 1st section  */}

        <section className="section-hero">
            <div className="container grid grid-two-cols">
                <div className="hero-content">
                    <p>Hello everyone, I hope you all are doing extremly well.</p>
                    <h1>Welcome to my website</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illo incidunt voluptate reiciendis omnis sed modi nihil atque rerum dicta eos magnam error officiis cumque, praesentium molestias itaque. Est, quos?
                    </p>

                    <div className="btn btn-group">
                        <NavLink to="/contact"><button className="btn ">Connect Now</button></NavLink>
                        <NavLink to="/service"><button className="btn secondary-btn">Learn More</button></NavLink>

                    </div>
                </div>

                <div className="hero-image">
                    <img src="/images/home.png" alt="Hero Image at Home page"/>
                </div>
            </div>
        </section>


        {/* 2nd section  */}

            <Analytics/>

        {/* 3rd section  */} 

        <section className="section-hero">
        <div className="container grid grid-two-cols">
            {/* hero images  */}
            <div className="hero-image">
            <img
                src="/images/design.png"
                alt="coding together"
                width="400"
                height="500"
            />
            </div>

            <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
                Ready to take the first step towards a more efficient and secure
                IT infrastructure? Contact us today for a free consultation and
                lets discuss how we can help your business thrive in
                the digital age.
            </p>
            <div className="btn btn-group">
                <a href="/contact">
                <button className="btn">connect now</button>
                </a>
                <a href="/services">
                <button className="btn secondary-btn">learn more</button>
                </a>
            </div>
            </div>
        </div>
        </section>
</>

};

export default Home;
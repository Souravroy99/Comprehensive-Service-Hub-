import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {

    const { isLoggedIn, user } = useAuth() ;
    

    return (<>
        <section className="section-hero">
            <div className="container grid grid-two-cols">
                <div className="hero-content">
                
                {
                    isLoggedIn 
                    ? (<p style={{color:'red'}}>Hi, {user.username}</p>)
                    : (<p>Hey Champ!</p>)
                }
                    <h1>Why Choose Us?</h1>
            
                    <p>In today’s digital age, the convenience and flexibility offered by online business teaching platforms are unparalleled. Our platform provides a comprehensive and accessible learning experience, allowing you to acquire essential business skills from anywhere in the world. Whether you're a busy professional looking to enhance your expertise or an aspiring entrepreneur seeking foundational knowledge, our online courses are designed to fit seamlessly into your schedule. The ability to learn at your own pace and revisit materials as needed ensures that you can grasp complex business concepts thoroughly and effectively.</p>
                    {/* <br /> */}
                    <p>Our online business teaching platform is built on a foundation of expert instructors and up-to-date content that reflects the latest industry trends and practices. Our courses are curated by experienced professionals who bring real-world insights and practical knowledge to the table, offering you valuable perspectives that go beyond theoretical learning.</p>
                    {/* <br /> */}
                    <p>Additionally, choosing our platform means gaining access to a supportive community and a wealth of resources that can help accelerate your professional growth. Our forums, networking opportunities, and personalized feedback provide a collaborative environment where you can connect with peers and mentors, exchange ideas, and seek guidance. The robust support system we offer ensures that you are never alone on your learning journey, making it easier to stay motivated and achieve your business education goals.</p>
                    {/* <br /> */}
                    <p>The structured curriculum and interactive elements, such as quizzes and case studies, are designed to engage you actively and enhance your understanding, making the learning process both informative and enjoyable.</p>

                        {/* <br /> */}
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
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'

const Landing = () => {
    return (
        <main>
            <nav>
                <img src={logo} alt ='WorkWise' classname='logo'/>
            </nav>
            <div className='container page'>
                {/* information */}
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                    WorkWise is a user-friendly web app designed to help job seekers easily track their job applications.
                    With WorkWise, users can their applications, set reminders for follow-ups, and identify which areas their can improve in for interviews.<br/>
                    <br/>
                    By keeping all your job search information in one place, WorkWise empowers job seekers to stay organised and focused on landing your dream job.
                    </p>
                    <button className='btn btn-hero'>
                        Login/Register
                    </button>
                </div>
                <img src={main} alt='application logging' className='img main-img'/>
            </div>
        </main>
    )
}

export default Landing

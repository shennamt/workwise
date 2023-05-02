import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <img src={logo} alt ='workwise' classname='logo'/>
            </nav>
            <div className='container page'>
                {/* information */}
                <div className='info'>
                    <h1>
                        <span> WorkWise </span>
                    </h1>

                    <h4>
                        The preferred job tracking app
                    </h4>
                    
                    <p>
                    Designed to help job seekers easily track their job applications.
                    Keep a log of your applications, set reminders for follow-ups, and identify potential areas for improvement.<br/>
                    <br/>
                    By keeping all your job search information in one place, WorkWise empowers you to stay organised and focused on landing your dream job.
                    </p>

                    <button className='btn btn-hero'>
                        Login/Register
                    </button>
                </div>

                <img src={main} alt='application logging' className='img main-img'/>
                {/* PS: img is main class and the other class is for styling on smaller media */}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    nav {
        width: var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-item: center;
    }

    .page {
        min-height: calc(100vh - var(--nav-height));
        display: grid;
        align-items: center;
        margin-top: -3rem;
    }

    h1 {
        font-weight: 700;
        span {
            color: var(--primary-500);
        }
    }

    p {
        color: var(--grey-600);
    }

    .main-img {
        display: none;
    }

    @media (min-width: 990px){
        .page {
            grid-template-columns: 1fr 1fr;
            column-gap: 3rem;
        }

        .main-img{
            display: block;
        }
    }
`
// Unique class from styled components should help reduce possible clashing.

export default Landing

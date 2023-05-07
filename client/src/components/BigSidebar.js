import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import { useAppContext } from '../context/appContext'

const BigSidebar = () => {
    // pass toggle sidebar in navlinks if it's annoying. let's see how
    const { showSidebar } = useAppContext()

    return (
        <Wrapper>
            {/* since show sidebar will be false by default, display it on false */}
            <div className={showSidebar? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className='content'>
                    <h3><span>WorkWise</span></h3>
                    <NavLinks/>
                </div>
            </div>
        </Wrapper>
    )
}
// import use app, wrapper, navlinks
// use showsidebar from context
// show side bar based on css toggle boolian
// consten to be logo and navlinks

export default BigSidebar

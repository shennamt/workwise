import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import links from '../utils/links'
import { useAppContext } from '../context/appContext'
import { NavLink } from 'react-router-dom'

const SmallSidebar = () => {

    const { showSidebar, toggleSidebar } = useAppContext()

    return (
        <Wrapper>
            <div className={ showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className='content'>
                    <button type='button' className='close-btn' onClick={() => {console.log('toggling sidebar')}}>
                        <FaTimes />
                    </button>
                    <h3><span>WorkWise</span></h3>
                    <div className='nav-links'>nav links</div>
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar

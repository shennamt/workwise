import { Link } from 'react-router-dom'
import { FaUserAlt, FaLocationArrow } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useAppContext } from '../context/appContext'
import JobInfo from './JobInfo'
import Wrapper from '../assets/wrappers/WorkwiseUser'

const WorkwiseUser = ({ _id, name, email, location }) => {
	const { deleteUser } = useAppContext()
	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{name.charAt(0)}</div>
				<div className='info'>
					<h5>{name}</h5>
					<p>{email}</p>
				</div>
			</header>
		</Wrapper>
	)
}

export default WorkwiseUser

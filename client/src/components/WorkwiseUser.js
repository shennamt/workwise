import { useAppContext } from '../context/appContext'
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
				<footer>
					<div className='actions'>
						<button
							type='button'
							className='btn delete-btn'
							onClick={deleteUser(_id)}
						>
							Delete
						</button>
					</div>
				</footer>
			</header>
		</Wrapper>
	)
}

export default WorkwiseUser

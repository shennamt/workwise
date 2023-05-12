import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import WorkwiseUser from './WorkwiseUser'
import Wrapper from '../assets/wrappers/AdminUsersContainer'

const AdminUsersContainer = () => {
	const { getUsers, users, isLoading, page, totalUsers } = useAppContext()

	return (
		<Wrapper>
			<h5>
				{totalUsers} User{users.length > 1 && 's'} found
			</h5>
			<div className='users'>
				{users.map((user) => {
					return <WorkwiseUser key={user._id} {...user} />
				})}
			</div>
		</Wrapper>
	)
}

export default AdminUsersContainer

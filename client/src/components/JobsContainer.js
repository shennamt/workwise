import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
	const {
		getJobs,
		jobs,
		isLoading,
		page,
		totalJobs,
		search,
		searchStatus,
		searchType,
		searchStyle,
		sort,
	} = useAppContext()

	useEffect(() => {
		getJobs()
		// eslint-disable-next-line
	}, [search, searchStatus, searchType, searchStyle, sort])

	if (isLoading) {
		return <Loading center />
	}

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h5>No jobs to display yet...</h5>
			</Wrapper>
		)
	}
	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />
				})}
				{/* dont forget pagination */}
			</div>
		</Wrapper>
	)
}

export default JobsContainer

import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
    const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext()
    useEffect(() => {
        getJobs()
    }, [])
    if (isLoading) {
        return <Loading center/>
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h3>No jobs to display yet, create one in the Navigation Bar!</h3>
            </Wrapper>
        )
    }
    return (
        <div>
        </div>
    )
}

export default JobsContainer

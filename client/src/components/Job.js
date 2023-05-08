import moment from 'moment'
import { Link } from 'react-router-dom'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import JobInfo from './JobInfo'
import Wrapper from '../assets/wrappers/Job'

const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    jobStyle,
    createdAt,
    status,
    notes,
}) => {
    const { setEditJob, deleteJob } = useAppContext()
    let date = moment(createdAt)
    date = date.format('Do MMM, YYYY')
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{ company.charAt(0) }</div>
                <div className='info'>
                    <h4>{ position }</h4>
                    <p>{ company }</p>
                </div>

            </header>
        </Wrapper>
    )
}

export default Job

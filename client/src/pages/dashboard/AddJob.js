import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
    const {
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobInfo,
        jobLocation,
        jobType,
        jobTypeOptions,
        jobStyle,
        jobStyleOptions,
        status,
        statusOptions,
    } = useAppContext()

    const handleSubmit = e => {
        e.preventDefault()
        if (!position || !company || !jobLocation){
            displayAlert()
            return
        }
        console.log('create job')
    }

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        console.log(`${name}: ${value}`)
    }

    return (
        <Wrapper>
            <form className='form'>
                <h3>{ isEditing ? 'edit job' : 'add job' }</h3>
                { showAlert && <Alert /> }
                <div className='form-center'>
                    <FormRow type='text' name='position' value={position} handleChange={handleJobInput} />
                    <FormRow type='text' name='company' value={company} handleChange={handleJobInput} />
                    <FormRow type='text' labelText='Job Info' name='jobInfo' value={jobInfo} handleChange={handleJobInput} />
                    <FormRow type='text' labelText='Job Location' name='jobLocation' value={jobLocation} handleChange={handleJobInput} />
                    {/* jobtype */}
                    {/* job style */}
                    {/* job status */}
                    <div className='btn-container'>
                        <button type='submit' className='btn btn-block submit-btn'>submit</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}
// import formRow, alert, useAppContext, wrapper
// pass in showAlert, displayAlert, position,etc etc
// do a handleSubmit
// handle job input
// then in the return, do the form rows
// use isEditing to toggle between edit and add job ya
// submit button... maybe a clear button too


export default AddJob

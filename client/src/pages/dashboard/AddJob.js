import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
    const {
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        notes,
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
                    <FormRow type='text' labelText='Job Location' name='jobLocation' value={jobLocation} handleChange={handleJobInput} />
                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                    <FormRowSelect
                        name='jobType'
                        labelText='Job Type'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    <FormRowSelect
                        name='jobStyle'
                        labelText='Job Style'
                        value={jobStyle}
                        handleChange={handleJobInput}
                        list={jobStyleOptions}
                    />
                    <FormRow type='text' name='notes' value={notes} handleChange={handleJobInput} />
                    <div className='btn-container'>
                        <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit}>submit</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob

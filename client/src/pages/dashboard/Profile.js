import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'

const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [location, setLocation] = useState(user?.location)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("update user")
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h3>Profile here</h3>
            {showAlert && <Alert />}
            <div className='form-center'>
                <FormRow
                    type='text'
                    name='name'
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                />
            </div>
        </form>
    )
}

export default Profile

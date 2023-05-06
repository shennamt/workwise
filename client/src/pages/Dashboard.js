import { useEffect } from 'react'

const Dashboard = () => {
    const fetchData = async () => {
        try {
            // if not fetching from correct server, wil get cors prob cos not permitted loading resources
            // like if i made a stupid data.json file and replaced that in the fetch, it would work.
            // const response = await fetch('/data.json')
            const response = await fetch('/api/v1')
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <h1>Dashboard</h1>
    )
}

export default Dashboard

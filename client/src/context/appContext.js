import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	DELETE_JOB_BEGIN,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
	GET_USERS_BEGIN,
	GET_USERS_SUCCESS,
} from './actions'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || '',
	showSidebar: false,
	isEditing: false,
	editJobId: '',
	company: '',
	position: '',
	jobLocation: userLocation || '',
	jobTypeOptions: ['full-time', 'part-time', 'internship', 'contract'],
	jobType: 'full-time',
	jobStyleOptions: ['remote', 'hybrid', 'on-site'],
	jobStyle: 'on-site',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	notes: '',
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	searchStyle: 'all',
	sort: 'Most Recently Created',
	sortOptions: [
		'Recently Created',
		'Recently Updated',
		'Least Recent',
		'A - Z',
		'Z - A',
	],
	users: [],
	totalUsers: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const authFetch = axios.create({
		baseURL: '/api/v1',
	})

	authFetch.interceptors.request.use(
		(config) => {
			config.headers['Authorization'] = `Bearer ${state.token}`
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	authFetch.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			if (error.response.status === 401) {
				logoutUser()
			}
			return Promise.reject(error)
		}
	)

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 3000)
	}

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', token)
		localStorage.setItem('location', location)
	}

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
		localStorage.removeItem('location')
	}

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const { data } = await axios.post(
				`/api/v1/auth/${endPoint}`,
				currentUser
			)
			const { user, token, location } = data
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, token, location, alertText },
			})
			addUserToLocalStorage({ user, token, location })
		} catch (error) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR })
	}

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER })
		removeUserFromLocalStorage()
		window.location.href = '/landing'
	}

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const { data } = await authFetch.patch(
				'/auth/updateUser',
				currentUser
			)
			const { user, location, token } = data

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			})
			addUserToLocalStorage({ user, location, token })
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				})
			}
		}
		clearAlert()
	}

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
	}

	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES })
	}

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN })
		try {
			const {
				position,
				company,
				jobLocation,
				jobType,
				jobStyle,
				status,
				notes,
			} = state
			await authFetch.post('/jobs', {
				position,
				company,
				jobLocation,
				jobType,
				jobStyle,
				status,
				notes,
			})
			dispatch({ type: CREATE_JOB_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const getJobs = async () => {
		const { search, searchStatus, searchType, searchStyle, sort, page } =
			state

		let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&jobStyle=${searchStyle}&sort=${sort}`
		if (search) {
			url = url + `&search=${search}`
		}
		dispatch({ type: GET_JOBS_BEGIN })
		try {
			const { data } = await authFetch(url)
			const { jobs, totalJobs, numOfPages } = data
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: {
					jobs,
					totalJobs,
					numOfPages,
				},
			})
		} catch (error) {
			logoutUser()
		}
		clearAlert()
	}

	const setEditJob = (id) => {
		dispatch({ type: SET_EDIT_JOB, payload: { id } })
	}

	const editJob = async () => {
		dispatch({ type: EDIT_JOB_BEGIN })
		try {
			const {
				position,
				company,
				jobLocation,
				jobType,
				jobStyle,
				status,
				notes,
			} = state
			await authFetch.patch(`/jobs/${state.editJobId}`, {
				position,
				company,
				jobLocation,
				jobType,
				jobStyle,
				status,
				notes,
			})
			dispatch({ type: EDIT_JOB_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({
				type: EDIT_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const deleteJob = async (jobId) => {
		dispatch({ type: DELETE_JOB_BEGIN })
		try {
			await authFetch.delete(`/jobs/${jobId}`)
			getJobs()
		} catch (error) {
			logoutUser()
		}
	}

	const showStats = async () => {
		dispatch({ type: SHOW_STATS_BEGIN })
		try {
			const { data } = await authFetch('/jobs/stats')
			dispatch({
				type: SHOW_STATS_SUCCESS,
				payload: {
					stats: data.defaultStats,
					monthlyApplications: data.monthlyApplications,
				},
			})
		} catch (error) {
			logoutUser()
		}
		clearAlert()
	}

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS })
	}

	const changePage = (page) => {
		dispatch({ type: CHANGE_PAGE, payload: { page } })
	}

	const getUsers = async () => {
		let url = `/admin`
		dispatch({ type: GET_USERS_BEGIN })
		try {
			const { data } = await authFetch(url)
			const { users, totalUsers, numOfPages } = data
			dispatch({
				type: GET_USERS_SUCCESS,
				payload: {
					users,
					totalUsers,
					numOfPages,
				},
			})
		} catch (error) {
			console.log(error.response)
		}
		clearAlert()
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				deleteJob,
				editJob,
				showStats,
				clearFilters,
				changePage,
				getUsers,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

// without this custom hook, in every component i would need to
// import useContext and set up appContext to access the value props.
const useAppContext = () => {
	return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

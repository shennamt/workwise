import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Landing, Register, ProtectedRoute } from './pages'
import {
	AddJob,
	AllJobs,
	Profile,
	SharedLayout,
	Stats,
	AllUsers,
} from './pages/dashboard'
import { useAppContext } from './context/appContext'

function App() {
	const { user } = useAppContext()
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					{user && (
						<>
							{user.isAdmin ? (
								<Route index element={<AllUsers />} />
							) : (
								<>
									<Route index element={<Stats />} />
									<Route
										path='all-jobs'
										element={<AllJobs />}
									/>
									<Route
										path='add-job'
										element={<AddJob />}
									/>
									<Route
										path='profile'
										element={<Profile />}
									/>
								</>
							)}
						</>
					)}
					{/* <Route index element={<Stats />} />
					<Route path='all-jobs' element={<AllJobs />} />
					<Route path='add-job' element={<AddJob />} />
					<Route path='profile' element={<Profile />} />
					<Route path='admin' element={<AllUsers />} /> */}
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

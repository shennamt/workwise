import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
	const {
		isLoading,
		search,
		searchStatus,
		statusOptions,
		searchType,
		jobTypeOptions,
		searchStyle,
		jobStyleOptions,
		sort,
		sortOptions,
		handleChange,
		clearFilters,
	} = useAppContext()

	// if user sending a req, user wont be able to type something new. so use isLoading
	const handleSearch = (e) => {
		if (isLoading) return
		handleChange({ name: e.target.name, value: e.target.value })
	}

	return (
		<Wrapper>
			<form className='form'>
				<h4>Search</h4>
				<div className='form-center'>
					<FormRow
						type='text'
						name='search'
						value={search}
						handleChange={handleSearch}
					/>
				</div>
			</form>
		</Wrapper>
	)
}

export default SearchContainer

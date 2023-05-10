import { useAppContext } from '../context/appContext'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageBtnContainer = () => {
	const { numOfPages, page } = useAppContext()

	const nextPage = () => {
		console.log('next page')
	}
	const prevPage = () => {
		console.log('prev page')
	}

	return (
		<Wrapper>
			<button className='prev-btn' onClick={prevPage}>
				<BsChevronLeft />
				Prev
			</button>
			<div className='btn-container'>buttons here</div>
			<button className='next-btn' onClick={nextPage}>
				Next
				<BsChevronRight />
			</button>
		</Wrapper>
	)
}

export default PageBtnContainer

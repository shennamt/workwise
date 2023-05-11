import { useAppContext } from '../context/appContext'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageBtnContainer = () => {
	const { numOfPages, page, changePage } = useAppContext()
	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1
	})

	const nextPage = () => {
		let newPage = page + 1
		if (newPage > numOfPages) {
			newPage = 1
		}
		changePage(newPage)
	}

	const prevPage = () => {
		let newPage = page - 1
		if (newPage < numOfPages) {
			newPage = numOfPages
		}
		changePage(newPage)
	}

	return (
		<Wrapper>
			<button className='prev-btn' onClick={prevPage}>
				<BsChevronLeft />
				Prev
			</button>
			<div className='btn-container'>
				{pages.map((pageNumber) => {
					return (
						<button
							type='button'
							className={
								pageNumber === page
									? 'pageBtn active'
									: 'pageBtn'
							}
							key={pageNumber}
							onClick={() => changePage(pageNumber)}
						>
							{pageNumber}
						</button>
					)
				})}
			</div>
			<button className='next-btn' onClick={nextPage}>
				Next
				<BsChevronRight />
			</button>
		</Wrapper>
	)
}

export default PageBtnContainer

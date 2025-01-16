// import React, { useState, useEffect } from "react"
// import BookCard from "./BookCard"
// import "./BookList.css"
// import ISBNScanner from "./ISBNScanner"

// const BookList = () => {
// 	const [books, setBooks] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)
// 	const [category, setCategory] = useState("programming")
// 	const [maxResults, setMaxResults] = useState(10)

// 	const categories = [
// 		"arts",
// 		"biography",
// 		"business",
// 		"children",
// 		"computers",
// 		"cooking",
// 		"health",
// 		"history",
// 		"literature",
// 		"medical",
// 		"music",
// 		"philosophy",
// 		"poetry",
// 		"psychology",
// 		"religion",
// 		"science",
// 		"self-help",
// 		"social-science",
// 		"sports",
// 		"travel",
// 	]

// 	useEffect(() => {
// 		const fetchBooks = async () => {
// 			try {
// 				const response = await fetch(
// 					`http://localhost:5000/books?category=${category}&maxResults=${maxResults}`
// 				)
// 				const data = await response.json()
// 				setBooks(data)
// 				setLoading(false)
// 			} catch (error) {
// 				setError("Failed to fetch books")
// 				setLoading(false)
// 			}
// 		}

// 		fetchBooks()
// 	}, [category, maxResults])

// 	const handleCategoryChange = (e) => {
// 		setCategory(e.target.value)
// 	}

// 	const handleMaxResultsChange = (e) => {
// 		setMaxResults(e.target.value)
// 	}

// 	if (loading) return <div>Loading...</div>
// 	if (error) return <div>{error}</div>

// 	return (
// 		<div className='book-list'>
// 			<select
// 				className='form-select form-select-sm mb-3'
// 				value={category}
// 				onChange={handleCategoryChange}
// 			>
// 				{categories.map((cat) => (
// 					<option key={cat} value={cat}>
// 						{cat.charAt(0).toUpperCase() + cat.slice(1)}
// 					</option>
// 				))}
// 			</select>
// 			<select
// 				className='form-select form-select-sm mb-3'
// 				value={maxResults}
// 				onChange={handleMaxResultsChange}
// 			>
// 				<option value='5'>5</option>
// 				<option value='10'>10</option>
// 				<option value='15'>15</option>
// 			</select>

// 			{books.map((book, index) => (
// 				<BookCard key={index} book={book} />
// 			))}
// 		</div>
// 	)
// }

// export default BookList

import React, { useState, useEffect } from "react"
import BookCard from "./BookCard"
import "./BookList.css"
import ISBNScanner from "./IsbnScanner"

const BookList = () => {
	const [books, setBooks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [category, setCategory] = useState("programming")
	const [maxResults, setMaxResults] = useState(10)

	const categories = [
		"arts",
		"biography",
		"business",
		"children",
		"computers",
		"cooking",
		"health",
		"history",
		"literature",
		"medical",
		"music",
		"philosophy",
		"poetry",
		"psychology",
		"religion",
		"science",
		"self-help",
		"social-science",
		"sports",
		"travel",
	]

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/books?category=${category}&maxResults=${maxResults}`
				)
				const data = await response.json()
				setBooks(data)
				setLoading(false)
			} catch (error) {
				setError("Failed to fetch books")
				setLoading(false)
			}
		}

		fetchBooks()
	}, [category, maxResults])

	const handleCategoryChange = (e) => {
		setCategory(e.target.value)
	}

	const handleMaxResultsChange = (e) => {
		setMaxResults(e.target.value)
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	return (
		<div className='book-list'>
			<div className='mb-3'>
				<select
					className='form-select form-select-sm mb-3'
					value={category}
					onChange={handleCategoryChange}
				>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat.charAt(0).toUpperCase() + cat.slice(1)}
						</option>
					))}
				</select>
			</div>
			<div className='mb-3'>
				<select
					className='form-select form-select-sm mb-3'
					value={maxResults}
					onChange={handleMaxResultsChange}
				>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='15'>15</option>
				</select>
			</div>

			<div className='book-list-container'>
				{books.map((book, index) => (
					<BookCard key={index} book={book} />
				))}
			</div>
		</div>
	)
}

export default BookList

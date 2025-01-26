import React, { useState } from "react"
import BookList from "./components/BookList"
import "./App.css"
import { Container, Row, Col, Button } from "react-bootstrap"
import IsbnScanner from "./components/IsbnScanner.js"

const App = () => {
	const [showIsbnScanner, setShowIsbnScanner] = useState(false)

	const handleToggleScanner = () => {
		setShowIsbnScanner((prevState) => !prevState)
	}

	return (
		<Container fluid className='mt-3'>
			<header className='mb-3'>
				<Col>
					<h1 className='text-center'>Discover Your Next Favorite Book!</h1>
				</Col>
			</header>

			<Row className='mb-3'>
				<Col className='text-center'>
					<Button className='custom-btn' onClick={handleToggleScanner}>
						{showIsbnScanner ? "Hide ISBN Search" : "Search by ISBN"}
					</Button>
				</Col>
			</Row>

			{showIsbnScanner && (
				<Row className='mb-3'>
					<Col xs={12} md={6}>
						<IsbnScanner />
					</Col>
				</Row>
			)}

			<Row className='mt-3'>
				<Col xs={12}>
					<BookList />
				</Col>
			</Row>
		</Container>
	)
}

export default App

// import React, { useState } from "react"
// import axios from "axios"
// import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap"

// function BookSearch() {
// 	const [isbn, setIsbn] = useState("")
// 	const [book, setBook] = useState(null)
// 	const [error, setError] = useState(null)

// 	const handleSearch = async () => {
// 		try {
// 			const response = await axios.get(
// 				`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
// 			)
// 			if (response.data.items) {
// 				setBook(response.data.items[0].volumeInfo)
// 				setError(null) // Clear any previous errors
// 			} else {
// 				setError("No book found!")
// 			}
// 		} catch (error) {
// 			console.error("Error fetching book data:", error)
// 			setError("Failed to show book data")
// 		}
// 	}

// 	return (
// 		<Container>
// 			<Row className='my-4'>
// 				<Col md={6} className='mx-auto'>
// 					<h2>Search for a Book</h2>
// 					<Form>
// 						<Form.Group controlId='isbnInput'>
// 							<Form.Label>Enter ISBN</Form.Label>
// 							<Form.Control
// 								type='text'
// 								value={isbn}
// 								onChange={(e) => setIsbn(e.target.value)}
// 								placeholder='Enter ISBN'
// 							/>
// 						</Form.Group>
// 						<Button variant='primary' onClick={handleSearch}>
// 							Search
// 						</Button>
// 					</Form>
// 				</Col>
// 			</Row>

// 			{error && (
// 				<Row className='my-4'>
// 					<Col>
// 						<Alert variant='danger'>{error}</Alert>
// 					</Col>
// 				</Row>
// 			)}

// 			{book && (
// 				<Row className='my-4'>
// 					<Col md={8} className='mx-auto'>
// 						<Card>
// 							<Card.Body>
// 								<Card.Title>{book.title}</Card.Title>
// 								<Card.Text>
// 									<strong>Author(s):</strong> {book.authors?.join(", ")}
// 								</Card.Text>
// 								<Card.Text>
// 									{/* <strong>Publisher:</strong> {book.publisher}
// 								</Card.Text>
// 								<Card.Text>
// 									<strong>Published Date:</strong> {book.publishedDate}
// 								</Card.Text>
// 								<Card.Text> */}
// 									<strong>Description:</strong> {book.description}
// 								</Card.Text>
// 								{book.imageLinks && (
// 									<Card.Img
// 										variant='top'
// 										src={book.imageLinks.thumbnail}
// 										alt={book.title}
// 									/>
// 								)}
// 							</Card.Body>
// 						</Card>
// 					</Col>
// 				</Row>
// 			)}
// 		</Container>
// 	)
// }

// export default BookSearch

import React, { useState } from "react"
import axios from "axios"
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap"

const IsbnScanner = () => {
	const [isbn, setIsbn] = useState("")
	const [book, setBook] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleIsbnChange = (event) => {
		setIsbn(event.target.value)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		setError(null)
		setBook(null)

		try {
			const response = await axios.get(
				`http://localhost:5000/books/isbn?isbn=${isbn}`
			)
			setBook(response.data)
		} catch (err) {
			setError("Book Not Found")
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container className='mt-4'>
			<Form onSubmit={handleSubmit} className='mb-4'>
				<Row>
					<h2>Search for a book</h2>
					{/* <h3>Scan ISBN</h3> */}
					<Col className='mx-auto'>
						<Form.Group>
							<Form.Control
								type='text'
								placeholder='Enter ISBN'
								value={isbn}
								onChange={handleIsbnChange}
								required
							/>
						</Form.Group>
						<Button
							variant='primary'
							type='submit'
							className='w-100'
							disabled={loading}
						>
							{loading ? "Loading..." : "Search Book"}
						</Button>
					</Col>
				</Row>
			</Form>

			{error && <Alert variant='danger'>{error}</Alert>}

			{book && (
				<Row className='mt-4'>
					<Col md={4}>
						<Card.Img
							src={book.thumbnail || "/book2.png"}
							alt={book.title}
							className='img-fluid rounded'
						/>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title>{book.title}</Card.Title>
								<Card.Text>
									<strong>Author:</strong> {book.authors.join(", ")}
								</Card.Text>
								<Card.Text>{book.description}</Card.Text>
								<Button
									variant='info'
									href={book.link}
									target='_blank'
									rel='noopener noreferrer'
								>
									View on Google Books
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	)
}

export default IsbnScanner

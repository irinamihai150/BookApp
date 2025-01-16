import React from "react"
import { Card } from "react-bootstrap"
import "./BookCard.css"

const BookCard = ({ book }) => {
	return (
		<Card className='book-card'>
			<Card.Img
				src={book.thumbnail || "/book.png"}
				alt={book.title}
				className='book-thumbnail'
			/>
			<Card.Body>
				<Card.Title className='book-title'>{book.title}</Card.Title>
				<Card.Text>
					<strong>ISBN:</strong> {book.isbn}
				</Card.Text>
				<Card.Text className='book-authors'>
					<strong>Author:</strong> {book.authors.join(", ")}
				</Card.Text>
				<Card.Text className='book-description'>
					{book.description || "No description available."}
				</Card.Text>
				<a
					href={book.link}
					target='_blank'
					rel='noopener noreferrer'
					className='btn btn-primary'
				>
					View on Google Books
				</a>
			</Card.Body>
		</Card>
	)
}

export default BookCard

import BookList from "./components/BookList"
import "./App.css"
import { Container, Row, Col } from "react-bootstrap"
import IsbnScanner from "./components/IsbnScanner.js"

const App = () => {
	return (
		<Container fluid className='mt-3'>
			<Row className='mb-3'>
				<Col>
					<h1 className='text-center'>
						Scan and Discover Your Next Favorite Book!
					</h1>
				</Col>
			</Row>
			<Row className='mb-3'>
				<Col xs={12} md={6}>
					<IsbnScanner />
				</Col>
				{/* <Col xs={12} md={6}>
					<BarcodeScanner />
				</Col> */}
			</Row>

			<Row className='mt-3'>
				<Col xs={12}>
					<BookList />
				</Col>
			</Row>
		</Container>
	)
}

export default App

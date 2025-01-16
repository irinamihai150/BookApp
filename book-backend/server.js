import express from "express"
import axios from "axios"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors({ origin: "http://localhost:3000" }))
const port = 5000

app.get("/books", async (req, res) => {
	const { category, maxResults } = req.query

	try {
		const response = await axios.get(process.env.API_BASE_URL, {
			params: {
				q: `subject:${category}`,
				maxResults: maxResults || 10,
				key: process.env.API_KEY,
			},
		})

		const truncateDescription = (description, maxLength = 200) => {
			if (!description) return "No description available."
			return description.length > maxLength
				? `${description.slice(0, maxLength)}...`
				: description
		}

		const books = response.data.items.map((item) => {
			const isbn =
				item.volumeInfo.industryIdentifiers?.find(
					(identifier) => identifier.type === "ISBN_13"
				)?.identifier ||
				item.volumeInfo.industryIdentifiers?.find(
					(identifier) => identifier.type === "ISBN_10"
				)?.identifier

			return {
				title: item.volumeInfo.title,
				isbn: isbn || "No ISBN found",
				authors: item.volumeInfo.authors || ["Unknown"],
				description: truncateDescription(item.volumeInfo.description, 150),
				thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
				link: item.volumeInfo.infoLink,
			}
		})

		res.json(books)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Failed to fetch books from the API" })
	}
})

app.get("/books/isbn", async (req, res) => {
	const { isbn } = req.query

	if (!isbn) {
		return res.status(400).json({ error: "ISBN is required" })
	}

	try {
		const response = await axios.get(process.env.API_BASE_URL, {
			params: {
				q: `isbn:${isbn}`,
				key: process.env.API_KEY,
			},
		})

		if (response.data.items && response.data.items.length > 0) {
			const book = response.data.items[0].volumeInfo

			res.json({
				title: book.title,
				authors: book.authors || ["Unknown"],
				description: book.description || "No description available.",
				thumbnail: book.imageLinks ? book.imageLinks.thumbnail : null,
				link: book.infoLink,
			})
		} else {
			res.status(404).json({ error: "Book not found" })
		}
	} catch (error) {
		console.error(error)
		res
			.status(500)
			.json({ error: "Failed to fetch book details from Google Books API" })
	}
})

app.get("/", (req, res) => {
	res.send("Hello, welcome to the Book API!")
})

app.listen(port, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})

import express from "express"
import axios from "axios"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

const allowedOrigins = ["http://localhost:3000", "https://bookappm.netlify.app"]

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true)
			} else {
				callback(new Error("Not allowed by CORS"))
			}
		},
		methods: ["GET"],
	})
)

app.get("/books", async (req, res) => {
	const { category = "computers", maxResults = 15 } = req.query

	const finalMaxResults = [5, 10, 15].includes(Number(maxResults))
		? Number(maxResults)
		: 10

	try {
		const response = await axios.get(process.env.API_BASE_URL, {
			params: {
				q: `subject:${category}`,
				maxResults: finalMaxResults,
				key: process.env.API_KEY,
				langRestrict: "en",
			},
		})

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
				description: item.volumeInfo.description || "No description available.",
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
				langRestrict: "en",
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

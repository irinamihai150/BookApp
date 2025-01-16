import React, { useRef, useState, useEffect } from "react"
import { BrowserMultiFormatReader } from "@zxing/library"
import "./BarcodeScanner.css"

import BookCard from "./BookCard"

const BarcodeScanner = ({ onScan }) => {
	const [scanning, setScanning] = useState(false)
	const [error, setError] = useState(null)
	const [bookInfo, setBookInfo] = useState(null)
	const videoRef = useRef(null)
	const [reader] = useState(new BrowserMultiFormatReader())

	useEffect(() => {
		// Start or stop scanning based on the scanning state
		if (scanning) {
			startScanning()
		} else {
			stopScanning()
		}

		// Cleanup when component unmounts or scanning is turned off
		return () => {
			stopScanning()
		}
	}, [scanning])

	const startScanning = async () => {
		try {
			// Access the webcam to get the video stream
			const videoStream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: "environment" }, // Use the back camera if available
			})

			videoRef.current.srcObject = videoStream

			// Start scanning for barcodes
			reader
				.decodeFromVideoDevice(
					null,
					videoRef.current,
					async (result, error) => {
						if (result) {
							// console.log(result.getText()) // Log the scanned ISBN
							onScan(result.getText()) // Return the ISBN to the parent component
							await fetchBookInfo(result.getText()) // Fetch book info using the ISBN
						}

						if (error) {
							// setError("Error scanning the barcode.")
							console.error("Error scanning the barcode:", error)
						}
					}
				)
				.then(() => console.log("Scanning started"))
				.catch((err) => {
					console.error("Scanning failed:", err)
					// setError("Error initializing scanner.")
				})
		} catch (err) {
			console.error("Error accessing webcam:", err)
			// setError("Error accessing webcam.")
		}
	}

	const stopScanning = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject
			const tracks = stream.getTracks()
			tracks.forEach((track) => track.stop())
			videoRef.current.srcObject = null
		}
	}

	const fetchBookInfo = async (isbn) => {
		try {
			const response = await fetch(
				`http://localhost:5000/books/isbn?isbn=${isbn}`
			)
			const data = await response.json()

			if (response.ok) {
				setBookInfo(data)
				// console.log("Book Info:", data)
			} else {
				setError(data.error || "No book data found.")
			}
		} catch (err) {
			// console.error("Error fetching book info:", err)
			setError("Error fetching book info from server.")
		}
	}

	return (
		<div className='barcode-scanner-container'>
			<h2>Scan ISBN</h2>
			{error && <div className='barcode-scanner-error'>{error}</div>}
			<div className='barcode-scanner-video-container'>
				<video
					ref={videoRef}
					className='barcode-scanner-video'
					autoPlay
					muted
				></video>
			</div>

			{/* Start or Stop Scanning Button */}
			{!bookInfo ? (
				<div className='barcode-scanner-button-container'>
					<button
						className='barcode-scanner-button'
						onClick={() => setScanning(!scanning)} // Toggle scanning state
					>
						{scanning ? "Stop Scanning" : "Start Scanning"}
					</button>
				</div>
			) : (
				<div className='barcode-scanner-button-container'>
					<button
						className='barcode-scanner-button'
						onClick={() => {
							setBookInfo(null) // Reset book info
							setScanning(true) // Start scanning again
						}}
					>
						Scan Another Book
					</button>
				</div>
			)}

			{bookInfo &&
				{
					/* <div className='book-info'>
					<h3>{bookInfo.title}</h3>
					<p>Authors: {bookInfo.authors.join(", ")}</p>
					<p>{bookInfo.description}</p>
					{bookInfo.thumbnail && (
						<img
							src={bookInfo.thumbnail}
							alt={bookInfo.title}
							className='book-thumbnail'
						/>
					)}
					<a href={bookInfo.link} target='_blank' rel='noopener noreferrer'>
						View on Google Books
					</a>
				</div> */
				}}

			{bookInfo && <BookCard book={bookInfo} />}
		</div>
	)
}

export default BarcodeScanner

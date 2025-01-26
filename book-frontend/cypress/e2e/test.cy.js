/* eslint-disable no-undef */

describe("template spec", () => {
	it("passes", () => {
		cy.visit("http://localhost:3000")
		cy.get("h1.text-center")
			.should("be.visible")
			.should("contain", "Scan and Discover Your Next Favorite Book!")
	})
})

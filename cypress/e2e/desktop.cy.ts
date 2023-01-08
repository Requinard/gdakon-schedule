export {};

describe("Desktop", () => {
    it("Renders the navbar", () => {
        cy.visit("/");

        cy.get(".MuiBottomNavigation-root")
            .should("contain", "Event Schedule")
            .and("contain.text", "About")
            .and("contain.text", "Home")
            .snapshot("Navbar");
    });

    it("renders the homepage", () => {
        cy.visit("/");

        cy.contains("Event Schedule");

        cy.snapshot("Main");
    });

    it("Renders the schedule page", () => {
        cy.visit("/schedule").wait(500);

        cy.snapshot("Render the initial page");

        cy.contains("Event Schedule");

        cy.get("[data-test-id=virtuoso-scroller]")
            .scrollTo("bottom")
            .snapshot("Scrolled to the bottom")
            .log("Try to scroll the elements");

        cy.get("[data-testid=DayFilterChip]")
            .first()
            .click()
            .log("Try to apply a filter set");

        cy.snapshot("Applied a filter");
    });

    it("/about", () => {
        cy.visit("/about").wait(500);

        cy.snapshot("About");
    });
});

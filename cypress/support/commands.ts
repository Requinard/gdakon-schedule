Cypress.Commands.add("snapshot", (title: string) => {
    cy.screenshot(
        [...Cypress.currentTest.titlePath, title.replace("/", "")].join("/"),
        {
            overwrite: true,
        }
    );
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            snapshot: (title: string) => Chainable<null>;
        }
    }
}

export {};

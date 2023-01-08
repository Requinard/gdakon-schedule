import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

import { render, screen } from "../../test/test-utils";

import { EnableTimeTravel } from "./TimeTravelSettings";

describe("<TimeTravelSettings />", () => {
    describe("<EnableTimeTravel />", () => {
        it("renders as unavailable by default", () => {
            render(<EnableTimeTravel />);

            expect(
                screen.getByRole("checkbox", { checked: false })
            ).toBeDefined();
        });

        it("renders as checked if it should be", () => {
            render(<EnableTimeTravel />, {
                preloadedState: {
                    settings: {
                        timetravel: {
                            enabled: true,
                            amount: 0,
                        },
                    },
                },
            });

            expect(
                screen.getByRole("checkbox", { checked: true })
            ).toBeDefined();
        });

        it("Changes the checked option when the button is clicked", async () => {
            render(<EnableTimeTravel />, {});

            expect(
                screen.getByRole("checkbox", { checked: false })
            ).toBeDefined();

            await userEvent.click(screen.getByRole("button"));
            await waitFor(() =>
                screen.getByRole("checkbox", { checked: true })
            );

            expect(
                screen.getByRole("checkbox", { checked: true })
            ).toBeDefined();
        });
    });
});

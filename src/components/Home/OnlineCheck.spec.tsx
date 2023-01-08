import { describe, it, expect, vi } from "vitest";

import { render, screen } from "../../test/test-utils";

import { OnlineCheck } from "./OnlineCheck";
describe("<OnlineCheck />", () => {
    it("renders nothing when online but error message is skipped", () => {
        vi.spyOn(navigator, "onLine", "get").mockReturnValue(true);

        render(<OnlineCheck />);
        expect(screen.queryByRole("alert")).toBeNull();
    });
    it("renders a success alert when online but not skipping", () => {
        vi.spyOn(navigator, "onLine", "get").mockReturnValue(true);

        render(<OnlineCheck showIfOnline />);
        expect(screen.getByRole("alert")).toMatchSnapshot();
        expect(screen.getByTestId("SuccessOutlinedIcon")).toBeVisible();
    });
    it("renders a warning when offline", () => {
        vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);

        render(<OnlineCheck />);
        expect(screen.getByRole("alert")).toMatchSnapshot();
        expect(screen.getByTestId("ReportProblemOutlinedIcon")).toBeVisible();
    });
    it("renders a warning when offline and showOnline is set", () => {
        vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);

        render(<OnlineCheck showIfOnline />);
        expect(screen.getByRole("alert")).toMatchSnapshot();
        expect(screen.getByTestId("ReportProblemOutlinedIcon")).toBeVisible();
    });
});

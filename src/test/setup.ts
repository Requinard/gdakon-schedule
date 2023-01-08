import "@testing-library/jest-dom";
import "@testing-library/user-event";
import { noop } from "lodash";
import { vi } from "vitest";

vi.spyOn(console, "log").mockImplementation(noop);
vi.spyOn(console, "warn").mockImplementation(noop);
vi.spyOn(console, "error").mockImplementation(noop);
vi.spyOn(console, "info").mockImplementation(noop);

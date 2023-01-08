import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render as defaultRender } from "@testing-library/react";
import type { EnhancedStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

import { middlewares, reducer, RootState } from "../store";

type CustomRenderOptions = {
    preloadedState?: Partial<RootState>;
    store?: EnhancedStore;
    renderOptions?: Omit<RenderOptions, "wrapper">;
};

type CustomRenderFn = (
    ui: ReactElement,
    options?: CustomRenderOptions
) => RenderResult;

/**
 * Wraps react components with all required providers.
 */
const customRender: CustomRenderFn = (
    ui,
    {
        renderOptions,
        preloadedState = {},
        store = configureStore({
            reducer: reducer,
            preloadedState: preloadedState,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(...middlewares),
        }),
    } = {}
) => {
    const Wrapper = ({ children }: PropsWithChildren): ReactElement => (
        <Provider store={store}>{children}</Provider>
    );

    return defaultRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { customRender as render };

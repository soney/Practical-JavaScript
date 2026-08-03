// The entry point from the video. Before the app renders, it creates one
// shared query client and wraps <App /> in a provider so every component
// can reach it. See the note at the top of App.jsx for how to run this
// project: it needs its bundler, so it does not work from a plain preview.
import reactDom from "react-dom/client";
import App from "./App";
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootEl = document.querySelector("#root");
const root = reactDom.createRoot(rootEl);

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

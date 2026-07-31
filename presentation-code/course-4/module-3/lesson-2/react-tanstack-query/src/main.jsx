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

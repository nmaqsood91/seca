import { Routes, Route, BrowserRouter } from "react-router-dom";
import routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.css";
const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {routes?.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route?.path}
                  element={route?.component}
                />
              );
            })}
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

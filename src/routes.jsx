import { AuthPage } from "./pages/Auth";
import { Register } from "./components/settings/Register";

export const routes = [
    {path: "/*", element: <AuthPage/> },
    {path: "/register", element: <Register/> }
]
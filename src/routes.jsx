import { AuthPage } from "./pages/Auth";
import { Register } from "./components/settings/Register";
import { Dashboard } from "./pages/home/Dashboard";
import { PublicacionDetalle } from "./components/comments";

export const routes = [
    {path: "/auth", element: <AuthPage/> },
    {path: "/register", element: <Register/> },
    {path: "/*", element: <Dashboard/>},
    {path: "/publicacion/:id", element: <PublicacionDetalle/>}
]
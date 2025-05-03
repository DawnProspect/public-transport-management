import { createBrowserRouter, RouterProvider } from "react-router-dom"

// * List semua halaman

import AllVehicles from "./pages/AllVehicles"

const router = createBrowserRouter([
    {
        path: "/",
        element: <AllVehicles />,
    }
])
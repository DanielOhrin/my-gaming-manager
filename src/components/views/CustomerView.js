import { Outlet, Route, Routes } from "react-router-dom"

export const CustomerView = () => {
    return <Routes>
        <Route path="/" element={
            <>
                <h1>Test</h1>
                <Outlet />
            </>
        }>
            <Route path="profile" element={<>Test2</>} />
            <Route path="my-lists/:userId" element={<>Test2</>} />
            <Route path="search" element={<>Test2</>} />
        </Route>
    </Routes>
}
// May Not need outlet (leave for now)
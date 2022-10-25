import { Outlet, Route, Routes } from "react-router-dom"
import { MyLists } from "../lists/MyLists"
import { Search } from "../search/Search"

export const CustomerView = () => {
    return <Routes>
        <Route path="/" element={
            <Outlet />
        }>
            <Route index element={<h1>Home Page!</h1>} />
            <Route path="profile" element={<>Test2</>} />
            <Route path="my-lists/:userId" element={<MyLists />} />
            <Route path="search" element={<Search />} />
        </Route>
    </Routes>
}
// May Not need outlet (leave for now)
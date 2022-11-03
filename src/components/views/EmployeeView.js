import { Outlet, Route, Routes } from "react-router-dom"
import { List } from "../lists/list/List"
import { MyLists } from "../lists/MyLists"
import { Profile } from "../profile/Profile"
import { Search } from "../search/Search"
import { EmployeeTicketList } from "../support/tickets/EmployeeTicketList"
import { Ticket } from "../support/tickets/Ticket"

export const EmployeeView = () => {
    return <Routes>
        <Route path="/" element={
            <Outlet />
        }>
            <Route index element={<h1>You Should not see this O.O</h1>} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="my-lists/:userId" element={<MyLists />} />
            <Route path="list/:listId" element={<List />} />

            <Route path="search" element={<Search />} />
            <Route path="tickets" element={<EmployeeTicketList />} />
            <Route path="ticket/:ticketId" element={<Ticket />} />
        </Route>
    </Routes>
}
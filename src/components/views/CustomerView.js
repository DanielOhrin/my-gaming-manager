import { Link, Outlet, Route, Routes } from "react-router-dom"
import { List } from "../lists/list/List"
import { MyLists } from "../lists/MyLists"
import { Profile } from "../profile/Profile"
import { Search } from "../search/Search"
import { Support } from "../support/Support"
import { Ticket } from "../support/tickets/Ticket"

export const CustomerView = () => {
    return <Routes>
        <Route path="/" element={
            <Outlet />
        }>
            <Route index element={
                <article className="ml-8">
                    <section>
                        <h1>My Gaming Manager</h1>
                        <p>In this website, you can create lists of games and organize them however you like.</p>
                    </section>
                    <section>
                        <h2>Pages</h2>
                        <h4>Home</h4>
                        <p>General information about the website and its purpose.</p>
                        <h4>Profile</h4>
                        <p>Edit your profile details, such as email/username/phone.</p>
                        <h4>My Lists</h4>
                        <p>Create your lists here. You can also view and edit your existing lists here.</p>
                        <h4>Search</h4>
                        <p>Your place to search for any game you want. Our site has over 200,000 unique games to choose from!</p>
                        <h4>Contact Support</h4>
                        <p>Contains general FAQ questions, and a ticket system to contact support.</p>
                    </section>
                    <section>
                        <h2>Creating & Populating Lists</h2>
                        <h3>Creating a List</h3>
                        <p>Head on over to <Link to={`/my-lists/${JSON.parse(localStorage.getItem("mgm_user")).id}`}>My Lists</Link> to create your first list!</p>
                        <h3>Populating a List</h3>
                        <p>After you have created a list, navigate to the <Link to="/search">Search</Link> page to find some games!</p>
                        <h3><em>If you have any more questions, head over to <Link to="/support">Contact Support</Link></em></h3>
                    </section>
                </article>
            } />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="my-lists/:userId" element={<MyLists />} />
            <Route path="list/:listId" element={<List />} />

            <Route path="search" element={<Search />} />

            <Route path="support" element={<Support />} />
            <Route path="ticket/:ticketId" element={<Ticket />} />
        </Route>
    </Routes>
}

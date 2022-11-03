import { useState } from "react"
import { TicketForm } from "./tickets/TicketForm"
import { TicketList } from "./tickets/TicketList"
import "./Support.css"

export const Support = () => {
    const [newTicket, setNewTicket] = useState(false)

    return (
        <article className="flex support-container">
            <section id="faq" className="flex flex-col items-center bg-black w-2/5 text-white">
                <h2 className="mb-0">FAQs</h2>
                <div className="flex flex-col h-1/2 justify-evenly w-full">
                    <div className="flex flex-col items-center">
                        <span>Q: <em>How do I create a new list?</em></span>
                        <span>A: <em>Head over to "My Lists" and fill out the form.</em></span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Q: <em>How do I add games to a list?</em></span>
                        <span>A: <em>Head over to "Search" and click on *View Details*</em></span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Q: <em>How do I delete a list?</em></span>
                        <span>A: <em>Click on the list name in "My Lists", and edit list near the top.</em></span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Q: <em>Where do I report bugs?</em></span>
                        <span>A: <em>Create a ticket by clicking the Contact Support button.</em></span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Q: <em>What is the purpose of this website?</em></span>
                        <span>A: <em>To search for and organize games however you like.</em></span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Q: <em>Will there be more features in the future?</em></span>
                        <span>A: <em>Yes, this website is constantly being worked on.</em></span>
                    </div>
                </div>
                <div className="flex flex-col w-full items-center">
                    <h2 className="mb-0">Still Need Help?</h2>
                    <button className="contact-btn" onClick={() => setNewTicket(true)}>Contact Support</button>
                </div>
            </section>
            <section id="tickets" className="flex flex-col items-center w-3/5 bg-gray-200">
                <h2>Tickets</h2>
                <div className="w-full">
                    {
                        !newTicket
                            ? (
                                <>
                                    <header className="flex justify-evenly list w-auto list-headers">
                                        <div>Title</div>
                                        <div>Category</div>
                                        <div>Last Message</div>
                                        <div>Date Created</div>
                                    </header>
                                    <TicketList />
                                </>
                            )
                            : <TicketForm setNewTicket={setNewTicket} />
                    }
                </div>
            </section>
        </article>
    )
}
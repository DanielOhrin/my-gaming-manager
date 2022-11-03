import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchTicketMessages, fetchTickets } from "../../ApiManager"
import "./Ticket.css"
export const Ticket = () => {
    const [ticket, setTicket] = useState({}),
        [ticketMessages, setTicketMessages] = useState([]),
        [userId, setUserId] = useState(0),
        [daysSinceCreation, setDaysSinceCreation] = useState(0),
        [wantsToClose, setWantsToClose] = useState(false),
        [message, setMessage] = useState("")

    const { ticketId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const differenceInDays = (dateOne, dateTwo) => {
            const differenceInTime = dateTwo.getTime() - dateOne.getTime()

            return differenceInTime / (1000 * 3600 * 24)
        }

        fetchTickets(`/${ticketId}`)
            .then(res => res.json())
            .then(data => {
                setTicket(data)
                setDaysSinceCreation(Math.floor(differenceInDays(new Date(data.dateOpened * 1000), (new Date()))))
            })

        fetchTicketMessages(`?ticketId=${ticketId}&_expand=user`)
            .then(res => res.json())
            .then(data => setTicketMessages(data))

        setUserId(JSON.parse(localStorage.getItem("mgm_user")).id)
    }, [ticketId, userId])

    useEffect(() => {
        if (ticket.userId) {
            // I do realize they can still see the ticket data through the network tab
            if (userId !== ticket.userId && !JSON.parse(localStorage.getItem("mgm_user")).isStaff) {
                navigate("/support", { replace: true })
                return;
            }
        }
    }, [ticket, userId, navigate])

    const renderMessages = () => {
        for (let i = 0; i <= daysSinceCreation; i++) {
            const bottomLimit = ticket.dateOpened + (86400 * (i - 1))
            const topLimit = ticket.dateOpened + (86400 * (i + 1))

            const currentMessages = ticketMessages.filter(tM => tM.datetime > bottomLimit && tM.datetime < topLimit)

            return (
                <>
                    <h3><em>{new Date((bottomLimit + 86400) * 1000).toLocaleDateString()}</em></h3>
                    {
                        currentMessages.map(cM => {
                            return (
                                <div key={`message--${cM.id}`} className={`${cM.userId === userId ? "self-end" : "self-start"}`}>
                                    <span><em>{cM.user?.username} | {new Date(cM.datetime * 1000).toLocaleTimeString()}</em></span>
                                    {cM.message}
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }

    const closeTicket = () => {
        const copy = { ...ticket }
        copy.dateClosed = Math.round(Date.now() / 1000)

        fetchTickets(`/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...copy })
        })
            .then(res => {
                if (res.ok) {
                    navigate("/support", { replace: true })
                } else {
                    window.alert('Something went wrong.')
                }
            })
    }

    const sendMessage = () => {
        const sendBtn = document.getElementById("message-btn")
        sendBtn.disabled = true

        if (message.replaceAll(" ", "") !== "") {
            fetchTicketMessages(`/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ticketId: ticket.id,
                    userId: userId,
                    datetime: Math.round(Date.now() / 1000),
                    message: document.getElementById("message-input").value
                })
            })
                .then(res => {
                    if (res.ok) {
                        fetchTicketMessages(`?ticketId=${ticketId}&_expand=user`)
                            .then(res => res.json())
                            .then(data => setTicketMessages(data))
                        setMessage("")
                        sendBtn.disabled = false
                    } else {
                        window.alert('Something went wrong.')
                        sendBtn.disabled = false
                    }
                })
        } else {
            window.alert("Please specify a message.")
            sendBtn.disabled = false
        }
    }

    return (
        <article id="ticket-article" className="w-full bg-gray-200">
            <section id="ticket-section" className="">
                <h2 className="w-full text-center">{ticket.title}</h2>
                <header className="flex flex-col items-center">
                    {
                        renderMessages()
                    }
                </header>
                <footer>
                    {
                        !ticket.dateClosed ? (
                            <div className="flex flex-row justify-between">
                                <input id="message-input" className="w-5/6" type="text" value={message} onChange={(evt) => setMessage(evt.target.value)}></input>
                                <button id="message-btn" onClick={() => sendMessage()}>Send Message</button>
                            </div>
                        )
                            : <></>
                    }
                    {
                        !JSON.parse(localStorage.getItem("mgm_user")).isStaff
                            ? <button className="mr-4" onClick={() => setWantsToClose(true)}>Close Ticket</button>
                            : <></>
                    }
                    {
                        wantsToClose
                            ? (
                                <>
                                    <span>Are You Sure?</span>
                                    <button className="mx-2" onClick={() => setWantsToClose(false)}>No</button>
                                    <button onClick={() => closeTicket()}>Yes</button>
                                </>
                            )
                            : ""
                    }

                </footer>
            </section>
        </article>
    )
}


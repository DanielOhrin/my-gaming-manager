import { useState } from "react"
import { fetchTicketMessages, fetchTickets } from "../../ApiManager"

export const TicketForm = ({ setNewTicket }) => {
    const [ticketInfo, setTicketInfo] = useState({
        title: "",
        ticketCategoryId: 0,
    }),
        [firstMsg, setFirstMsg] = useState("")

    const handleUserInput = (evt) => {
        const copy = { ...ticketInfo }

        isNaN(parseInt(evt.target.value))
            ? copy[evt.target.name] = evt.target.value
            : copy[evt.target.name] = parseInt(evt.target.value)

        setTicketInfo(copy)
    }

    const createList = (evt) => {
        evt.preventDefault()
        document.getElementById('createTicket-btn').disabled = true
        let resOk


        if (ticketInfo.title.replaceAll(" ", "") !== "" && !Object.values(ticketInfo).includes(0) && firstMsg.replaceAll(" ", "") !== "") {
            fetchTickets(`/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...ticketInfo,
                    userId: JSON.parse(localStorage.getItem("mgm_user")).id,
                    dateOpened: Math.round(Date.now() / 1000),
                    dateClosed: ""
                })
            })
                .then(res => {
                    if (res.ok) {
                        resOk = true
                        return res.json()
                    } else {
                        resOk = false
                        document.getElementById('createTicket-btn').disabled = false
                        window.alert('Something went wrong.')
                        return
                    }
                })
                .then(data => {
                    if (resOk) {
                        fetchTicketMessages(`/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                ticketId: data.id,
                                userId: JSON.parse(localStorage.getItem("mgm_user")).id,
                                datetime: Math.round(Date.now() / 1000),
                                message: firstMsg
                            })
                        })
                            .then(res => {
                                if (res.ok) {
                                    document.getElementById('createTicket-btn').disabled = false
                                    setNewTicket(false)
                                } else {
                                    window.alert('Failed to create message. Ticket created.')
                                    setNewTicket(false)
                                }
                            })
                    }
                })
        } else {
            document.getElementById('createTicket-btn').disabled = false
            window.alert("Please fill out the entire form.")
        }
    }

    return <form className="flex flex-col">
        <fieldset className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input className="w-1/4" type="text" name="title" value={ticketInfo.title} onChange={handleUserInput} />
        </fieldset>
        <fieldset className="flex flex-col">
            <label htmlFor="ticketCategoryId">Category</label>
            <select className="w-fit" name="ticketCategoryId" onChange={handleUserInput}>
                <option value="0" hidden></option>
                <option value="1">Bug Report</option>
                <option value="2">General Support</option>
                <option value="3">Feature Request</option>
                <option value="4">Other</option>
            </select>
        </fieldset>
        <fieldset className="flex flex-col">
            <label htmlFor="message">Message</label>
            <input type="text" name="message" onChange={(evt) => setFirstMsg(evt.target.value)}></input>
        </fieldset>
        <fieldset>
            <button className="p-2 w-fit" onClick={(evt) => { evt.preventDefault(); setNewTicket(false) }}>Cancel</button>
            <button id="createTicket-btn" className="p-2 w-fit ml-8" onClick={createList}>Create Ticket</button>
        </fieldset>
    </form>
}
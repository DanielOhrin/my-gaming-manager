import { useEffect, useState } from "react"

export const NameSearch = ({ setGames }) => {
    const [name, setName] = useState("")

    const handleUserInput = (evt) => {
        setName(evt.target.value)
    }

    const handleSearch = () => {
        if (document.getElementById("startsWith")) {
            // Fetch games by includes
        } else {
            // Fetch games by starts with
        }
    }

    return (
        <>
            <label className="mr-1" htmlFor="search">Search for Game</label>
            <input type="text" name="search" onChange={handleUserInput} />
            <button className="bg-blue-300 mt-10 ml-0.5" onClick={handleSearch}>🔎</button>
            <input id="startsWith" type="checkbox" name="startsWith" />
            <label htmlFor="startsWith">Starts With?</label>
        </>
    )
}
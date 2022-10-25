import { useState } from "react"
import { fetchGames } from "../ApiManager"

export const NameSearch = ({ setGames }) => {
    const [name, setName] = useState("")

    const handleUserInput = (evt) => {
        setName(evt.target.value)
    }

    const handleSearch = () => {
        let twoChecked = 0

        const checkBoxes = document.getElementsByClassName("search-box")
        for (const checkbox of checkBoxes) {
            if (checkbox.checked) {
                twoChecked++
            }
        }

        if (twoChecked > 1) {
            window.alert('Only one checkbox may be selected.')
            return;
        }

        if (checkBoxes[0].checked) {
            // Starts With String (Not Case Sensitive)
            fetchGames(`where (name ~ "${name}"*) & (cover.url != null); fields name,cover.url; limit 52;`)
                .then(res => res.json())
                .then(data => setGames(data))
        } else if (checkBoxes[1].checked) {
            // Matches String (Not Case Sensitive)
            fetchGames(`where (name ~ "${name}") & (cover.url != null); fields name,cover.url; limit 52;`)
                .then(res => res.json())
                .then(data => setGames(data))
        } else {
            // Includes string (Not Case Sensitive)
            fetchGames(`where (name ~ *"${name}"*) & (cover.url != null); fields name,cover.url; limit 52;`)
                .then(res => res.json())
                .then(data => setGames(data))
        }
    }

    return (
        <section id="nameSearch">
            <div id="queries">
                <label className="mr-1" htmlFor="search">Search for Game</label>
                <input type="text" name="search" onChange={handleUserInput} />
                <button className="bg-blue-300 mt-10 ml-0.5" onClick={handleSearch}>🔎</button>

                <input className="search-box" type="checkbox" name="startsWith" />
                <label htmlFor="startsWith">Starts With?</label>
                <input className="search-box" type="checkbox" name="exactMatch" />
                <label htmlFor="exactMatch">Exact Match?</label>
            </div>
        </section>
    )
}
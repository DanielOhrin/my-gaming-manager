import { useState } from "react"
import { fetchGames } from "../ApiManager"

export const NameSearch = ({ setGames, setFeedback }) => {
    const [name, setName] = useState("")

    const handleUserInput = (evt) => {
        setName(evt.target.value)
    }

    const handleSearch = () => {
        document.getElementById("search-btn").disabled = true
        let twoChecked = 0

        const checkBoxes = document.getElementsByClassName("search-box")
        for (const checkbox of checkBoxes) {
            if (checkbox.checked) {
                twoChecked++
            }
        }

        if (twoChecked > 1) {
            window.alert('Only one checkbox may be selected.')
            document.getElementById("search-btn").disabled = false
            return;
        }

        if (checkBoxes[0].checked) {
            // Starts With String (Not Case Sensitive)
            fetchGames(`where (name ~ "${name}"*) & (cover.url != null); fields name,genres.name,cover.url,platforms.name,release_dates.y,summary,themes.slug,total_rating; limit 50;`)
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                        setGames(data)
                        document.getElementById("search-btn").disabled = false
                    } else {
                        setFeedback("No Matches Found.")
                        document.getElementById("search-btn").disabled = false
                    }
                })
        } else if (checkBoxes[1].checked) {
            // Matches String (Not Case Sensitive)
            fetchGames(`where (name ~ "${name}") & (cover.url != null); fields name,genres.name,cover.url,platforms.name,release_dates.y,summary,themes.slug,total_rating; limit 50;`)
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                        setGames(data)
                        document.getElementById("search-btn").disabled = false
                    } else {
                        setFeedback("No Matches Found.")
                        document.getElementById("search-btn").disabled = false
                    }
                })
        } else {
            // Includes string (Not Case Sensitive)
            fetchGames(`where (name ~ *"${name}"*) & (cover.url != null); fields name,genres.name,cover.url,platforms.name,release_dates.y,summary,themes.slug,total_rating; limit 50;`)
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                        setGames(data)
                        document.getElementById("search-btn").disabled = false
                    } else {
                        setFeedback("No Matches Found.")
                        document.getElementById("search-btn").disabled = false
                    }
                })
        }
    }

    return (
        <section id="nameSearch">
            <div id="queries">
                <label className="mr-1" htmlFor="search">Search for Game</label>
                <input type="text" name="search" onChange={handleUserInput} />
                <button id="search-btn" className="bg-blue-300 mt-10 ml-0.5" onClick={handleSearch}>🔎</button>

                <input className="search-box" type="checkbox" name="startsWith" />
                <label htmlFor="startsWith">Starts With?</label>
                <input className="search-box" type="checkbox" name="exactMatch" />
                <label htmlFor="exactMatch">Exact Match?</label>
            </div>
        </section>
    )
}
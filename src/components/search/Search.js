import { useState } from "react"
import { Game } from "./Game"
import { NameSearch } from "./NameSearch"

export const Search = () => {
    const [games, setGames] = useState([])

    return (
        <article id="search-container">
            <NameSearch setGames={setGames} />

            <section id="games-container">
                {
                    games.length
                        ? games.map(game => {
                            return <Game gameObj={game} />
                        })
                        : <></>
                }
            </section>
        </article>
    )
}
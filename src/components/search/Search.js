import { useState } from "react"
import { Game } from "./Game"
import { NameSearch } from "./NameSearch"

export const Search = () => {
    const [games, setGames] = useState([])

    return (
        <>
            <NameSearch setGames={setGames} />
            {
                games.length
                    ? games.map(game => {
                        return <Game gameObj={game} />
                    })
                    : <></>
            }
        </>
    )
}
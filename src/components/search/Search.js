import { useEffect, useState } from "react"
import { fetchLists } from "../ApiManager"
import { Game } from "./Game"
import { NameSearch } from "./NameSearch"

export const Search = () => {
    const [games, setGames] = useState([]),
        [lists, setLists] = useState([]),
        [feedback, setFeedback] = useState(""),
        [userChoices, setUserChoices] = useState({
            gameId: 0,
            listId: 0
        })

    useEffect(() => {
        fetchLists(`?userId=${JSON.parse(localStorage.getItem("mgm_user")).id}`)
            .then(res => res.json())
            .then(data => setLists(data))
    }, [])

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => {
                setFeedback("")
            }, 3000)
        }
    }, [feedback])

    return (
        <article id="search-container" className="flex flex-col">
            <div className={`absolute ${feedback ? "visible" : "invisible"} ${feedback === "Success!" ? "successFade" : "failureFade"}`}>{feedback}</div>
            <NameSearch setGames={setGames} setFeedback={setFeedback} />

            <section id="games-container">
                {
                    games.length
                        ? games.map(game => {
                            return <Game key={`game--${game.id}`}
                                gameObj={game}
                                lists={lists}
                                userChoices={userChoices}
                                setUserChoices={setUserChoices}
                                setFeedback={setFeedback} />
                        })
                        : <></>
                }
            </section>
        </article>
    )
}
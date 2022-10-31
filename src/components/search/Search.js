import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchGames, fetchLists } from "../ApiManager"
import { Game } from "./Game"
import { NameSearch } from "./NameSearch"

export const Search = () => {
    const [games, setGames] = useState([]),
        [lists, setLists] = useState([]),
        [feedback, setFeedback] = useState(""),
        [userChoices, setUserChoices] = useState({
            gameId: 0,
            listId: 0
        }),
        [offset, setOffset] = useState(0),
        [name, setName] = useState("")

    const handleSearch = (modifier, search) => {
        document.getElementById("search-btn").disabled = true
        const pageLinks = [document.getElementById("page-previous"), document.getElementById("page-next")]
        pageLinks.forEach(link => {
            if (link !== null) link.style.pointerEvents = 'none';
        })

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
            fetchGames(`where (name ~ "${name}"*) & (cover.url != null) & (release_dates != null); fields name,genres.name,cover.url,platforms.name,release_dates.y,summary,themes.slug,total_rating; limit 50; offset ${modifier === undefined ? 0 : offset + (modifier === "previous" ? -50 : 50)};`)
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                        setGames(data)
                        document.getElementById("search-btn").disabled = false

                        pageLinks.forEach(link => {
                            if (link !== null) link.style.pointerEvents = '';
                        })

                        if (!search) {
                            if (modifier === "previous") {
                                const newOffset = offset - 50
                                setOffset(newOffset)
                            } else {
                                const newOffset = offset + 50
                                setOffset(newOffset)
                            }
                        }

                        if (modifier === undefined && search === true) {
                            setOffset(0)
                        }

                    } else {
                        setFeedback("No Matches Found.")
                        document.getElementById("search-btn").disabled = false
                        pageLinks.forEach(link => {
                            if (link !== null) link.style.pointerEvents = '';
                        })
                    }
                })
        } else if (checkBoxes[1].checked) {
            // Matches String (Not Case Sensitive)
            fetchGames(`where (name ~ "${name}") & (cover.url != null) & (release_dates != null); fields name,genres.name,cover.url,platforms.name,release_dates.y,summary,themes.slug,total_rating; limit 50; offset ${modifier === undefined ? 0 : offset + (modifier === "previous" ? -50 : 50)};`)
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                        setGames(data)
                        document.getElementById("search-btn").disabled = false

                        pageLinks.forEach(link => {
                            if (link !== null) link.style.pointerEvents = '';
                        })

                        if (!search) {
                            if (modifier === "previous") {
                                const newOffset = offset - 50
                                setOffset(newOffset)
                            } else {
                                const newOffset = offset + 50
                                setOffset(newOffset)
                            }
                        }

                        if (modifier === undefined && search === true) {
                            setOffset(0)
                        }

                    } else {
                        setFeedback("No Matches Found.")
                        document.getElementById("search-btn").disabled = false
                        pageLinks.forEach(link => {
                            if (link !== null) link.style.pointerEvents = '';
                        })
                    }
                })
        } else {
            // Includes string (Not Case Sensitive)
            fetchGames(`where (name ~ *"${name}"*) & (cover.url != null) & (release_dates != null); fields name,genres.name,cover.url,platforms.name,release_dates.y,summary,themes.slug,total_rating; limit 50; offset ${modifier === undefined ? 0 : offset + (modifier === "previous" ? -50 : 50)};`)
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                        setGames(data)
                        document.getElementById("search-btn").disabled = false

                        pageLinks.forEach(link => {
                            if (link !== null) link.style.pointerEvents = '';
                        })

                        if (!search) {
                            if (modifier === "previous") {
                                const newOffset = offset - 50
                                setOffset(newOffset)
                            } else {
                                const newOffset = offset + 50
                                setOffset(newOffset)
                            }
                        }

                        if (modifier === undefined && search === true) {
                            setOffset(0)
                        }

                    } else {
                        setFeedback("No Matches Found.")
                        document.getElementById("search-btn").disabled = false
                        pageLinks.forEach(link => {
                            if (link !== null) link.style.pointerEvents = '';
                        })
                    }
                })
        }
    }

    const paginate = (evt) => {
        evt.preventDefault()

        handleSearch(evt.target.id.split("-")[1])
    }

    const pagination = () => {
        if (offset < 50 && games.length === 50) {
            return <Link id="page-next" onClick={paginate}>Next Page</Link>
        } else if (offset < 50 && games.length !== 50) {
            return <></>
        } else if (offset >= 50 && games.length === 50) {
            return <>
                <Link id="page-previous" onClick={paginate}>Previous Page</Link> |
                <Link id="page-next" onClick={paginate}>Next Page</Link>
            </>
        } else if (offset >= 50 && games.length !== 50) {
            return <Link id="page-previous" onClick={paginate}>Previous Page</Link>
        }
    }

    useEffect(() => {
        fetchLists(`?userId=${JSON.parse(localStorage.getItem("mgm_user")).id}&_sort=name&_order=asc`)
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
            <div className={`fixed ${feedback ? "visible" : "invisible"} ${feedback === "Success!" ? "successFade" : "failureFade"}`}>{feedback}</div>
            <NameSearch handleSearch={handleSearch} setName={setName} setOffset={setOffset} />

            <section className="games-container">
                {
                    games.length
                        ? games.map(game => {
                            return <Game key={`game--${game.id}`}
                                gameObj={game}
                                lists={lists}
                                userChoices={userChoices}
                                setUserChoices={setUserChoices}
                                setFeedback={setFeedback}
                                offset={offset} />
                        })
                        : <></>
                }
            </section>
            <footer className="flex self-end justify-end pr-16">
                {pagination()}
            </footer>
        </article>
    )
}
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchGames, fetchLists } from "../ApiManager"
import { Game } from "./Game"
import { NameSearch } from "./NameSearch"
import { Filters } from "./Filters/Filters"
import { Sort } from "./Sort"

export const Search = () => {
    const [games, setGames] = useState([]),
        [sortedGames, setSortedGames] = useState([]),
        [lists, setLists] = useState([]),
        [feedback, setFeedback] = useState(""),
        [userChoices, setUserChoices] = useState({
            gameId: 0,
            listId: 0,
        }),
        [filters, setFilters] = useState({
            year: 0,
            platformId: 0,
            genreId: 0,
            themeId: 0,
            ratings: ""

        }),
        [offset, setOffset] = useState(0),
        [name, setName] = useState(""),
        [sort, setSort] = useState("")

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

    useEffect(() => {
        if (games.length) {
            const copy = [...games]

            if (sort) {
                copy.sort((a, b) => {
                    return sort.split("-")[1] === "asc"
                        ? sort.split("-")[0] === "name"
                            ? a[sort.split("-")[0]].charCodeAt(0) - b[sort.split("-")[0]].charCodeAt(0)
                            : a[sort.split("-")[0]] - b[sort.split("-")[0]]
                        : sort.split("-")[0] === "name"
                            ? b[sort.split("-")[0]].charCodeAt(0) - a[sort.split("-")[0]].charCodeAt(0)
                            : b[sort.split("-")[0]] - a[sort.split("-")[0]]
                })
            } else {
                copy.sort((a, b) => a.id - b.id)
            }
            setSortedGames(copy)
        }
    }, [sort, games])

    const calculateUnix = (year) => {
        const startObj = new Date(`January 1, ${year} 00:00:00`)
        const startOfYear = Date.parse(startObj) / 1000

        const endObj = new Date(`December 31, ${year} 23:59:59`)
        const endOfYear = Date.parse(endObj) / 1000

        return [startOfYear, endOfYear]
    }


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

        let startOfYear
        let endOfYear

        if (filters.year) {
            [startOfYear, endOfYear] = calculateUnix(filters.year)
        }

        fetchGames(`${checkBoxes[0].checked
            ? `where (name ~ "${name}"*)`
            : checkBoxes[1].checked
                ? `where (name ~ "${name}")`
                : `where (name ~ *"${name}"*)`
            }
            & (cover.url != null) 
            & (first_release_date != null) 
            & (total_rating != null)
            ${!filters.year
                ? ``
                : `& (first_release_date > ${startOfYear}) & (first_release_date < ${endOfYear})`
            }
            ${!filters.platformId
                ? ``
                : `& (platforms = (${filters.platformId}))`
            }
            ${!filters.genreId
                ? ``
                : `& (genres = (${filters.genreId}))`
            }
            ${!filters.themeId
                ? ``
                : `& (themes = (${filters.themeId}))`
            }
            ${!filters.ratings
                ? ``
                : `& (total_rating > ${parseInt(filters.ratings.split("-")[0])}) & (total_rating < ${parseInt(filters.ratings.split("-")[1])})
            `}; 

            fields name,
            genres.name,
            cover.url,
            platforms.name,
            first_release_date,
            summary,
            themes.slug,
            total_rating; 
            
            limit 50; 
            
            offset ${!modifier
                ? 0
                : offset + (modifier === "previous" ? -50 : 50)};
            `)
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


    return (
        <article id="search-container" className="flex flex-col">
            <div className={`fixed ${feedback ? "visible" : "invisible"} ${feedback === "Success!" ? "successFade" : "failureFade"}`}>{feedback}</div>
            <NameSearch handleSearch={handleSearch} setName={setName} setOffset={setOffset} />
            <section className="flex justify-center flex-wrap" id="filters">
                <Filters filters={filters} setFilters={setFilters} />
                <hr className="mb-0 w-full" />
                <Sort setSort={setSort} />
            </section>
            <section className="games-container">
                {
                    sortedGames.length
                        ? sortedGames.map(game => {
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
import { fetchListGames } from "../ApiManager"
import "./Game.css"

export const Game = ({ gameObj, lists, setUserChoices, userChoices, setFeedback }) => {

    const showModal = (evt) => {
        const modalId = evt.target.id.split("--")
        modalId[0] = "modal"

        const copy = { ...userChoices }
        copy.gameId = parseInt(modalId[1])
        setUserChoices(copy)

        const modal = document.getElementById(modalId.join("--"))
        modal.style.display = "flex";

        document.body.style.overflow = "hidden"
    }

    const closeModal = (evt) => {
        if (evt.target.id === `modal--${gameObj.id}`) {
            evt.target.style.display = "none"
            document.body.style.overflow = "auto"

            document.getElementsByClassName(`option--${gameObj.id}`)[0].selected = "true"
            setUserChoices({
                gameId: 0,
                listId: 0
            })
        }
    }

    const addToList = () => {
        document.getElementById(`add--${gameObj.id}`).disabled = true
        if (!Object.values(userChoices).includes(0)) {
            fetchListGames(`?listId=${userChoices.listId}&gameId=${userChoices.gameId}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.length) {
                        fetchListGames(`/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(userChoices)
                        })
                            .then(res => res.json())
                            .then(createdObj => {
                                if (createdObj.hasOwnProperty("id")) {
                                    setFeedback("Success!")
                                    setTimeout(() => { document.getElementById(`add--${gameObj.id}`).disabled = false }, 3000)
                                } else {
                                    setFeedback("Failed to add.")
                                    setTimeout(() => { document.getElementById(`add--${gameObj.id}`).disabled = false }, 3000)
                                }
                            })
                    } else {
                        setFeedback(`Game Already in List.`)
                        setTimeout(() => { document.getElementById(`add--${gameObj.id}`).disabled = false }, 3000)
                    }
                })
        } else {
            setFeedback(`List not selected.`)
            setTimeout(() => { document.getElementById(`add--${gameObj.id}`).disabled = false }, 3000)
        }
    }

    return <>
        <div className="flex flex-col">
            <img className="mb-1 game" src={gameObj.cover?.url} alt={gameObj.name} />
            <button id={`button--${gameObj.id}`} className="test test2" onClick={showModal}>View Details</button>
        </div>
        <section id={`modal--${gameObj.id}`} className="modal" onClick={closeModal}>
            <div className="modalContent">
                <section className="modalTop">
                    <div className="flex flex-col justify-center items-center">
                        <img className="modal-img" src={gameObj.cover?.url?.split("logo_med").join("cover_big")} alt={gameObj.name}></img>
                    </div>
                    <div className="w-full flex flex-col justify-between">
                        <h2 className="w-full text-center h-fit my-0">{gameObj.name} ({new Date(gameObj.first_release_date * 1000).getFullYear()})</h2>
                        <div className="flex flex-col items-center mr-5">
                            {
                                gameObj.genres?.length
                                    ? <>
                                        <h3 className="pl-4 m-0">Genres</h3>
                                        <ul className="genres pl-5 m-0">
                                            {
                                                gameObj.genres.sort((a, b) => b.name.length - a.name.length).map(genre => <li key={`genre--${genre.id}`}>- {genre.name}</li>)
                                            }
                                        </ul>
                                        <hr className="opacity-0" />
                                    </>
                                    : ""
                            }
                            {
                                gameObj.themes?.length
                                    ? <>
                                        <h3 className="pl-4 mx-0 mb-0">Themes</h3>
                                        <ul className="genres pl-5 m-0">
                                            {
                                                gameObj.themes?.sort((a, b) => b.slug.length - a.slug.length).map(theme => <li key={`theme--${theme.id}`}>- {theme.slug.charAt(0).toUpperCase() + theme.slug.slice(1)}</li>)
                                            }
                                        </ul>
                                    </>
                                    : ""
                            }
                        </div>
                        <div className="ml-1 mb-0">{gameObj.platforms.map(platform => platform.name).join(" | ")}</div>
                    </div>
                </section>
                <section className="modalBottom">
                    <div className="description">
                        {gameObj.summary}
                    </div>
                    <div className="flex flex-col w-full items-center h-3/4 justify-start">
                        <h2 className="h-fit mt-1 mx-0 mb-1">Lists</h2>
                        <select onChange={(evt) => {
                            const copy = { ...userChoices }
                            copy.listId = parseInt(evt.target.value)

                            setUserChoices(copy)
                        }}>
                            <option className={`option--${gameObj.id}`} value="0" hidden>Choose list</option>
                            {
                                lists.map(list => <option key={`list--${list.id}`} value={list.id}>{list.name}</option>)
                            }
                        </select>
                    </div>
                </section>
                <button id={`add--${gameObj.id}`} className="add-btn w-fit self-center" onClick={() => addToList()}>Add Game to List</button>
            </div>
        </section >
    </>
}

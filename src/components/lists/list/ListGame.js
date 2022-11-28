import { fetchListGames } from "../../ApiManager"
import "./List.css"

export const ListGame = ({ gameObj, editing, listId, setGameIds }) => {
    const showModal = (evt) => {
        const modalId = evt.target.id.split("--")
        modalId[0] = "modal"

        const modal = document.getElementById(modalId.join("--"))
        modal.style.display = "flex";

        document.body.style.overflow = "hidden"
    }

    const closeModal = (evt) => {
        if (evt.target.id === `modal--${gameObj.id}`) {
            evt.target.style.display = "none"
            document.body.style.overflow = "auto"
        }
    }

    const removeFromList = (evt) => {
        fetchListGames(`?listId=${listId}&gameId=${evt.target.id.split("--")[1]}`)
            .then(res => res.json())
            .then(data => {
                fetchListGames(`/${data[0].id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => {
                        if (res.ok) {
                            closeModal({ target: document.getElementById(`modal--${gameObj.id}`) })
                            fetchListGames(`?listId=${listId}`)
                                .then(res => res.json())
                                .then(dataArr => {
                                    setGameIds(dataArr.map(dataObj => dataObj.gameId))
                                })
                        } else {
                            window.alert(`Failed to remove from list.`)
                        }
                    })
            })
    }

    return !editing
        ? (
            <>
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
                                <div className="self-start font-bold">Rating: {gameObj.total_rating.toFixed(2)}/100</div>
                                <button id={`remove--${gameObj.id}`} className="remove-btn" onClick={removeFromList}>Remove from List</button>
                            </div>
                        </section>
                    </div>
                </section>
            </>
        )
        : ""
}
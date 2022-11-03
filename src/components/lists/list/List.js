import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchGames, fetchListGames, fetchLists, fetchListTags } from "../../ApiManager"
import { ListEditForm } from "./ListEditForm"
import { ListGame } from "./ListGame"

export const List = () => {
    const [listInfo, setListInfo] = useState({}),
        [listTags, setListTags] = useState([]),
        [gameIds, setGameIds] = useState([]),
        [games, setGames] = useState([]),
        [editing, setEditing] = useState(false),
        { listId } = useParams(),
        navigate = useNavigate()

    useEffect(() => {
        fetchLists(`/${listId}`)
            .then(res => res.json())
            .then(data => setListInfo(data))

        fetchListTags(`?listId=${listId}&_expand=tag`)
            .then(res => res.json())
            .then(data => setListTags(data))

        fetchListGames(`?listId=${listId}`)
            .then(res => res.json())
            .then(dataArr => {
                setGameIds(dataArr.map(dataObj => dataObj.gameId))
            })
    }, [listId])

    useEffect(() => {
        if (!gameIds.length) return;

        fetchGames(`where id = (${gameIds.join(", ")}); fields name,genres.name,cover.url,platforms.name,first_release_date,total_rating,summary,themes.slug,total_rating; limit 50;`)
            .then(res => res.json())
            .then(data => {
                data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                setGames(data)
            })

    }, [gameIds])

    const deleteList = (evt) => {
        fetchLists(`/${evt.target.id.split("--")[1]}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json:"
            }
        })
            .then(res => {
                if (res.ok) {
                    window.alert(`Successfully deleted list!`)
                    navigate(`/my-lists/${listInfo.userId}`)
                } else {
                    window.alert(`Failed to delete list.`)
                }
            })
    }

    return (
        <article>
            <section className="flex justify-evenly">
                <div className="flex flex-col">
                    <h4>{listInfo.name}</h4>
                    <div>Created on {new Date(listInfo.dateCreated).toLocaleDateString()}</div>
                    {
                        !editing
                            ? <button id="edit-btn" onClick={() => setEditing(true)}>Edit List Details</button>
                            : <button id="cancel-btn" onClick={() => setEditing(false)}>Cancel Changes</button>
                    }
                </div>
                <div>
                    <h4>Description</h4>
                    {listInfo.description}
                </div>
                <div>
                    <h4>Tags</h4>
                    {
                        listTags.map(tag => {
                            return <div key={`tag--${tag.id}`}>{tag.tag.label}</div>
                        })
                    }
                </div>
            </section>
            <hr />
            <section className="listGames-section flex flex-row flex-wrap justify-center">
                {
                    !editing
                        ? <h2 className="w-full text-center">Games</h2>
                        : <h2 className="w-full text-center">Edit List</h2>
                }
                {
                    !editing
                        ? (
                            <div className="games-container">
                                {
                                    games.map(game => {
                                        return <ListGame key={`listGame--${game.id}`} setGameIds={setGameIds} listId={listId} gameObj={game} editing={editing} />
                                    })
                                }
                            </div>
                        )
                        : (
                            <div>
                                <ListEditForm listInfo={listInfo} setEditing={setEditing} setListInfo={setListInfo} />
                            </div>
                        )
                }
                <div className="w-full self-end flex justify-center">
                    <button className="deleteList-btn" id={`delete--${listInfo.id}`} onClick={deleteList}>Delete List</button>
                </div>
            </section>
        </article>
    )
}
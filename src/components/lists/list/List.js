import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchGames, fetchListGames, fetchLists, fetchListTags } from "../../ApiManager"
import { ListEditForm } from "./ListEditForm"
import { ListGame } from "./ListGame"

export const List = () => {
    const [listInfo, setListInfo] = useState({}),
        [listTags, setListTags] = useState([]),
        [gameIds, setGameIds] = useState([]),
        [games, setGames] = useState([]),
        [editing, setEditing] = useState(false),
        { listId } = useParams()

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

        fetchGames(`where id = (${gameIds.join(", ")}); fields name,genres.name,cover.url,platforms.name,release_dates.y,summary,themes.slug,total_rating;`)
            .then(res => res.json())
            .then(data => {
                data.forEach(obj => obj.cover.url = obj.cover.url.split("thumb").join("logo_med"))
                setGames(data)
            })

    }, [gameIds])

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
            <section>
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
            </section>
        </article>
    )
}
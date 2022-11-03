import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchLists, fetchTags } from "../ApiManager"
import { ListForm } from "./ListForm"
import { Lists } from "./Lists"
import "./MyLists.css"

export const MyLists = () => {
    const [lists, setLists] = useState([]),
        [username, setUsername] = useState(""),
        [tags, setTags] = useState([]),
        { userId } = useParams()

    useEffect(() => {
        fetchLists(`?userId=${userId}&_expand=platform&_embed=listTags`)
            .then(res => res.json())
            .then(data => setLists(data))

        fetchTags()
            .then(res => res.json())
            .then(data => setTags(data))

        setUsername(JSON.parse(localStorage.getItem("mgm_user")).username)
    }, [userId])

    return (
        <>
            <ListForm setLists={setLists} userId={userId} />
            <hr className="opacity-50" />
            <article id="lists-container" className="flex flex-col items-center">
                <h2 className="mt-2">{username}'s Lists</h2>
                <header className="list list-headers">
                    <div>Name</div>
                    <div>Date Created</div>
                    <div>Tags</div>
                    <div>Platform</div>
                </header>
                <Lists tags={tags} lists={lists} userId={userId} />
            </article>
        </>
    )
}
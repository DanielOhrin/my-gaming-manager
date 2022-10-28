import React, { useEffect, useState } from "react"
import { fetchLists, fetchPlatforms } from "../../ApiManager"
import "../MyLists.css"

export const ListEditForm = ({ setListInfo, listInfo, setEditing }) => {
    const [newInfo, setNewInfo] = useState({ ...listInfo }),
        [platforms, setPlatforms] = useState([])

    useEffect(() => {
        fetchPlatforms()
            .then(res => res.json())
            .then(data => setPlatforms(data))
    }, [])

    const resetInputs = () => {
        const radios = document.getElementsByName("platform")
        radios.forEach(radio => radio.checked = false)

        setNewInfo({
            name: "",
            description: "",
            platformId: 0
        })
    }

    const handleUserInput = (evt) => {
        if (evt.target.type === "radio") {
            const copy = { ...newInfo }
            copy["platformId"] = parseInt(evt.target.value)

            setNewInfo(copy)
        } else if (evt.target.value.replaceAll(" ", "") === "") {
            const copy = { ...newInfo }
            copy[evt.target.name] = ""

            setNewInfo(copy)
        } else {
            const copy = { ...newInfo }
            copy[evt.target.name] = evt.target.value

            setNewInfo(copy)
        }
    }

    const updateList = (evt) => {
        evt.preventDefault()
        document.getElementById("updateList-btn").disabled = true

        if (Object.values(newInfo).includes("") || Object.values(newInfo).includes(0)) {
            window.alert('Please fill out the required fields.')
            document.getElementById("updateList-btn").disabled = false
            return;
        }

        fetchLists(`/${newInfo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...newInfo })
        })
            .then(res => res.json())
            .then(newList => {
                if (newList.hasOwnProperty("id")) {
                    resetInputs()
                    setListInfo({ ...newInfo })
                    setEditing(false)
                    document.getElementById("updateList-btn").disabled = false
                } else {
                    window.alert("Failed to create List")
                    document.getElementById("updateList-btn").disabled = false
                    return; 
                }
            })


    }

    return (
        <article id="list-form-container" className="flex flex-col items-center">
            <form id="list-form" className="flex flex-col items-center w-full pb-4">
                <fieldset>
                    <label htmlFor="name">List Name<strong>*</strong></label>
                    <input type="text" name="name" value={newInfo.name} onChange={handleUserInput} />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description<strong>*</strong></label>
                    <textarea className="resize-none h-24" name="description" value={newInfo.description} onChange={handleUserInput} />
                </fieldset>
                <fieldset>
                    <div>Platform<strong>*</strong></div>
                    <div id="platforms">
                        {
                            platforms.map(platform => {
                                return (
                                    <React.Fragment key={`platform--${platform.id}`}>
                                        <input name="platform" value={platform.id} type="radio" onChange={handleUserInput}
                                            checked={platform.id === newInfo.platformId ? true : false} />
                                        <label className="mr-4" htmlFor="platform">{platform.label}</label>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </fieldset>
                <button id="updateList-btn" className="w-fit p-1 px-4" onClick={updateList}>Save Changes</button>
            </form>
        </article>
    )
}
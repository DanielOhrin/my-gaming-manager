import React, { useEffect, useState } from "react"
import { fetchLists, fetchListTags, fetchPlatforms, fetchTags } from "../ApiManager"
import "./MyLists.css"

export const ListForm = ({ setLists, userId }) => {
    const [tags, setTags] = useState([]),
        [listInfo, setListInfo] = useState({
            name: "",
            description: "",
            platformId: 0
        }),
        [tagIds, setTagIds] = useState([]),
        [platforms, setPlatforms] = useState([])

    useEffect(() => {
        fetchTags()
            .then(res => res.json())
            .then(data => setTags(data))

        fetchPlatforms()
            .then(res => res.json())
            .then(data => setPlatforms(data))
    }, [])

    const resetInputs = () => {
        const options = document.getElementsByName("default")
        options.forEach(option => option.selected = true)

        const radios = document.getElementsByName("platform")
        radios.forEach(radio => radio.checked = false)

        setListInfo({
            name: "",
            description: "",
            platformId: 0
        })
        setTagIds([])
    }

    const handleUserInput = (evt) => {
        if (evt.target.type === "radio") {
            const copy = { ...listInfo }
            copy["platformId"] = parseInt(evt.target.value)

            setListInfo(copy)
        } else if (evt.target.value.replaceAll(" ", "") === "") {
            const copy = { ...listInfo }
            copy[evt.target.name] = ""

            setListInfo(copy)
        }
        else if (evt.target.name === "tags") {
            const copy = [...tagIds]
            if (evt.target.id === "tag-1") {
                //Tag 1
                copy[0] = parseInt(evt.target.value)
                setTagIds(copy)
            } else if (evt.target.id === "tag-2") {
                //Tag 2
                copy[1] = parseInt(evt.target.value)
                setTagIds(copy)
            } else {
                //Tag 3
                copy[2] = parseInt(evt.target.value)
                setTagIds(copy)
            }
        } else {
            const copy = { ...listInfo }
            copy[evt.target.name] = evt.target.value

            setListInfo(copy)
        }
    }

    const createList = (evt) => {
        evt.preventDefault()
        document.getElementById("saveList-btn").disabled = true

        if (Object.values(listInfo).includes("") || Object.values(listInfo).includes(0)) {
            window.alert('Please fill out the required fields.')
            document.getElementById("saveList-btn").disabled = false
            return;
        }

        const duplicateTagCheck = new Set(tagIds)
        if (duplicateTagCheck.size !== tagIds.length) {
            window.alert('You may not use the same tag twice.')
            document.getElementById("saveList-btn").disabled = false
            return;
        }

        fetchLists("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...listInfo,
                userId: JSON.parse(localStorage.getItem("mgm_user")).id,
                dateCreated: new Date()
            })
        })
            .then(res => res.json())
            .then(newList => {
                if (newList.hasOwnProperty("id")) {
                    for (const id of tagIds) {
                        fetchListTags("/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                tagId: id,
                                listId: newList.id
                            })
                        })
                    }
                    fetchLists(`?userId=${userId}&_expand=platform&_embed=listTags`)
                        .then(res => res.json())
                        .then(data => setLists(data))

                    resetInputs()
                    document.getElementById("saveList-btn").disabled = false
                } else {
                    window.alert("Failed to create List")
                    document.getElementById("saveList-btn").disabled = false
                    return; // Stretch Goal: add popup for success similar to loging/register form has
                }
            })


    }

    return (
        <article id="list-form-container" className="flex flex-col items-center">
            <form id="list-form" className="flex flex-col items-center w-1/2 pb-4">
                <h1 className="text-center mb-2 mt-2">Create List</h1>
                <fieldset>
                    <label htmlFor="name">List Name<strong>*</strong></label>
                    <input type="text" name="name" value={listInfo.name} onChange={handleUserInput} />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description<strong>*</strong></label>
                    <textarea className="resize-none h-24" name="description" value={listInfo.description} onChange={handleUserInput} />
                </fieldset>
                <fieldset>
                    <label htmlFor="tags">Tags</label>
                    <div className="flex flex-row nowrap justify-around">
                        <select id="tag-1" name="tags" onChange={handleUserInput}>
                            <option name="default" value="0" hidden>Tag 1</option>
                            {
                                tags.map(tag => {
                                    return <option key={`1-${tag.id}`} value={tag.id}>{tag.label}</option>
                                })
                            }
                        </select>
                        <select id="tag-2" name="tags" disabled={tagIds.length ? false : true} onChange={handleUserInput}>
                            <option name="default" value="0" hidden>Tag 2</option>
                            {
                                tags.map(tag => {
                                    return <option key={`1-${tag.id}`} value={tag.id}>{tag.label}</option>
                                })
                            }
                        </select>
                        <select id="tag-3" name="tags" disabled={tagIds.length > 1 ? false : true} onChange={handleUserInput}>
                            <option name="default" value="0" hidden>Tag 3</option>
                            {
                                tags.map(tag => {
                                    return <option key={`1-${tag.id}`} value={tag.id}>{tag.label}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div>Platform<strong>*</strong></div>
                    <div id="platforms">
                        {
                            platforms.map(platform => {
                                return (
                                    <React.Fragment key={`platform--${platform.id}`}>
                                        <input name="platform" value={platform.id} type="radio" onChange={handleUserInput} />
                                        <label className="mr-4" htmlFor="platform">{platform.label}</label>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </fieldset>
                <button id="saveList-btn" className="w-fit p-1 px-4" onClick={createList}>Create List</button>
            </form>
        </article>
    )
}
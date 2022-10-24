import { Link } from "react-router-dom"

export const Lists = ({ tags, lists }) => {
    return (
        <>
            {
                lists.map(list => {
                    return <section className="list">
                        <div>
                            <Link to={`/list/${list.id}`}>{list.name}</Link>
                        </div>
                        <div>{new Date(list.dateCreated).toLocaleDateString()}</div>
                        <div>{
                            list.listTags.length
                                ? list.listTags.map(listTag => {
                                    return tags.find(tag => tag.id === listTag.tagId)?.label
                                }).join(", ")
                                : "None"
                        }</div>
                        <div>{list.platform.label}</div>
                    </section>
                })
            }
        </>
    )
}

// Style each list a different color (but the same 2 alternating the whole time)
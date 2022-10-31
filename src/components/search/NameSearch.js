export const NameSearch = ({ handleSearch, setName, setOffset }) => {

    const handleUserInput = (evt) => {
        setName(evt.target.value)
    }

    return (
        <section id="nameSearch">
            <div id="queries">
                <label className="mr-1" htmlFor="search">Search for Game</label>
                <input type="text" name="search" onChange={handleUserInput} />
                <button id="search-btn" className="bg-blue-300 mt-10 ml-0.5" onClick={() => { handleSearch(undefined, true) }}>🔎</button>

                <input className="search-box" type="checkbox" name="startsWith" />
                <label htmlFor="startsWith">Starts With?</label>
                <input className="search-box" type="checkbox" name="exactMatch" />
                <label htmlFor="exactMatch">Exact Match?</label>
            </div>
        </section>
    )
}
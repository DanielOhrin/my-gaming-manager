export const GenresFilter = ({ apiData, filters, setFilters }) => {
    return (
        <div className="flex flex-col w-fit items-center mx-8" id="genres-filter">
            <h4 className="mb-1">Genre</h4>
            <select className="w-3/5" onChange={(evt) => {
                const copy = { ...filters }

                if (parseInt(evt.target.value) === 0) {
                    copy.genreId = undefined
                } else {
                    copy.genreId = apiData.genres.find(genre => genre.id === parseInt(evt.target.value)).id
                }

                setFilters(copy)
            }}>
                <option value="0">Any</option>
                {
                    apiData.genres.map(genre => {
                        return <option key={`genre--${genre.id}`} value={genre.id}>{genre.name}</option>
                    })
                }
            </select>
        </div >
    )
}

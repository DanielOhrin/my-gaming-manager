export const ThemesFilter = ({ apiData, filters, setFilters }) => {
    return (
        <div className="flex flex-col w-fit items-center mx-8" id="themes-filter">
            <h4 className="mb-1">Theme</h4>
            <select className="w-2/5" onChange={(evt) => {
                const copy = { ...filters }

                if (parseInt(evt.target.value) === 0) {
                    copy.themeId = undefined
                } else {
                    copy.themeId = apiData.themes.find(theme => theme.id === parseInt(evt.target.value)).id
                }

                setFilters(copy)
            }}>
                <option value="0">Any</option>
                {
                    apiData.themes.map(theme => {
                        return <option key={`theme--${theme.id}`} value={theme.id}>{theme.name}</option>
                    })
                }
            </select>
        </div >
    )
}
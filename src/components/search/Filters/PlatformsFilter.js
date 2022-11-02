export const PlatformsFilter = ({ apiData, filters, setFilters }) => {
    return (
        <div className="flex flex-col w-fit items-center" id="platforms-filter">
            <h4 className="mb-1 px-3">Platform</h4>
            <select className="w-1/2" onChange={(evt) => {
                const copy = { ...filters }

                if (parseInt(evt.target.value) === 0) {
                    copy.platformId = undefined
                } else {
                    copy.platformId = apiData.platforms.find(platform => platform.id === parseInt(evt.target.value)).id
                }

                setFilters(copy)
            }}>
                <option value="0">Any</option>
                {
                    apiData.platforms.map(platform => {
                        return <option key={`platform--${platform.id}`} value={platform.id}>{platform.name}</option>
                    })
                }
            </select>
        </div >
    )
}
function HistoryToolbar({

    search,

    setSearch,

    filter,

    setFilter,

    total = 0,

}) {

    return (

        <div className="history-toolbar">

            <div className="history-search">

                <input

                    type="text"

                    className="styled-input"

                    placeholder="🔍 Search crop..."

                    value={search}

                    onChange={(e) =>

                        setSearch(

                            e.target.value

                        )

                    }

                />

            </div>

            <div className="history-filter">

                <select

                    className="styled-input"

                    value={filter}

                    onChange={(e) =>

                        setFilter(

                            e.target.value

                        )

                    }

                >

                    <option value="all">

                        All Status

                    </option>

                    <option value="predicted">

                        🌱 Predicted

                    </option>

                    <option value="growing">

                        🌿 Growing

                    </option>

                    <option value="harvested">

                        🌾 Harvested

                    </option>

                </select>

            </div>

            <div className="history-count">

                <span>

                    Total Predictions

                </span>

                <strong>

                    {total}

                </strong>

            </div>

        </div>

    );

}

export default HistoryToolbar;
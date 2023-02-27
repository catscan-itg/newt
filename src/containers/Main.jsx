import {useCallback, useState} from "react";
import {getFiltered} from "../utlis/getFiltered"
import * as PropTypes from "prop-types";
import MainTournament from "../components/MainTournament";
import PictureComponent from "../components/base/PictureComponent";

const Main = ({
                  useSearch,
                  receivedData,
                  tenantId
              }) => {

    const [searchVal, setSearchVal] = useState('');

    const checkDates = useCallback((startDate, endDate) => {
        if(!startDate || (startDate instanceof Date && !isNaN(startDate))) return false;
        if(!endDate || (endDate instanceof Date && !isNaN(endDate))) return false;

        return (new Date(startDate) < new Date() && new Date(endDate) > new Date());
    }, [])

    const gamePictureStyle = {
        width: "30vw",
        height: "auto",
    }

    const gridW = "30vw"

    const gamePictureWrapperStyle = {
        display: "grid",
        gridTemplateColumns: `${gridW} ${gridW} ${gridW}`,
        gap: ".5rem",
        padding: ".75rem"
    }

    const placeholderImage = "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"

    return (
        <main>
            {
                useSearch &&
                <div>
                    <label>Search: </label>
                    <input value={searchVal} onChange={({target: {value}}) => setSearchVal(value)}/>
                </div>
            }
            <div>
                {receivedData
                    .map(({tournaments}) =>
                        getFiltered(tournaments, searchVal).map((tournament, tournamentIndex) => {
                            const {start_date, end_date, meta: {games}} = tournament;

                            return (
                                <div key={`tournament-wrapper-${tournamentIndex}`}>
                                    {
                                        checkDates(start_date, end_date) &&
                                        <MainTournament tournament={tournament}
                                                        key={`tournament-${tenantId}-${tournamentIndex}`}
                                        />
                                    }
                                    <div style={gamePictureWrapperStyle}>
                                        {
                                            games.map(game =>
                                                <PictureComponent key={`tournament-game-${tenantId}-${game}`}
                                                                  style={gamePictureStyle}
                                                                  altText={`game-number-${game}`}
                                                                  mobileSrc={placeholderImage}
                                                                  desktopSrc={placeholderImage}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </main>
    )
}

export default Main;

Main.defaultProps = {
    useSearch: false,
}

Main.propTypes = {
    useSearch: PropTypes.bool,
    useChooseTenant: PropTypes.bool,
    handleTenantChange: PropTypes.func,
    receivedData: PropTypes.any,
    tenantId: PropTypes.number
}

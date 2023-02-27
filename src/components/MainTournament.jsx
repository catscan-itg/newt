import PropTypes from "prop-types";
import PictureComponent from "./base/PictureComponent";

const MainTournament = ({tournament, mainTournamentKey}) => {
    console.log(tournament)
    const {name, meta: {ui: {details_bg_image: {url}}}} = tournament
    const mainTournamentStyle = {
        width: "100vw",
        height: "auto",
        marginBottom: "1rem"
    }

    return (
        <div key={mainTournamentKey}>
            <PictureComponent altText={name} desktopSrc={url} mobileSrc={url} style={mainTournamentStyle} />
        </div>
    )
}

export default MainTournament

MainTournament.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number
}

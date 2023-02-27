import PropTypes from "prop-types";

const Tournament = ({name}) => {
    return (
        <div>
            {name}
        </div>
    )
}

export default Tournament

Tournament.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number
}

import PropTypes from "prop-types";
import useMediaQuery from "../../hooks/useMediaQuery";

const PictureComponent = ({mobileSrc, desktopSrc, altText, ...props}) => {
    const {queries: {mobileQuery}} = useMediaQuery();

    return (
        <picture>
            <source srcSet={mobileSrc} media={mobileQuery}/>
            <img {...props} src={desktopSrc} alt={altText} title={altText}/>
        </picture>
    )
}


export default PictureComponent

PictureComponent.propTypes = {
    mobileSrc: PropTypes.string,
    desktopSrc: PropTypes.string,
    altText: PropTypes.string
}

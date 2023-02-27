import BurgerIcon from "../components/Nav/BurgerIcon";
import PictureComponent from "../components/base/PictureComponent";
import NavButtons from "../components/Nav/NavButtons";
import PropTypes from "prop-types";

const Header = ({name, url, useChooseTenant, tenantId, handleTenantChange}) => {

    const navStyle = {
        display: 'flex',
        flex: 1,
        minHeight: "90px",
        alignItems: "center",
        justifyContent: "space-between",
        padding: " 0 .7rem"
    }

    return (
            <header>
                <nav style={navStyle}>
                    <BurgerIcon />
                    <PictureComponent altText={name} desktopSrc={url} mobileSrc={url}/>
                    <NavButtons />
                </nav>
                {
                    useChooseTenant &&
                    <div>
                        <label>Choose Tenant: </label>
                        <input value={tenantId} type={"number"} step={1} min={1} onChange={handleTenantChange}/>
                    </div>
                }
            </header>
    )
}

export default Header

Header.defaultProps = {
    useChooseTenant: false
}

Header.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    useChooseTenant: PropTypes.bool,
    tenantId: PropTypes.number
}

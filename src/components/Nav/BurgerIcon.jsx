import {useEffect, useState} from "react";

const BurgerIcon = () => {
    const [openMenu, setOpenMenu] = useState(false)

    const burgerPlaceHolder = {
        backgroundColor: "white",
        height: "5px",
        width: "20px"
    }

    const buttonStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        background: "transparent",
        border: 0
    }

    const handleToggleMenu = () => setOpenMenu(prevState => !prevState)

    return (
        <button
            onClick={handleToggleMenu}
            style={buttonStyle}
            aria-expanded={openMenu}
            aria-label={"Open Menu"}
        >

            {openMenu ?
                <>
                   <div style={{...burgerPlaceHolder, transform: "rotate(45deg) translate(7px, 6px)"}} />
                   <div style={{...burgerPlaceHolder, transform: "rotate(135deg)"}} />
                </>
                :
                <>
                    <div style={burgerPlaceHolder}/>
                    <div style={burgerPlaceHolder}/>
                    <div style={burgerPlaceHolder}/>
                </>
            }
        </button>
    )
}

export default BurgerIcon;

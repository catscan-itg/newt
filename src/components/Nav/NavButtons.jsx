const NavButtons = () => {
    const handleLogin = () => console.log('will be logged in!')
    const handleSignup = () => console.log('will be signed up!')

    const buttonWrapperStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    const buttonStyle = {
        textTransform: "uppercase",
        color: "white",
        border: 0,
        borderRadius: ".25rem",
        padding: ".5rem",
        margin: ".5rem",
        fontSize: "10px"
    }

    return (
        <div style={buttonWrapperStyle}>
            <button onClick={handleLogin} style={{...buttonStyle, background: "linear-gradient(79deg,#ff7701,#ffc200)"}}>
                Inregistrare
            </button>
            <button onClick={handleSignup} style={{...buttonStyle, background: "linear-gradient(79deg,#0e8541,#15d600)"}}>
                Conectare
            </button>
            {/*<button>*/}
            {/*</button>*/}
        </div>
    )
}

export default NavButtons;

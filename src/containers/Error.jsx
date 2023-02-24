const Error = ({ error }) => {
    return (
        <>
            <h1 style={{ color: "#FF0000" }}>
                Oops! There was an error :(
            </h1>
            <h4>
                {error.message}
            </h4>
        </>
    )
}
export default Error;
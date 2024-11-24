export const StartGame = ({clickUser}) => {
    return (
        <>
        <h1 className="mb-5 font-semibold">Ready to play ?</h1>
        <button onClick={clickUser}>Start the game</button>
        </>
    )
}
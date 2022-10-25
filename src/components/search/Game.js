import "./Game.css"

export const Game = ({ gameObj }) => {
    return <div>
    <img className="game" src={gameObj.cover?.url} alt={gameObj.name}></img>
    </div>
}
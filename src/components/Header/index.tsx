import { Wallet } from "../Wallet"
import './styles.css'

export const Header = () => {

  return (
    <header>
      <div className="Container">
        <div className="Title">PlatziChallenge Proposal</div>
        <Wallet />
      </div>
    </header>
  )

}

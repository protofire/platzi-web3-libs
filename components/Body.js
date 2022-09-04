import React from "react"
//import Tarjeton from "./Tarjeton"
import { Dropdown } from "web3uikit"

const Body = (props) => {
    return (
        <div className="bg-slate-400 bg-repeat h-full overflow-auto w-full pt-1">
            <div>{props.children}</div>
        </div>
    )
}

export default Body

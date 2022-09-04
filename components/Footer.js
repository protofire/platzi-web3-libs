import React from "react"
import { FaVoteYea } from "react-icons/fa"
import { IoMdFlower } from "react-icons/io"

const Footer = () => {
    return (
        <div className="p-2 bg-cyan-800">
            <footer className="rounded-lg shadow md:flex md:items-center md:justify-between md:p-2 dark:bg-cyan-800">
                <span className="text-sm text-slate-200 sm:text-center dark:text-slate-200">
                    <a href="#" className="hover:underline flex items-center">
                        <FaVoteYea size={26} />
                        <span className="text-1xl hover:text-base pl-2">
                            Proposal - 2022
                        </span>
                    </a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-slate-200 dark:text-slate-200 sm:mt-0">
                    <li>
                        <a></a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer

import React, { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { ConnectButton, Button } from "web3uikit"
import Link from "next/link"

const DropDown = () => {
    const [mostrar, setMostrar] = useState(false)
    return (
        <div className="absolute">
            <div className="w-44 flex justify-end pr-2">
                <GiHamburgerMenu size={30} onClick={() => setMostrar(!mostrar)} />
            </div>
            {mostrar && (
                <div className="absolute bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 mt-2 w-44">
                    <div className="pr-16">
                        <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
                            <div>Wallet</div>
                            <div class="font-medium truncate">0x0000..0000</div>
                        </div>
                        <ul
                            class="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDividerButton"
                        >
                            <li class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <Link href="/">Tarjetón</Link>
                            </li>
                            <li class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <Link href="/Estadisticas">Estadisticas</Link>
                            </li>
                            <li class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <Link href="/Candidatos">Candidatos</Link>
                            </li>
                        </ul>
                        <div class="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            <ConnectButton moralisAuth={false} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropDown

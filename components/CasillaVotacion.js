import React from "react"
import { Card, Illustration } from "web3uikit"
import Image from "next/image"

const CasillaVotacion = ({ id, nombre, imagen, votos, marcado, seleccionarCantidato }) => {
    return (
        <div className="m-1">
            <Card
                onClick={function noRefCheck() {}}
                setIsSelected={function noRefCheck() {}}
                title={
                    <div className="pt-2">
                        <div className="bg-cyan-800 text-slate-200 rounded-md">
                            {votos}
                        </div>
                    </div>
                }
                tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
            >
                <div onClick={() => seleccionarCantidato(id)}>
                    <div className={`mt-7 flex ${marcado}`}>
                        <div className="flex flex-col flex-1">
                            <Image
                                loader={() => imagen}
                                src={imagen}
                                height="140"
                                width="170"
                            />
                            <span className="font-bold text-xs text-center pr-1">{nombre}</span>
                        </div>
                        
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CasillaVotacion

import React, { useState, useEffect } from "react"
import { FaClipboardList } from "react-icons/fa"
import { AiOutlineQrcode } from "react-icons/ai"
import CasillaVotacion from "./CasillaVotacion"
import { Card, Illustration, Loading } from "web3uikit"
import Image from "next/image"
import SelectLibreria from "./SelectLibreria"

import { useCustomWeb3React } from '../hooks'
import { ethers } from "ethers"
import Web3 from "web3"

import { PROPOSAL_ADDRESS, ABI, getInfuraUrl } from "../constants"

const OPCIONES = [ 
    {
        id: 1,
        nombre: "NO", 
        imagen: "https://static.vecteezy.com/system/resources/previews/001/192/259/non_2x/no-png.png",
        votos: 0
    },
    {
        id: 2,
        nombre: "SI", 
        imagen: "http://4.bp.blogspot.com/-SPni0Efp2CQ/UE95WwoteKI/AAAAAAAAA_o/lbojFC6AqIc/s1600/si.jpg",
        votos: 0
    }    
]



const Tarjeton =  () => {
    const { account, library, chainId} = useCustomWeb3React()

    const [candidatoSel, setCantidatoSel] = useState(-1)

    const [candidatos, setCandidatos] = useState(OPCIONES)

    const [isProcesando, setIsProcesando] = useState(false)

    useEffect(() => {
        validarVotos()
        setIsProcesando(false)

        const interval = setInterval(async () => {
            //setIsProcesando(true)
            await validarVotos()
            //setIsProcesando(false)
          }, 1000);
          return () => clearInterval(interval);
        
    }, [])
    


    const seleccionarCantidato = async (id) => {
        setIsProcesando(true)
        setCantidatoSel(id)

        let libactual = window.localStorage.getItem("libreriaactual")
        console.log(`${libactual} - ${id}`)

        if(libactual == "web3") { 
            if (typeof window.ethereum !== "undefined")
            {
                
                var web3 = new Web3("https://eth-goerli.g.alchemy.com/v2/21qf2ZQpnTmGiFzeOL0sygSBE0vvPMtw");
                let Contract = web3.eth.Contract

                Contract.setProvider(window.ethereum)

                let contrato = new Contract(ABI, PROPOSAL_ADDRESS[chainId])

                
                contrato.methods.vote(id).send({from: account, gas: "200000", value: "10000000000000000"})
                .on('receipt', function(){
                    setCantidatoSel(-1)
                    validarVotos()
                    setIsProcesando(false)
                });
            }
            
        }

        if(libactual == "ethers") {
           
            if (typeof window.ethereum !== "undefined")
            {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(PROPOSAL_ADDRESS[chainId], ABI, signer)

                try {
                    await contract.vote(
                        id.toString(),   
                        {value: "10000000000000000"}                                       
                    )
                    await listenForTransactionMine(transactionResponse, provider)
                    setCantidatoSel(-1)
                    validarVotos()
                    setIsProcesando(false)
                } catch (error) {
                    setCantidatoSel(-1)
                    setIsProcesando(false)
                }
            }
        }

        function listenForTransactionMine(transactionResponse, provider) {
            console.log(`Mining ${transactionResponse.hash}`)
            return new Promise((resolve, reject) => {
              provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                  `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
              })
            })
          }
    }

    const validarVotos = async () => {
        setIsProcesando(true)
        let libactual = window.localStorage.getItem("libreriaactual")
        if(libactual == "web3") { 
            if (typeof window.ethereum !== "undefined")
            {                
                var web3 = new Web3("https://eth-goerli.g.alchemy.com/v2/21qf2ZQpnTmGiFzeOL0sygSBE0vvPMtw");
                let Contract = web3.eth.Contract

                Contract.setProvider(window.ethereum)

                let contrato = new Contract(ABI, PROPOSAL_ADDRESS[5])

                    contrato.methods
                        .votesForNo()
                        .call()
                        .then((result) => {
                            let candidatosNew = [...candidatos]
                            candidatosNew[0].votos = result
                            setCandidatos(candidatosNew);
                        }).catch(console.log)

                    contrato.methods
                        .votesForYes()
                        .call()
                        .then((result) => {
                            let candidatosNew = [...candidatos]
                            candidatosNew[1].votos = result
                            setCandidatos(candidatosNew);
                            
                        }).catch(setIsProcesando(false))

                        setIsProcesando(false)
            }
            
        }

        if(libactual == "ethers") {
            if (typeof window.ethereum !== "undefined")
            {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(PROPOSAL_ADDRESS[5], ABI, signer)

                try {
                    let votesNo = await contract.votesForNo()
                    let votesYes = await contract.votesForYes()
                

                    let candidatosNew = [...candidatos]
                    candidatosNew[0].votos = parseInt(votesNo)
                    candidatosNew[1].votos = parseInt(votesYes)
                    setCandidatos(candidatosNew);
                } catch (error) {
                    
                }
            }
        }
    }
    

    return (
        <div className="flex justify-center drop-shadow-md">
            <div className="max-w-3xl h-full bg-slate-400">
                <div className="flex justify-center">
                    <div className="flex justify-start items-center px-2 bg-cyan-800 text-white">
                        <FaClipboardList size={30} />
                        <div className="flex flex-col items-center">
                            <span className="text-sm">Proposal</span>
                            <div className="font-bold">2022</div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-center items-center px-2 bg-cyan-50 text-cyan-800">
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-center tracking-tighter font-bold">
                            ALLOW USERS TO VOTE ON A PROPOSAL FOR YES OR NO
                            </span>
                            <span className="text-xs font-semibold">The user has to pay a fee to vote</span>
                        </div>
                    </div>
                    <div className="flex justify-end items-center px-2 bg-cyan-50 text-cyan-800">
                        <div className="flex flex-col items-center">
                      
                            <SelectLibreria />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-center flex-wrap bg-slate-400">
                        {candidatos.map((o, index) => (
                            <CasillaVotacion
                                key={index}
                                id={o.id}
                                nombre={o.nombre}
                                imagen={o.imagen}
                                votos={o.votos}
                                marcado={candidatoSel == o.id ? "marcado" : ""}
                                seleccionarCantidato={seleccionarCantidato}
                            />
                        ))}       
                                   
                    </div>
                    
                </div>
                <div className="flex justify-center text-white font-bold">
                    {isProcesando && <div className="flex">
                        <span className="px-2">Procesando</span>  
                       
                        <Loading
                        size={12}
                        spinnerColor="#FFF"
                        spinnerType="wave"
                        />
                    </div>}
                    
                </div>
                
            </div>
        </div>
    )
}

export default Tarjeton

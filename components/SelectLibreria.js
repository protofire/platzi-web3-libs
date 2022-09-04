import React, {useEffect} from 'react'
import { Select } from 'web3uikit'
import Image from "next/image"

const WEB3_IMG = "https://lh3.googleusercontent.com/g6giBKVbSnaReOX0SA_2-SDHBRWYG4gwzXVmNtf5SToyWIXoXNWZzJUNhdpb1Mnf0BqMXmiuFT_MFQnrK9c-LEffJL5I3bXP9VCWT60=w600";
const ETHERS_IMG = "https://res.cloudinary.com/divzjiip8/image/upload/v1624392472/logos/ethers_blue.png"

const SelectLibreria = () => {

  const seleccionarLibreriaActual = (lib) => {
    //console.log(lib)

    window.localStorage.setItem("libreriaactual", lib)
  }  

  useEffect(() => {
    seleccionarLibreriaActual("web3");
  }, [])

  return (
    <div className='py-1'>
        <Select
        width='100px'
            defaultOptionIndex={0}
            id="Select"
            label=""
            onBlurTraditional={(e) => seleccionarLibreriaActual(e.id)}
            onChange={(e) => seleccionarLibreriaActual(e.id)}
            //onChangeTraditional={(e) => seleccionarLibreriaActual(e)}
            options={[
                {
                id: 'web3',
                label: <div className='flex '>
                            <div className=' w-14'>
                                <Image
                                    loader={() => WEB3_IMG}
                                    src={WEB3_IMG}
                                    height="30"
                                    width="40"
                                />
                            </div>
                        </div>
                },
                {
                    id: 'ethers',
                    label: <div className='flex '>
                                <div className=' w-14'>
                                    <Image
                                        loader={() => ETHERS_IMG}
                                        src={ETHERS_IMG}
                                        height="30"
                                        width="40"
                                    />
                                </div>
                            </div>
                   
                    },
            ]}
            />
    </div>
  )
}

export default SelectLibreria
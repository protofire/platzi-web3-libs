import React from "react"
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from "react-vis"

const EstadisticaCandidatos = () => {
    return (
        <div>
            <XYPlot width={1000} height={300}>
                <HorizontalGridLines />
                <LineSeries
                    data={[
                        { x: 1, y: 10 },
                        { x: 2, y: 5 },
                        { x: 3, y: 15 },
                        { x: 4, y: 17 },
                        { x: 5, y: 18 },
                        { x: 6, y: 19 },
                    ]}
                />
                <LineSeries
                    data={[
                        { x: 1, y: 7 },
                        { x: 2, y: 15 },
                        { x: 3, y: 15 },
                        { x: 4, y: 17 },
                        { x: 5, y: 19 },
                        { x: 6, y: 21 },
                    ]}
                />
                <LineSeries
                    data={[
                        { x: 1, y: 1 },
                        { x: 2, y: 10 },
                        { x: 3, y: 12 },
                        { x: 4, y: 15 },
                        { x: 5, y: 17 },
                        { x: 6, y: 19 },
                    ]}
                />
                <XAxis />
                <YAxis />
            </XYPlot>
        </div>
    )
}

export default EstadisticaCandidatos

import React from "react"
import { Table, Avatar, Typography, Button } from "web3uikit"

const ListaCandidatos = () => {
    return (
        <div className="p-2">
            <Typography variant="h2" color="white" className="px-2 py-4">
                Candidatos
            </Typography>
            <Table
                alignCellItems="center"
                columnsConfig="3fr 2fr 2fr 0.7fr"
                data={[
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            11/1/2018, 6:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392112
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                text="Delete"
                                ////icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            1/5/2022, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392114
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                ////icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            21/2/2020, 12:27:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392118
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                ////icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            6/6/2019, 13:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392119
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            11/1/2019, 15:04:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392120
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            8/5/2020, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392122
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            21/6/2020, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392124
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            3/5/2022, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392125
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            18/3/2022, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392126
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            2/3/2018, 18:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392127
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            21/5/2022, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392128
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            11/8/2021, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392129
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            10/11/2019, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392130
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                    [
                        <>
                            <Avatar isRounded size={36} theme="image" />
                            <div style={{ marginLeft: "16px" }}>
                                <Typography color="#041836" variant="body16">
                                    Moralis Magi
                                </Typography>
                            </div>
                        </>,
                        <Typography color="#68738D" variant="body16">
                            8/10/2022, 16:24:00
                        </Typography>,
                        <Typography color="#68738D" variant="body16">
                            120392131
                        </Typography>,
                        <>
                            <Button color="blue" disabled isTransparent size="small" text="Edit" />
                            <Button
                                disabled
                                //icon={<SvgCross fontSize={18} />}
                                iconColor="red"
                                iconLayout="icon-only"
                                isTransparent
                            />
                        </>,
                    ],
                ]}
                header={[
                    <span>Description</span>,
                    <span>Last Synced</span>,
                    <span>Queue</span>,
                    <Button color="blue" theme="colored" size="small" text="+ Crear" />,
                ]}
                isColumnSortable={[false, true, true, false]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={5}
            />
        </div>
    )
}

export default ListaCandidatos

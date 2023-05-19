import React from "react";
import Stack from 'react-bootstrap/Stack';

export default function Result(props) {
    return (
        <Stack id={props.id} direction="horizontal" gap={1}>
            <div><img src={props.iconUrl} alt="favicon" /></div>
            <div className="vr" />
            <div>{props.title}</div>
        </Stack>
    );
}

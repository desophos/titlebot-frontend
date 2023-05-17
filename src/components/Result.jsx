import React from "react";

export default function Result(props) {
    return (
        <li id={props.id}>
            <img src={props.iconUrl} />
            <span> | </span>
            <span>{props.title}</span>
        </li>
    );
}

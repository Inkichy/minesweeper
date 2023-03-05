import './smiles.css';

import {useEffect, useState} from "react";

const Smiles = (props) => {
    const [smileType, setSmileType] = useState('normal')

    useEffect(() => {
        setSmileType(props.type);
    }, [props]);


    return (
        <div className={'smiles ' + smileType} />
    )
}

export default Smiles;
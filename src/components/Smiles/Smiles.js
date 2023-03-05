import './smiles.css';

import {useEffect, useState} from "react";

import {SmilesType} from "../../assets/js/const";

const Smiles = (props) => {
    const [smileType, setSmileType] = useState(SmilesType.NORMAL)

    useEffect(() => {
        setSmileType(props.type);
    }, [props]);


    return (
        <div className={'smiles ' + smileType} />
    )
}

export default Smiles;
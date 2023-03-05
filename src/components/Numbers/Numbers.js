import './numbers.css';

import {useEffect, useState} from "react";

import {getNumberClass} from "../../assets/js/utils";

const Numbers = (props) => {
    const [number, setNumber] = useState('000')

    useEffect(() => {
        initNumbers();
    }, [props]);

    const initNumbers = () => {
        let numbersArr = props.number
            .toString()
            .split('');

        while (numbersArr.length < 3) {
            numbersArr.unshift('0');
        }

        setNumber(numbersArr.join(''));
    }

    const getClass = (number) => {
        return getNumberClass(number);
    }

    return (
        <>
            <div className={'numbers ' + getClass(parseInt(number.split('')[0]))} />
            <div className={'numbers ' + getClass(parseInt(number.split('')[1]))} />
            <div className={'numbers ' + getClass(parseInt(number.split('')[2]))} />
        </>
    )
}

export default Numbers;
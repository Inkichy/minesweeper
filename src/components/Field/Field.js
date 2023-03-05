import './fields.css';

import {useEffect, useState} from "react";

import {FieldType, SmilesType} from "../../assets/js/const";
import {getFieldNumberClass} from "../../assets/js/utils";

const Field = (props) => {
    const [fieldClass, setFieldClass] = useState('hidden');
    const [type, setType] = useState(FieldType.EMPTY);
    const [status, setStatus] = useState(false);
    const [flag, setFlag] = useState(false);
    const [question, setQuestion] = useState(false);
    const [neighbors, setNeighbors] = useState(0);
    const [endGame, setEndGame] = useState(false);

    useEffect(() => {
        initField();
    }, [props, endGame]);

    const initField = () => {
        setType(props.field.type);
        setStatus(props.field.status);
        setFlag(props.field.flag);
        setQuestion(props.field.question);
        setNeighbors(props.field.neighbors);
        setEndGame(props.field.endGame);
        getClass(props.field);
    }

    const getClass = (entity) => {
        if (entity.endGame) {
            if (entity.type === FieldType.BOMB_BOOM) {
                setFieldClass(entity.type);
            } else if (entity.type === FieldType.BOMB_CLEARED) {
                setFieldClass(entity.type);
            } else {
                setFieldClass(getNeighborsClass(entity.neighbors));
            }
        } else if (entity.status) {
            setFieldClass(getNeighborsClass(entity.neighbors));
        } else if (!entity.status && entity.flag) {
            setFieldClass(FieldType.FLAG);
        } else if (!entity.status && entity.question) {
            setFieldClass(FieldType.QUESTION);
        } else {
            setFieldClass('hidden');
        }
    }

    const getNeighborsClass = (neighbors) => {
        return getFieldNumberClass(neighbors);
    }

    const leftClick = () => {
        if (!flag && !question && !endGame) {
            setStatus(true);
            setFieldClass(getNeighborsClass(neighbors));
            updateField(type, true, false,false);
        }
    }

    const rightCLick = (event) => {
        if (!status && !endGame) {
            event.preventDefault();

            if (!flag && !question) {
                let newType = type === FieldType.BOMB ? FieldType.BOMB_CLEARED : type;

                setType(newType);
                setFlag(true);
                setFieldClass(FieldType.FLAG);
                updateField(type, false, true, false);
            } else if (flag && !question) {
                let newType = type === FieldType.BOMB_CLEARED ? FieldType.BOMB : type;

                setType(newType);
                setFlag(false);
                setQuestion(true);
                setFieldClass(FieldType.QUESTION);
                updateField(newType, false, false, true);
            } else if(!flag && question) {
                setQuestion(false);
                setFieldClass('hidden');
                updateField(type, false, false, false);
            }
        }
    }

    const updateField = (type, status, flag, question) => {
        props.updateField({
            type,
            status,
            flag,
            question,
        });
    }

    const updateSmile = (smile) => {
        props.updateSmile(smile);
    }

    return (
        <div onClick={() => leftClick()}
             onMouseDown={() => {
                 updateSmile(SmilesType.SCARY)
             }}
             onMouseUp={() => {
                 updateSmile(SmilesType.NORMAL);
             }}
             onMouseLeave={() => {
                 updateSmile(SmilesType.NORMAL);
             }}
             onContextMenu={event => rightCLick(event)}
             className={'fields ' + fieldClass}
        />
    );
}

export default Field;
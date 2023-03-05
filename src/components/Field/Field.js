import './fields.css';

import {useEffect, useState} from "react";
import {getFieldNumberClass} from "../../assets/utils";

const Field = (props) => {
    const [fieldClass, setFieldClass] = useState('hidden');
    const [type, setType] = useState('empty');
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
            if (entity.type === 'bomb-boom') {
                setFieldClass(entity.type);
            } else if (entity.type === 'bomb-cleared') {
                setFieldClass(entity.type);
            } else {
                setFieldClass(getNeighborsClass(entity.neighbors));
            }
        } else if (entity.status) {
            setFieldClass(getNeighborsClass(entity.neighbors));
        } else if (!entity.status && entity.flag) {
            setFieldClass('flag');
        } else if (!entity.status && entity.question) {
            setFieldClass('question');
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
                let newType = type === 'bomb' ? 'bomb-cleared' : type;

                setType(newType);
                setFlag(true);
                setFieldClass('flag');
                updateField(type, false, true, false);
            } else if (flag && !question) {
                let newType = type === 'bomb-cleared' ? 'bomb' : type;

                setType(newType);
                setFlag(false);
                setQuestion(true);
                setFieldClass('question');
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
                 updateSmile('scary')
             }}
             onMouseUp={() => {
                 updateSmile('normal');
             }}
             onMouseLeave={() => {
                 updateSmile('normal');
             }}
             onContextMenu={event => rightCLick(event)}
             className={'fields ' + fieldClass}
        />
    );
}

export default Field;
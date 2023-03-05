import './App.css';
import {useEffect, useRef, useState} from "react";

import Field from "./components/Field/Field";
import Numbers from "./components/Numbers/Numbers";
import Smiles from "./components/Smiles/Smiles";

import {generateAreaArray} from "./assets/utils";

const App = () => {
    const [area, setArea] = useState([]);
    const [firstClick, setFirstClick] = useState(true);
    const [smileClass, setSmileClass] = useState('normal');
    const [progress, setProgress] = useState(false);
    const [flags, setFlag] = useState(0);
    const [timer, setTimer] = useState(0);
    const tick = useRef(null);

    const bombsOnArea = 40;
    let openFieldCounter;

    useEffect(() => {
        initArea();
    }, []);

    const initArea = () => {
        updateArea(generateAreaArray());
    }

    const initBombs = (areaArray, firstObject,bombCount = bombsOnArea) => {
        let bombCounter = bombCount;

        while (bombCounter) {
            const row = Math.floor(Math.random() * 16);
            const field = Math.floor(Math.random() * 16);
            const entity = areaArray[row][field];

            if (entity.type === 'empty' && !entity.status && firstObject.row !== row && firstObject.field !== field) {
                entity.type = 'bomb';
                entity.neighbors = -1;
                incrementNeighbors(row + 1, field, areaArray);
                incrementNeighbors(row - 1, field, areaArray);
                incrementNeighbors(row, field + 1, areaArray);
                incrementNeighbors(row, field - 1, areaArray);
                incrementNeighbors(row + 1, field - 1, areaArray);
                incrementNeighbors(row - 1, field - 1, areaArray);
                incrementNeighbors(row + 1, field + 1, areaArray);
                incrementNeighbors(row - 1, field + 1, areaArray);
                bombCounter--;
                updateArea(areaArray);
            }
        }
    }

    const initTimer = () => {
        let ticks = 0;

        tick.current = setInterval(() => {
            if (ticks !== 999) {
                setTimer((timer) => timer + 1);
            } else {
                clearInterval(tick.current);
            }

            ticks++;
        }, 1000);
    }

    const incrementNeighbors = (row, field, areaArray) => {
        if (row >= 0 && row < 16 && field >= 0 && field < 16) {
            if (areaArray[row][field].type !== 'bomb') {
                return areaArray[row][field].neighbors++;
            }
        }
    }

    const updateArea = (callback) => {
        if (progress) {
            const fullArea = [].concat(...callback);
            openFieldCounter = fullArea.filter(item => item.status).length;

            if (openFieldCounter === (256 - bombsOnArea)) {
                winGame();
            }
        }

        setArea(callback.slice());
    }

    const updateField = (callback, row, field) => {
        let entity = area[row][field];

        if (firstClick) {
            setFirstClick(false);
            setProgress(true);
            entity.type ='empty';
            entity.flag = false;
            entity.question = false;

            initBombs(area,{row, field});
            openFields(row, field, area);
            initTimer();
        } else {
            entity.type = callback.type;
            entity.question = callback.question;
            if (flags < bombsOnArea) {
                entity.flag = callback.flag;
            } else if (flags >= bombsOnArea && !callback.flag) {
                entity.flag = callback.flag;
            }

            if (entity.type === 'bomb' && !callback.flag && !callback.question && callback.status) {
                loseGame(row, field);
            }
            if (!callback.flag && !callback.question && callback.status) {
                openFields(row, field, area);
            }

            setFlag([].concat(...area).filter(item => item.flag).length);
        }

    }

    const openFields = (row, field, areaArray) => {
        const stack = [];
        const add = (row, field) => {
            if (row >= 0 && row < 16 && field >= 0 && field < 16) {
                if (areaArray[row][field].status) return;

                stack.push([row, field]);
            }
        }

        add(row, field);

        while (stack.length) {
            const [row, field] = stack.pop();
            const entity = areaArray[row][field];
            entity.status = true;

            if (entity.neighbors === 0) {
                add(row + 1, field);
                add(row - 1, field);
                add(row, field + 1);
                add(row, field - 1);
                add(row + 1, field - 1, areaArray);
                add(row - 1, field - 1, areaArray);
                add(row + 1, field + 1, areaArray);
                add(row - 1, field + 1, areaArray);
            }
            updateArea(areaArray);
        }
    }

    const restartGame = () => {
        setTimer(0);
        setFirstClick(true);
        setSmileClass('normal');
        setFlag(0);
        openFieldCounter = 0;
        initArea();
    }

    const winGame = () => {
        if (progress) {
            let areaArray = area.slice();

            for (let row of areaArray) {
                for (let field of row) {
                    if (field.type === 'bomb') field.type = 'bomb-cleared';
                    field.endGame = true;
                }
            }
            setFlag(bombsOnArea);
            setProgress(false);
            setSmileClass('cool');
            clearInterval(tick.current);
            updateArea(areaArray);
        }
    }

    const loseGame = (row, field) => {
        let areaArray = area.slice();

        for (let row of areaArray) {
            for (let field of row) {
                if (field.type === 'bomb' && field.flag) field.type = 'bomb-cleared';
                field.endGame = true;
            }
        }

        areaArray[row][field].type = 'bomb-boom';
        setProgress(false);
        setSmileClass('die');
        clearInterval(tick.current);
        updateArea(areaArray);
    }

  return (
    <div className="minesweeper__container">
        <div className="minesweeper__header flex justify-content-between">
            <div className="minesweeper__counter flex">
                <Numbers number={flags - bombsOnArea} />
            </div>

            <div className="minesweeper__smile">
                <Smiles onClick={restartGame} type={smileClass} />
            </div>

            <div className="minesweeper__timer flex">
                <Numbers number={timer} />
            </div>
        </div>
        {<div className="minesweeper__area">
            {area.map((row, rowIndex) => {
                return <div className="minesweeper__row flex"
                            key={rowIndex}>
                    {row.map((field, fieldIndex) => {
                        return <Field
                            field={field}
                            updateField={(callback) => updateField(callback, rowIndex, fieldIndex)}
                            updateSmile={(callback) => {
                                if (progress && !field.status) {
                                    setSmileClass(callback)
                                }
                            }}
                            key={rowIndex + fieldIndex * 10}
                        />
                    })}
                </div>
            })}
        </div>}
    </div>
  );
}

export default App;

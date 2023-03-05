import {Config, FieldType} from "./const";

export const generateAreaArray = () => {
    return Array.from({length: Config.SIDE}
        , () => Array.from({length: Config.SIDE}
            , () => ({
                type: FieldType.EMPTY,
                status: false,
                flag: false,
                question: false,
                neighbors: 0,
                endGame: false
            })));
}

export const getFieldNumberClass = (number) => {
    switch (number) {
        case -1:
            return FieldType.BOMB;
        case 0:
            return FieldType.EMPTY;
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        case 6:
            return 'six';
        case 7:
            return 'seven';
        case 8:
            return 'eight';
        default:
            return FieldType.EMPTY;
    }
}

export const getNumberClass = (number) => {
    switch (number) {
        case 0:
            return 'zero';
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        case 6:
            return 'six';
        case 7:
            return 'seven';
        case 8:
            return 'eight';
        case 9:
            return 'nine';
        default:
            return 'zero';
    }
}
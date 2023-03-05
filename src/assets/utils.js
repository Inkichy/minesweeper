export const generateAreaArray = () => {
    return Array.from({length: 16}
        , () => Array.from({length: 16}
            , () => ({
                type: 'empty',
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
            return 'bomb';
        case 0:
            return 'empty';
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
            return 'empty';
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
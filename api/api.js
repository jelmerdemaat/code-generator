'use strict';

let alphabet;

// Source of CaesarCipher function: http://stackoverflow.com/a/33948669
function CaesarCipher(str, num) {
    let newStr = '', i = 0;

    for (i; i < str.length; i++) {
        let char = String(str[i]);
        let isUpper = String(char) === String(char).toUpperCase()
            ? true
            : false;

        char = char.toLowerCase();

        if (alphabet.indexOf(char) > -1) {
            let newIndex = alphabet.indexOf(char) + num;

            if (newIndex < alphabet.length) {
                isUpper
                    ? (newStr += alphabet[newIndex].toUpperCase())
                    : (newStr += alphabet[newIndex]);
            } else {
                let shiftedIndex = -(alphabet.length - newIndex);
                isUpper
                    ? (newStr += alphabet[shiftedIndex].toUpperCase())
                    : (newStr += alphabet[shiftedIndex]);
            }
        } else {
            if (char === '\n') {
                newStr += '<br>';
            } else {
                newStr += char;
            }
        }
    }

    return newStr;
}

module.exports = data => {
    return new Promise((resolve, reject) => {
        if (!data.transform_start) {
            reject(Error('No "transform start" given'));
        }

        if (!data.transform_end) {
            reject(Error('No "transform end" given'));
        }

        if (!data.alphabet) {
            reject(Error('No "alphabet" given'));
        }

        alphabet = data.alphabet;

        let step = alphabet.indexOf(data.transform_end.toLowerCase()) -
            alphabet.indexOf(data.transform_start.toLowerCase());

        resolve(CaesarCipher(data.input, step));
    });
};

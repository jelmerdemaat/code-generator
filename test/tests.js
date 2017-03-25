const test = require('ava'),
      api = require('../api/api'),
      alphabetOnlyLetters = 'abcdefghijklmnopqrstuvwxyz',
      alphabetAlsoNumbers = 'abcdefghijklmnopqrstuvwxyz1234567890';

test('Move from A to B', t => {
    return api({
        input: 'a',
        transform_start: 'a',
        transform_end: 'b',
        alphabet: alphabetOnlyLetters
    }).then(output => {
        t.is(output, 'b');
    })
});

test('Move from A to X', t => {
    return api({
        input: 'a',
        transform_start: 'a',
        transform_end: 'x',
        alphabet: alphabetOnlyLetters
    }).then(output => {
        t.is(output, 'x');
    })
});

test('Move from F to 9', t => {
    return api({
        input: 'f',
        transform_start: 'f',
        transform_end: '9',
        alphabet: alphabetAlsoNumbers
    }).then(output => {
        t.is(output, '9');
    })
});

test('Transform the word `code` to `frgh` (from a to d)', t => {
    return api({
        input: 'code',
        transform_start: 'a',
        transform_end: 'd',
        alphabet: alphabetOnlyLetters
    }).then(output => {
        t.is(output, 'frgh');
    })
});

test('Transform the word `jelmer` to `cxefxk` (from f to y)', t => {
    return api({
        input: 'jelmer',
        transform_start: 'f',
        transform_end: 'y',
        alphabet: alphabetOnlyLetters
    }).then(output => {
        t.is(output, 'cxefxk');
    })
});

test('Transform the sentence `Jelmer has 3 cats` to `Rmtumz pi1 A ki21` (from h to p)', t => {
    return api({
        input: 'Jelmer has 3 cats',
        transform_start: 'h',
        transform_end: 'p',
        alphabet: alphabetAlsoNumbers
    }).then(output => {
        t.is(output, 'Rmtumz pi1 A ki21');
    })
});

test('Transform the sentence `100 is more than 42, always!` to `AJJ s3 wy2o 4rkx DB, kv7k93!` (from t to 4)', t => {
    return api({
        input: '100 is more than 42, always!',
        transform_start: 't',
        transform_end: '4',
        alphabet: alphabetAlsoNumbers
    }).then(output => {
        t.is(output, 'AJJ s3 wy2o 4rkx DB, kv7k93!');
    })
});

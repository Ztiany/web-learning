import {generate} from '../lib/generator.js';
import {createRandomPicker} from '../lib/random.js';

const defaultCorpus = require('../corpus/data.json');

async function loadCorpus(corpusPath) {
    if (corpusPath) {
        return await (await fetch(corpusPath)).json();
    }
    return defaultCorpus;
}

export {generate, createRandomPicker, loadCorpus};
import {createRandomPicker} from "./lib/random.js";
import {generate} from "./lib/generator.js";
import {loadCorpus, saveArticle} from "./lib/corpus.js";
import {options} from "./lib/cmd.js";

const corpus = loadCorpus("corpus/data.json");
const titlePicker = createRandomPicker(corpus.title);
const title = options.title || titlePicker();
const article = generate(title, {corpus, ...options})
const savedFile = saveArticle(title, article)

console.log(`文章已经保存到：${savedFile}`)

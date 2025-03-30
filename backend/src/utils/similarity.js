import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const stopwords = new Set(natural.stopwords);

export function preprocess(text) {
    let tokens = tokenizer.tokenize(text.toLowerCase()); // Lowercase & tokenize
    tokens = tokens.filter(word => !stopwords.has(word)); // Remove stopwords
    return tokens.join(" ");
}

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

export function calculateSimilarity(text1, text2) {
    text1 = preprocess(text1);
    text2 = preprocess(text2);

    tfidf.addDocument(text1);
    tfidf.addDocument(text2);

    let vector1 = [];
    let vector2 = [];

    tfidf.listTerms(0).forEach(item => vector1.push(item.tfidf));
    tfidf.listTerms(1).forEach(item => vector2.push(item.tfidf));

    const similarity = natural.JaroWinklerDistance(vector1.toString(), vector2.toString());
    return similarity;
}
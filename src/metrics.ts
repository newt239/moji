const wordSegmenter = new Intl.Segmenter("ja", { granularity: "word" });
const sentenceSegmenter = new Intl.Segmenter("ja", { granularity: "sentence" });
const encoder = new TextEncoder();

export type MemoMetrics = {
  characters: number;
  charactersWithoutSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  kanji: number;
  hiragana: number;
  katakana: number;
  alphabets: number;
  digits: number;
  symbols: number;
  spaces: number;
  others: number;
  bytes: number;
  averageSentenceLength: number;
  longestSentenceLength: number;
  averageParagraphLength: number;
  manuscriptPages: number;
  readingSeconds: number;
};

export function calculateMetrics(text: string): MemoMetrics {
  const lines = text === "" ? [] : text.split("\n");
  const paragraphs = lines.filter((line) => line.trim() !== "").length;

  let characters = 0;
  let charactersWithoutSpaces = 0;
  let kanji = 0;
  let hiragana = 0;
  let katakana = 0;
  let alphabets = 0;
  let digits = 0;
  let symbols = 0;
  let spaces = 0;
  let others = 0;

  for (const char of text) {
    if (char === "\n") continue;
    characters += 1;
    if (/\s/u.test(char)) {
      spaces += 1;
      continue;
    }
    charactersWithoutSpaces += 1;
    // 「。」などの約物はScript_ExtensionsにHanを含むため文字種より先に記号として判定する
    if (/\p{P}|\p{S}/u.test(char)) {
      symbols += 1;
    } else if (/\p{Nd}/u.test(char)) {
      digits += 1;
    } else if (/\p{scx=Han}/u.test(char)) {
      kanji += 1;
    } else if (/\p{scx=Katakana}/u.test(char)) {
      katakana += 1;
    } else if (/\p{scx=Hiragana}/u.test(char)) {
      hiragana += 1;
    } else if (/\p{scx=Latin}/u.test(char)) {
      alphabets += 1;
    } else {
      others += 1;
    }
  }

  let words = 0;
  for (const segment of wordSegmenter.segment(text)) {
    if (segment.isWordLike) words += 1;
  }

  let sentences = 0;
  let longestSentenceLength = 0;
  for (const segment of sentenceSegmenter.segment(text)) {
    const trimmed = segment.segment.trim();
    if (trimmed === "") continue;
    sentences += 1;
    const length = [...trimmed].length;
    if (length > longestSentenceLength) longestSentenceLength = length;
  }

  return {
    characters,
    charactersWithoutSpaces,
    words,
    sentences,
    paragraphs,
    lines: lines.length,
    kanji,
    hiragana,
    katakana,
    alphabets,
    digits,
    symbols,
    spaces,
    others,
    bytes: encoder.encode(text).length,
    averageSentenceLength:
      sentences === 0
        ? 0
        : Math.round((charactersWithoutSpaces / sentences) * 10) / 10,
    longestSentenceLength,
    averageParagraphLength:
      paragraphs === 0
        ? 0
        : Math.round((charactersWithoutSpaces / paragraphs) * 10) / 10,
    manuscriptPages: Math.round((characters / 400) * 100) / 100,
    readingSeconds: Math.round((characters / 500) * 60),
  };
}

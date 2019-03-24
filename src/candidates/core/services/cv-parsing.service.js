import similarity from 'string-similarity';

// TODO:
//
// All functions in this module are synchronous. This is not
// a good thing because they can easily slow down the event loop
// into oblivion.
//
// Currently, it makes no sense to optimize them, because,
// chances are, this module will be swapped for something
// much better. Or otherwise, bugs will have to be eliminated
// and additional tweaks applied.
//
// If, however, the module has been well-debugged since the
// writing of this message, and it has been decided to keep
// it, you may need to optimize it to prevent event-loop
// clogging.
//
// This can be done by various means, but currently I have
// in mind the unrolling of loops into recursive asynchronous
// functions by means of `process.nextTick` and `setImmediate`.
//
// --- 2019-03-24 - lilsweetcaligula

const isSpace = c => /^\s+$/.test(c);

const isNewLine = c => c === '\n';

// NOTE:
//
// #forEachWordToken
//
// #Purpose:
//
// The purpose of the `forEachWordToken` is to provide a
// uniform way to iterate over words in a string.
//
// #Usage:
//
// The `forEachWordToken` function invokes function `f` for
// each word in the string `str`. A word is assumed to be
// a sequence of non-space characters.
//
// The function `f` should accept two arguments: an object
// containing word data with attributes `start` and `end`,
// and the `next` function.
//
// The `next` function argument inside the `f` function _must_
// be invoked in order to continue the iteration. It was
// designed this way in order to be able to terminate iteration
// prematurely.
//
// #Examples:
//
// Example of iteration:
// ```
//   const words = 'foo bar baz quix';
//
//   forEachWordToken(({ start, end }, nextWord) => {
//     const word = words.slice(start, end);
//     console.log(word);
//
//     nextWord();
//   });
//
//   // outputs:
//   // foo
//   // bar
//   // baz
//   // quix
// ```
//
// Example of fetching the first word:
// ```
//  const words = 'hello world oh hi';
//
//  let firstWord;
//
//  forEachWordToken(({ start, end }) => {
//    firstWord = words.slice(start, end);
//    // the call to `nextWord` is omitted.
//  });
//
//  console.log(firstWord);
//
//  // outputs:
//  // hello
// ```
//
// #Trivia:
//
// The function is called `forEachWordToken` as opposed to
// `forEachWord`, because it returns an object containing
// data about the current word. The actual string is not
// returned for performance reasons, but can be easily built
// from the data object's attributes - `start` and `end`.
//
// --- 2019-03-24 - lilsweetcaligula
//
const forEachWordToken = (f, str, options = {}) => {
  const nextWord = (start, end) => {
    if (str.length <= end) return;

    if (start < str.length && isSpace(str[start])) {
      nextWord(start + 1, end + 1);
      return;
    }

    if (end < str.length && !isSpace(str[end])) {
      nextWord(start, end + 1);
      return;
    }

    f({ start, end }, (err) => {
      if (err) throw err;
      nextWord(end, end);
    });
  };

  let start = options.start || 0;
  let end = options.start || 0;

  nextWord(start, end);
};

// NOTE:
//
// #prepareTextForSearch
//
// #Purpose:
//
// The purpose of the `prepareTextForSearch` is to remove
// punctuation marks, trim the string, compress the whitespace
// and convert the string to lowercase.
//
// This operation is useful when you want to compare two strings
// against each other, and don't want punctuation to get in the way.
//
// Only the punctuation is meant to be removed, but not every
// punctuation character. This can be important, when dealing with
// technology names.
//
// The function will leave 'node.js' as is. But 'hi. me knowz node.js.'
// will be transformed into 'hi me knowz node.js'.
//
// #Examples:
//
// ```
//  const result = prepareTextForSearch('Hi, can haz lambdaz plz???');
//  console.log(result);
//
//  // outputs:
//  // hi can haz lambdas plz
// ```
//
// --- 2019-03-24 - lilsweetcaligula
//
const prepareTextForSearch = text => {
  const punctuation = ['.', ',', '|', '-', ':', ';'];

  let result = ' ';

  for (let i = 0; i < text.length; ++i) {
    if (i + 1 < text.length) {
      if (isNewLine(text[i])) {
        if (!isSpace(result[result.length - 1])) {
          result += ' ';
        }

        continue;
      }

      if (punctuation.includes(text[i]) &&
        isSpace(text[i + 1])) {
        if (!isSpace(result[result.length - 1])) {
          result += ' ';
        }

        continue;
      }
      
      if (isSpace(text[i]) &&
        isSpace(result[result.length - 1])) {
        continue;
      }

      if (punctuation.includes(text[i]) &&
        isSpace(result[result.length - 1])) {
        continue;
      }
    }

    result += text[i];
  }

  return result.toLowerCase().trim();
};

// NOTE:
//
// #takeAsManyWordsFrom
//
// #Purpose:
//
// The purpose of the `takeAsManyWordsFrom` is: given two strings:
// `text` and `asIn`, to extract as many words from `text` as there
// are in `asIn` plus `extraWordCount`. This can be useful when 
// fuzzy-searching text and considering possible matches word for word.
//
// #Usage:
//
// The function accepts the `text` param, which is the string that words
// are to be extracted from, the `asIn` option, which is the string, whose
// word count dictates how many words will be retrieved from `text`.
//
// The function additionally supports the `start` option, which is the index
// that word extraction in the `text` string should commence at; as well as
// the `extraWordCount` option which is the extra number of words to be
// extracted from the `text` string.
//
// The `extraWordCount` option can be useful when you need to look a few
// words ahead in the `text` string.
//
// #Examples:
//
// ```
//   takeAsManyWordsFrom('ruby on rails', { asIn: 'python' });
//   // returns:
//   // 'ruby'
// ```
//
// ```
//   takeAsManyWordsFrom('visual basic net', { asIn: 'python', extraWordCount: 1 });
//   // returns:
//   // 'visual basic'
// ```
//
// ```
//  takeAsManyWordsFrom('ruby on rails', { start: 5, asIn: 'visual basic' });
//  // returns:
//  // 'on rails'
// ```
//
// --- 2019-03-24 - lilsweetcaligula
//
const takeAsManyWordsFrom = (text, { start = 0, extraWordCount = 0, asIn }) => {
  let result;

  let expectedWordCount = extraWordCount;
  let actualWordCount = 0;

  forEachWordToken((_, nextWord) => {
    ++expectedWordCount;
    
    nextWord();
  }, asIn);

  forEachWordToken(({ end }, nextWord) => {
    ++actualWordCount;

    if (actualWordCount === expectedWordCount) {
      result = text.slice(start, end);
    } else {
      nextWord();
    }
  }, text, { start });

  result = result || text.slice(start);

  return result;
};

// NOTE:
//
// #doesIncludeWord
//
// #Purpose:
//
// This function may be useful when you have two strings of words,
// wherein you want to test whether string `str` includes word
// `word`.
//
// #Examples:
//
// ```
//   doesIncludeWord('foo bar baz', 'quix');
//   // returns:
//   // false
// ```
//
// ```
//   doesIncludeWord('foo bar baz', 'fo');
//   // returns:
//   // false
// ```
//
// ```
//   doesIncludeWord('foo bar baz', 'foo');
//   // returns:
//   // true
// ```
//
// --- 2019-03-24 - lilsweetcaligula
//
const doesIncludeWord = (str, word) => {
  let result = false;
  
  forEachWordToken(({ start, end }, nextWord) => {
    const curWord = str.slice(start, end);
    result = curWord === word;

    if (!result) nextWord();
  }, str);

  return result;
};

const firstWordIn = (str) => {
  let firstWord;

  forEachWordToken(({ start, end }) => {
    firstWord = str.slice(start, end);
  }, str);

  return firstWord;
};

const lastWordIn = (str) => {
  let lastData;

  forEachWordToken((data, nextWord) => {
    lastData = data;
    nextWord();
  }, str);

  if (!lastData) return;

  const { start, end } = lastData;

  return str.slice(start, end);
};

const doesStartWithSameWord = (str1, str2) => {
  return firstWordIn(str1) === firstWordIn(str2);
};

const doesEndWithSameWord = (str1, str2) => {
  return lastWordIn(str1) === lastWordIn(str2);
};

// NOTE:
//
// #calculateMatchScore
//
// #Purpose:
//
// `calculateMatchScore` calculates the 'equality score' of two
// strings, based on their Dice coefficient.
//
// Additional properties may increase the `equality` score, such as
// whether both strings start with the same word, share the same prefix,
// end with the same word or whether they share the same word. Such
// modifiers are, however, relative to the Dice coefficient.
//
// The bigger the score, the more 'equal' the words are. The score's
// upper bound is at 2.0 (equal). The lower bound is 0.0 (not equal).
//
// #Examples:
//
// ```
//  calculateMatchScore('banana', 'banana');
//  // returns:
//  // 2.0
// ```
//
// ```
//  calculateMatchScore('banana', 'bandana');
//  // returns
//  // 0.7272727272
// ```
//
// ```
//  calculateMatchScore('plane', 'boat');
//  // returns
//  // 0.0
// ```
//
// #Trivia:
//
//
//
// --- 2019-03-24 - lilsweetcaligula
//
const calculateMatchScore = (str1, str2) => {
  // Calculate the Dice coefficient.
  //
  const distance = similarity.compareTwoStrings(str1, str2);

  const isPrefixShared = str1.startsWith(str2) ||
    str2.startsWith(str1);

  const startsWithSameWord = doesStartWithSameWord(str1, str2);

  const endsInSameWord = doesEndWithSameWord(str1, str2);

  const hasSharedWord = doesIncludeWord(str1, str2) ||
    doesIncludeWord(str2, str1);

  const isPerfectMatch = distance >= 1.0;

  let score = 0;

  // Assign a base score of the Dice coefficient.
  //
  score += distance;

  if (isPerfectMatch) {
    // Perfectly equal. Assign the highest score of 2.
    //
    score *= 2;
  } else if (isPrefixShared) {
    // Not perfectly equal, but the prefix is shared. Assign the score
    // of 1.5. Chances are that it's what is wanted,
    // e.g. 'express' vs 'express.js'.
    //
    score *= 1.5;
  } else {
    // Both strings start with the same word?
    // Assign a bonus of 40% off the Dice coefficient.
    //
    if (startsWithSameWord) score += distance * 0.4;

    // Both strings end with the same word?
    // Assign a bonus of 40% off the Dice coefficient.
    //
    if (endsInSameWord) score += distance * 0.4;

    // Both strings share the same word? Not perfect, but it could be
    // something. Assign a bonus of 20% off the Dice coefficient.
    //
    if (hasSharedWord) score += distance * 0.2;
  }

  return score;
};

// NOTE:
//
// #findAllSkillsIn
//
// #Purpose:
//
// This is the mothership of all functions in this module. The galaxy
// core is here, and so is the algorithm.
//
// The purpose of this function is to take wild guesses and extract
// the skill names that the user possibly meant to specify in their
// string of text.
//
// #Usage:
//
// The comments in the function will attempt to guide you through
// the algorithm but the gist of the algorithm is as follows:
//
// - clean up the text of punctuation marks, trim and compress whitespace,
//   and lowercase it
//
// - go through each word and save the initial letter to the lookup
//   table
//
// - go through each skill name, clean it up if necessary, but don't
//   bother removing embedded non-alphanum characters, since they are
//   used in many skill names, e.g. Node.js, C++, F#
//
// - get the initial letter of the skill name, fetch the indices with
//   words starting with the same letter from the lookup table
//
// - for each index, fetch the substring from the text with the number
//   of words, which is equal to the number of words in the skill name,
//   and calculate their score. Repeat the operation 2 more times,
//   looking ahead 1 word and 2 words respectively
//
// - save the text slice producing a score above the specified threshold,
//   that is probably the skill name the user meant
//
//
// --- 2019-03-24 - lilsweetcaligula
//
const fetchGoodMatchesIn = (someText, options = {}) => {
  const skills = require('@/candidates/core/services/cv-parsing/skills');

  const threshold = 'threshold' in options ? options.threshold : 0.8;
  const text = prepareTextForSearch(someText);

  const lookup = new Map();

  // For each word, get its initial letter, and save the index
  // where it occurs in text. Later in the algorithm, as we go
  // through the list of skills, we will extract the occurrences
  // of the initial letter. This is where we may potentially
  // match skills.
  //
  //
  forEachWordToken(({ start, end }, nextWord) => {
    const initial = text[start];

    if (!lookup.has(initial)) {
      lookup.set(initial, []);
    }

    lookup.set(initial, lookup.get(initial).concat(start));

    nextWord();
  }, text);

  // Now go through each skill, match the initial letter against
  // the occurrences in lookup table we built earlier.
  //
  const skillMatches = new Map();

  skills.forEach(someSkill => {
    const skill = prepareTextForSearch(someSkill);
    const initial = skill[0];

    if (lookup.has(initial)) {
      const indices = lookup.get(initial);

      indices.forEach(startsAtInText => {
        for (let extraWordCount = 0; extraWordCount < 3; ++extraWordCount) {
          // Fetch a slice from text containing as many words as the skill name.
          // For instance, given an occurence with text: 'react express python java'
          // matched up against the skill 'ruby on rails', the text slice will be
          // 'react express python'.
          //
          // We will also look ahead from 0 up to 2 words - this is what the
          // extraWordCount-based for-loop does.
          //
          const textSlice = takeAsManyWordsFrom(text,
            { start: startsAtInText, asIn: skill, extraWordCount });

          // Calculate the equality score.
          //
          const score = calculateMatchScore(skill, textSlice);

          // Is the score good enough? If yes and the skill has had no matches yet,
          // add it to the table. If the skill had matches before, then check if
          // the current score is better. If not, do not overwrite the previous match,
          // if yes - overwrite the match. (fun trivia: if I remember correctly this
          // may alternatively be called "relaxation" in the graph theory).
          //
          if (score > threshold) {
            if (!skillMatches.has(skill) || skillMatches.get(skill) < score) {
              skillMatches.set(skill, score);
            }
          }
        }
      });
    }
  });

  return skillMatches;
};

export default class CvParser {
  findAllSkillsIn (someText) {
    const matches = fetchGoodMatchesIn(someText);

    return [...matches.keys()];
  };
};

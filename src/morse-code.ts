// HEY JUDE in Morse code is
// H ····
// E ·
// Y −·−−
//
// J ·−−−
// U ··−
// D −··
// E ·

type Letter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type Dash = "-";
type Dot = ".";
// helper - this is preloaded Morse code:
type Morse = {
  [code: string]: Letter | Digit;
};

const MORSE_CODE: Morse = {
  // 1 dot
  ".": "E",
  ".-": "A",
  ".-..": "L",
  ".-.": "R",
  ".--": "W",
  ".---": "J",
  ".--.": "P",
  // 2 dot
  "..": "I",
  "..-": "U",
  "..-.": "F",
  // 2 dot
  "…": "S",
  "…-": "V",
  "….": "H",
  // 1 dit - 1 dot
  "-": "T",
  "-.": "N",
  "-.-": "K",
  "-.-.": "C",
  "-.--": "Y",
  // 1 dit - 2 dot
  "-..": "D",
  "-..-": "X",
  "-…": "B",
  // 2 dit
  "--.": "G",
  "--": "M",
  "---": "O",
  "--.-": "Q",
  "--..": "Z",
  // digits
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "…--": "3",
  "….-": "4",
  "…..": "5",
  "-….": "6",
  "--…": "7",
  "---..": "8",
  "----.": "9",
};
export const decodeCharacter = (character: Letter | Digit) => {
  return MORSE_CODE[character];
};

export const decodeWord = (word: string) => {
  //@ts-ignore
  return word.split(" ").map(decodeCharacter).join("");
};

export const decodeMorse = (morseCode: Letter | Digit) => {
  return morseCode.trim().split("   ").map(decodeWord).join(" ");
};

// ------------------------------------------------------------------------------
// alexanderell.is

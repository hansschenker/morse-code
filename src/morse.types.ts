export type KeyPress = {
    timeDown: number;
    timeUp: number;
    timeDiff: number;
  };
  export type KeyPause = {
    nextDown: number;
    lastUp: number;
    pauseDiff: number;
  };
  export  type MorseCode = {
    code: string;
    alpha: string;
  }
  
  export const MorseCodes: MorseCode[] = [
    {code:'.', alpha: 'E'},
    {code:".-", alpha: "A"},
    {code:".-..", alpha: "L"},
    {code:".-.", alpha: "R"},
    {code:".--", alpha: "W"},
    {code:".---", alpha: "J"},
    {code:".--.", alpha: "P"},
  ]


const MORSE_CODE = {
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
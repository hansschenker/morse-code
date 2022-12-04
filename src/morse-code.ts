
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
|'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' 
| 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' 
| 'W' | 'X' |'Y'| 'Z' 

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'| '9' 


  
  type Dash = '-'
  type Dot = '.'
  // helper - this is preloaded Morse code:
  type Morse = { 
    [code: string]:  Letter | Digit
}

  const MORSE_CODE:Morse  = {
    '.-': 'A',
    '-…': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '….': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '…': 'S',
    '-': 'T',
    '..-': 'U',
    '…-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
    '-----': '0',
    '.----': '1',
    '..---': '2',
    '…--': '3',
    '….-': '4',
    '…..': '5',
    '-….': '6',
    '--…': '7',
    '---..': '8',
    '----.': '9',
  }
  export const decodeCharacter = (character: Letter | Digit) => {
    return MORSE_CODE[character];
  }
  
  export const decodeWord = (word:string )=> {
    //@ts-ignore
    return word.split(' ').map(decodeCharacter).join('');
  }
  
  export const decodeMorse = (morseCode: Letter | Digit) => {
    return morseCode.trim().split('   ').map(decodeWord).join(' ');
  }
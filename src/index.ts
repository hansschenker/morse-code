import {
  fromEvent,
  bufferTime,
  interval,
  sample,
  map,
  mapTo,
  sampleTime,
  scan,
  withLatestFrom,
  combineLatest,
  repeat,
  take,
  timeInterval,
  auditTime,
  BehaviorSubject,
  tap,
  pairwise,
  filter,
  merge,
  takeUntil,
  mergeMap,
  exhaustMap
} from "rxjs";

type Period = {
  index: number,
  count: number
}

const LetterState = new BehaviorSubject<string[]>([])
const LetterChanges = LetterState.asObservable()

const MorsesState = new BehaviorSubject<number[]>([])
const MorsesChanges = MorsesState.asObservable().pipe(
  scan((acc, val) => (  [...acc , ...val]))
)//.subscribe((val) => console.log(val))

// spacebar press and release events
const morseInput = document.getElementById('morseInput')
const keyups = fromEvent<KeyboardEvent>(morseInput!, 'keyup').pipe(
  filter(e => e.code === 'Space'),
  map( _ => Date.now()),
  take(1)
)
const keydowns = fromEvent<KeyboardEvent>(morseInput!, 'keydown').pipe(
  filter(e => e.code === 'Space'),
  map( _ => Date.now()),
  take(1)
)
const keys = combineLatest(keyups, keydowns).pipe(
  
  repeat(),
).subscribe(v => {
  const diff = v[0] - v[1]
  MorsesState.next([diff])
  console.log('diff:',diff)
  diff < 450 
  ? console.log('short:',diff) 
  : diff <750 ?console.log('long',diff) : console.log('break')
})

function renderConsole(v: number[]) {
  const diff = v[0] - v[1]
  MorsesState.next([diff])
  console.log('diff:',diff)
  diff < 450 
  ? console.log('short:',diff) 
  : diff <750 ?console.log('long',diff) : console.log('break')
 
}
// MorsesChanges.subscribe(ms => console.log('morses:',ms))

// --------------------------------------------------------------
// const testSpace = fromEvent<KeyboardEvent>(morseInput!, 'keyup').pipe(
//   filter(e => e.code === 'Space'),
//   map( ev => ev.timeStamp),
//   // map(ev => console.log(ev.timeStamp)),
//   tap(v => MorsesState.next(v)),
// ).subscribe( v => console.log(v))
  
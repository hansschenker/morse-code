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
  exhaustMap,
  ReplaySubject,
  timer,
  switchMap,
  reduce
} from "rxjs";

type Period = {
  index: number,
  count: number
}

const TimestampState = new BehaviorSubject<number[]>([])
const TimestampChanges = TimestampState.asObservable().pipe(
  scan((acc, val) => (  [...acc , ...val]))
).subscribe((val) => console.log('diff:',val))

// const LetterState = new BehaviorSubject<string[]>([])
// const LetterChanges = LetterState.asObservable()
// LetterChanges.pipe(
//   scan((acc, val) => (  [...acc , ...val]))
// )
// .subscribe((changes: string[]) => {
//   console.log(changes)
// })

const MorseState = new BehaviorSubject<string[]>([])
const MorseChanges = MorseState.asObservable().pipe(
  scan((acc, val) => (  [...acc , ...val]))
).subscribe((val) => console.log(val))
// ************************************************************************

// spacebar press and release events
const morseInput = document.getElementById('morseInput') as HTMLInputElement
// keyup -> number
const keyups = fromEvent<KeyboardEvent>(morseInput!, 'keyup').pipe(
  filter(e => e.code === 'Space'),
  map( _ => Date.now()),
  take(1)
)
// keydown -> number
const keydowns = fromEvent<KeyboardEvent>(morseInput!, 'keydown').pipe(
  filter(e => e.code === 'Space'),
  map( _ => Date.now()),
  take(1)
)

const letters = keydowns.pipe(
  switchMap(down => keyups.pipe(map(up => MorseState.next(toDotOrDash(down, up) )  ))),
  takeUntil(timer(5000).pipe(takeUntil(keydowns), repeat())),
  tap( _ =>  morseInput!.value = ''),
  repeat()
)
 letters.subscribe((val) => console.log('letters:',val))

// keys -> [number, number]
// combineLatest(  keyups , keydowns).pipe(  
//   // map(([t1, t2]) => t2 - t1 ),
//   // filter(t => t < 450),
//   repeat(),
// ).subscribe(v => {
// // ************************************************************************
//   console.log(v)
//   morseInput!.value = ''

//    const diff = v[0] - v[1]
//   TimestampState.next([diff])
//   console.log('diff:',diff)
//   diff < 450 
//   ? LetterState.next(['.'])                          //console.log('short:',diff) 
//   : diff <750 ? LetterState.next(['-'])             //console.log('long',diff)
//   : LetterState.next(['/'])                                                //console.log('break')
// })

function toDotOrDash(down:number,up:number): string[]  {
  const diff = up - down
  TimestampState.next([diff])
  //console.log('toDotOrDash:',down,up)
  const morse = diff < 450 
  ? '.'                          //console.log('short:',diff) 
  : diff <700 ? '-'             //console.log('long',diff)
  : '/'  

  return [morse
]}  

function collectDotsAndDashes(){
  console.log('collectDotsAndDashes') 
}
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
  reduce,
} from "rxjs";

const TimestampState = new BehaviorSubject<number[]>([]);
const TimestampChanges = TimestampState.asObservable();
TimestampChanges.pipe(scan((acc, val) => [...acc, ...val])).subscribe(
  val => console.log("timestamp changes:", val)

);
// ************************************************************************
//console.log("timestamp changes:", val)

const LetterState = new BehaviorSubject<string[]>([]);
const LetterChanges = LetterState.asObservable();
LetterChanges.pipe(scan((acc, val) => [...acc, ...val])).subscribe(
  (changes: string[]) => {
    console.log("letter changes:", changes);
  }
);
// ************************************************************************

const MorseState = new BehaviorSubject<string[]>([]);
const MorseChanges = MorseState.asObservable()
  .pipe(
    // filter((val) => val.filter((v) => v === '/').length > 0),
    //  tap((val) => console.log('morse change:',val)),
    scan((acc, val) => [...acc, ...val])
    // filter((v) => v.filter((s) => s === "/").length > 0),
    // tap((v) => MorseState.next(v))
  )
  .subscribe((val) => console.log("morse changes:", val));
// ************************************************************************

// spacebar press and release events
const morseInput = document.getElementById("morseInput") as HTMLInputElement;

// keyup -> number
const keyups = fromEvent<KeyboardEvent>(document, "keyup")
  .pipe(
    filter((e) => e.code === "Space"),
    map((_) => Date.now()),
    tap((v) => TimestampState.next([v])),
    take(1)
  )
  //.pipe(takeUntil(interval(220).pipe(tap((v) => console.log("pause")))));
// keydown -> number
const keydowns = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  filter((e) => e.code === "Space"), // -> event
  map((_) => Date.now()), // -> number
  //tap((v) => TimestampState.next([v])),
  take(1) // -> do it once and unsubscribe
);

// ******************************
const keys = combineLatest(keyups, keydowns) 
  .pipe(
    tap(([up, down]) => MorseState.next(toMorseCode(down, up))),
    repeat()
  )
  .subscribe((val) => console.log("keys:",val))

  const keypauses = keyups.pipe(
    withLatestFrom(keydowns),
    map(([ku,kd]) =>  ku - kd),
    repeat()
  )
  //.subscribe((val) => console.log("keypauses:",val))

function toMorseCode(down: number, up: number): string[] {
  let diff = up - down;
   TimestampState.next([diff]);
  console.log("diff:", diff);
  const morse =
    diff < 200
      ? "." //console.log('short:',dit)
      : diff < 400
      ? "-" //console.log('long',dah)
      : diff < 720 // letter-space
      ? "/" 
      : "//"  // word-space

  diff = 0;
  return [morse];
}

// function collectDotsAndDashes() {
//   console.log("collectDotsAndDashes");
// }

console.clear();
// switchMap in example below can be replaced with mergeMap/concatMap/exhaustMap, the same behaviour applies
import { throwError, fromEvent, of } from 'rxjs';
import {
  catchError,
  tap,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
} from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch

const fakeRequest$ = of().pipe(
  tap((_) => console.log('fakeRequest')),
  throwError
);

const ContinueListening$ = fromEvent(
  document.getElementById('continued'),
  'click'
).pipe(
  switchMap((_) =>
    fakeRequest$.pipe(catchError((_) => of('continue, keep on clicking!!!')))
  )
);

const StopListening$ = fromEvent(
  document.getElementById('stopped'),
  'click'
).pipe(
  switchMap((_) => fakeRequest$),
  catchError((_) => of('stop, no more requests and clicks !'))
);

ContinueListening$.subscribe(console.log);
StopListening$.subscribe(console.log);

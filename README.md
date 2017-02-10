`Promise`s are in core, `async` / `await` is almost here, let's prepare!

  - convert callback APIs into awaitable functions (promisify);
  - await multiple tasks with ability to limit concurrecny;
  - map with async functions.

Though, there are tests and I am reasonably sure stuff works,
I wouldn't put this into production without a review.
Things are pretty raw and this is mostly trying out new shiny toys,
so approach is "make it work first, make it fast/stable later".

Also, there is nothing here you can't achieve with slightly longer
code using `Promise.all` and some array methods (except limit concurrency).
So I don't really know how useful this is yet :)

There are a bunch of [examples](/examples), run them with `--harmony` flag.

TODOs:

  - `filter`, `reject`;
  - probably more stuff?
  - support for iterables (`Set`, `Map`, etc.);
  - benchmarks (lol);
  - docs.

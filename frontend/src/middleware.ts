export function onRequest (context, next) {
    // intercept data from a request
    // optionally, modify the properties in `locals`
    context.locals.title = "New title";

    // return a Response or the result of calling `next()`
    return next();
};
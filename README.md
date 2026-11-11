# Inline question page engine

`engine.js` draws an inline question page from a round of JSON data: rows, steps, questions and a Send button that returns the answers as plain text. `news.js` draws a separate news brief deck. `engine-4.7.0.js` is an older engine kept for pages that still pin it.

The files hold layout and behavior code only. No content, answers or personal data live here; each page supplies its own round.

## Loading

Pin a file by commit, so a page never changes under it:

```
https://cdn.jsdelivr.net/gh/<owner>/<project>@<40-character commit sha>/engine.js
```

Then mount a round: `QP.mount(round)` for the engine, `ND.mount(data)` for the news deck. `QP.version` gives the engine version.

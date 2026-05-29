# md-ipsum

Copy snippets of markdown and paste them into your project.

- **Website**: `https://md-ipsum.adbr.dev/`

## Description

md-ipsum is a single static page of placeholder markdown — paragraphs, lists,
tables, a form, a kitchen sink — for designers and developers testing markdown
rendering. It's a Hugo port of the original md-ipsum.com.

Each snippet is shown as raw, copy-pasteable markdown in a text box. Click a
snippet's title to copy its source to your clipboard.

## Usage

Visit <https://md-ipsum.adbr.dev/>, find a snippet, and click its title to copy
the raw markdown. No account, no JavaScript framework, no tracking — direct
links work and the page is fully static.

## Development

Requires [Hugo extended](https://gohugo.io/) `0.147.2` (pinned in
`.tool-versions`):

```bash
brew install hugo
```

Then:

```bash
make run     # serve locally with live reload at http://localhost:1313/
make build   # production build into ./public/
make clean   # remove build artefacts
make help    # list targets
```

The site is theme-less: layouts live in `layouts/`, styles in
`assets/css/style.css` (plain CSS, minified and fingerprinted by Hugo Pipes),
and the copy-to-clipboard behaviour in `assets/js/site.js` (vanilla, no
dependencies).

## Adding a snippet

Drop a new `content/ipsums/<slug>.md`:

```markdown
---
title: "My Snippet"
weight: 130
---
Your raw markdown here.
```

`weight` sets the position in the grid. The body is shown verbatim in the text
box, so any HTML in a snippet must be entity-escaped (`&lt;`, `&gt;`) to render
as literal text — this is load-bearing for the Example Form snippet, whose
embedded `</textarea>` would otherwise close the page's own text box.

## License

[BSD-3-Clause](./LICENSE).

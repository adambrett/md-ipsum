# md-ipsum

Copy snippets of markdown and paste them into your project.

## Description

md-ipsum is placeholder markdown for designers and developers testing markdown
rendering, and a quick reference for the syntax of common formats. Each snippet
is shown as raw, copy-pasteable source in a text box - click a snippet's title
to copy it to your clipboard.

Snippets are grouped by **flavour**, because "markdown" isn't one thing:

| Flavour | Notes                                                                                                              |
| --- |--------------------------------------------------------------------------------------------------------------------|
| **CommonMark** | The [reference spec](https://commonmark.org/).                                                                     |
| **GFM** | GitHub Flavored Markdown - CommonMark plus tables, task lists, strikethrough, autolinks, footnotes.                |
| **Goldmark** | Hugo's renderer - GFM plus definition lists and a typographer.                                                     |
| **WhatsApp** | Chat formatting: `*bold*`, `_italic_`, `~strike~`, ```` ```mono``` ````.                                           |
| **Slack** | mrkdwn: `*bold*`, `_italic_`, `~strike~`, `<url\|text>` links.                                                     |
| **Discord** | `**bold**`, `__underline__`, `~~strike~~`, `\|\|spoiler\|\|`, headings.                                            |
| **JIRA** | Atlassian wiki markup (`h1.`, `{code}`, `\|\|tables\|\|`, `^sup^`) - not actually markdown but parts are borrowed. |

Within each flavour, snippets are ordered with unique first, followed by styles that are different to other flavours, then the remainder are simplest → complex. Unique and different snippets are **colour-coded**:
gold = a capability unique to that flavour, red = a shared idea written with
different syntax (the gotchas), uncoloured = the same in all formats. A `?`
in the header explains the key.

## Usage

Visit the site, pick a flavour from the header, and click any snippet's title to
copy its source.

## Development

Requires [Hugo extended](https://gohugo.io/) `0.147.2`:

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

## Adding a snippet

Drop a new `content/<flavour>/<slug>.md`:

```markdown
---
title: "My Snippet"
weight: 130
tier: different   # optional: "unique" (gold) or "different" (red)
---
Your raw markdown here.
```

`weight` orders the snippet within its flavour (lowest first). The body is the
source shown in the text box, emitted verbatim and auto-escaped, so write it as
natural markdown - no entity-escaping needed. Omit `tier` for an ordinary
(uncoloured) snippet.

## License

[BSD-3-Clause](./LICENSE).

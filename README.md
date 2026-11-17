# Personal site

A small static site built with [Eleventy](https://www.11ty.dev/). Content is
Markdown and YAML; there is no client-side JavaScript.

```bash
npm start        # preview at http://localhost:8080, reloads as you edit
npm run build    # writes the finished site to _site/
```

## Adding things

| To add…            | Do this                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| A blog post        | New file in `src/posts/` named `YYYY-MM-DD-some-title.md` (copy the sample) |
| A publication      | New entry in `src/_data/publications.yaml`                               |
| A project          | New entry in `src/_data/projects.yaml`                                   |
| An image in a post | Put it in `src/assets/img/`, then `![description](/assets/img/name.png)` |
| A link, your email, portrait or CV | `src/_data/site.yaml`                                    |
| A new page         | New `.md` file in `src/` with `layout: base.njk` and a `title`; add it to `nav` in `site.yaml` |

Your introduction is `src/index.md` and the research overview is
`src/research.md`.

## Where the design lives

- `src/assets/style.css`: all styling. Colours and widths are variables at the top.
- `src/_includes/`: page templates.

## Publishing

`_site/` is plain HTML and can be hosted anywhere (GitHub Pages, Netlify,
Cloudflare Pages). Set `url` in `src/_data/site.yaml` to your real address
first so the RSS feed links are correct.

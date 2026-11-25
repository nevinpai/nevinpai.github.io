---
title: A sample post
description: Shows what a post can contain. Replace it with your own.
---

This file lives at `src/posts/2026-11-17-hello.md`. The date in the file name
is the publication date, and the rest becomes the address. Copy it, rename it,
and write.

## What you can use

Ordinary Markdown: *emphasis*, **strong**, [links](https://example.com), lists,
and footnotes.[^1]

> Block quotes are set off with a rule.

Code is set in a monospaced face and scrolls sideways if it is too wide:

```python
def reverse_complement(seq: str) -> str:
    return seq.translate(str.maketrans("ACGT", "TGCA"))[::-1]
```

Images go in `src/assets/img/` and are referenced by path:

```markdown
![A short description](/assets/img/figure-1.png)
```

Add `draft: true` to the block at the top of a post to keep it out of the
published site while you work on it.

[^1]: Footnotes are collected at the end of the post.

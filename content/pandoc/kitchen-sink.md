---
title: "Kitchen Sink"
weight: 100
---
---
title: De Finibus Bonorum et Malorum
author: Marcus Tullius Cicero
date: 2020-01-01
abstract: |
  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
  consectetur, adipisci velit, sed quia non numquam eius modi tempora.
references:
  - id: cicero
    type: book
    author:
      - { family: Cicero, given: Marcus Tullius }
    title: De Finibus Bonorum et Malorum
    publisher: Dolor Press
    issued: { year: 1914 }
  - id: lorem2020
    type: article-journal
    author:
      - { family: Ipsum, given: Lorem }
    title: On the Origins of Placeholder Text
    container-title: Journal of Typography
    issued: { year: 2020 }
---

# Introduction {#sec:intro}

**Pellentesque habitant** _morbi tristique_ senectus, with `inline code`
and a [reference][lorem] to prior work [@cicero, pp. 33-35]. As @lorem2020
shows, the result holds for compounds like H~2~O and isotopes like
^14^C.^[Aliquam tincidunt mauris eu risus.]

The Pythagorean theorem, $a^2 + b^2 = c^2$, generalises to the law of cosines:

$$c^2 = a^2 + b^2 - 2ab\cos\gamma$$

## Methods

Theorem
: Every bounded monotonic sequence converges.

::: {.proof}
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
:::

> Sed ut perspiciatis unde omnis iste natus error sit voluptatem.

| Sample | Result |
| ------ | -----: |
| dolor  |   1.29 |
| amet   |   3.14 |

```python
def lorem(n):
    return "ipsum" * n
```

## References

[lorem]: https://example.com "Placeholder"

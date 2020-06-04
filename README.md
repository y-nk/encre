# Encre

An overly simple blog engine, or at least it looks like it.

### Motivation

Most of the tools i see around are either bloated or not extensible. So I tried my luck.
This is built to be extensible through an easy inferface "the dom".

### Scope

1. **DO**: take as little as work to publish something
2. **DO**: use markdown to write pages 
3. **DO**: keep all features optional

1. **DONT**: include any kind of framework~ish dependencies
2. **DONT**: become unhackable, built, typed or anything smelling complex engineering
3. **DONT**: handle build, optimization or include mandatory opiniated features

## Getting started

### Installation

1. `npm install encre`
2. `mkdir {layouts,static,posts}`
3. `echo '<div id="main"></div>' > ./layouts/index.html`

### Development

- `npx draft`

### Build

- `npx write`

All files in static or posts (except for `layouts/*` and `posts/*.md`) will be automatically copied to the build directory.

## Extend

## Authoring

The markdown files provided is parsed with both `gray-matter` and `marked`.
That's all there is to know.

## Layouts

All layouts fallback to `index.html` if no other templates are found.

List of available templates:

- `layouts/post.html`: template for a single post
- `layouts/tags.html`: template for the tag index
- `layouts/tag.html`:  template for a single tag page

## Renderers

Both commands `draft` and `write` take an optional parameter.
Pass along a `.js` file of your choice which is exporting objects and functions as following:

### metadata: Object

This object is mandatory for the generation of the atom feed. Some fields are mandatory, some aren't.

```
{
  url: string,          // the website base url (for generation of absolute links)

  title?: string        // <title>
  subtitle?: string     // <subtitle>
  rights?: string       // <rights>

  logo?: string         // <logo>
  icon?: string         // <icon>

  author?: string       // <author><name>
  email?: string        // <author><email>
  uri?: string          // <author><uri>

  categories?: string[] // will be serialized into a bunch of <category />
}
```

### head(document: Document, metadata: Object?): void

This function is handling mutation of the `document.head` according to given metadata.

The metadata are the fields placed in the yaml header descriptor of your markdown file, or undefined for the index page (so you only need to define default values to handle the index).

### index(metadata: Object[]): string

This function is made to generate the list of posts in the index file. You will need to generate a dom string according to the given array. This array contains all the posts metadata, as written in the yaml header descriptor of each file.

### title(metadata: Object): string

This function involves generating the title of a post from its metadata. Again, return a dom string representing the post's title. This metadata object contains all the fields written in the yaml header descriptor of each file.

### tags(tags: Record<name: string, metadatas: Object[]>)

This function is used to generate the list of tags and their associated posts. As usual return a dom string to be inserted. The structure will contain the metadata of each post for each tag.

### tag(metadata: Object, name: string>)

This function is used to generate the list of posts for one particular tag. Return a dom string to be inserted. The structure will contain the metadata and the name of the tag.

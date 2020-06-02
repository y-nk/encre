# Encre

An overly simple blog engine, or at least it looks like it.

## Motivation

Most of the tools i see around are either bloated or not extensible. So I tried my luck.
This is built to be extensible through an easy inferface "the dom".

- You can pre-build your template the way you want, and target the build to `static/index.html`
- You can pre-build your css with the tools you want, and also targts to `static/`
- If you want to minify your build, you're free to add a command to do so post build

## Scope

- Take a `posts/` directory containing markdown files as an input
- Write static html files as an output

## Authoring

The markdown files provided is parsed with both `gray-matter` and `marked`.
That's all there is to know.

## Installation

1. `npm install encre`
2. Create a `posts/` folder
3. Create a `layouts/index.html` template file
4. Create a `static/` folder for your assets

## Usage

- To have a development server running, you can use the command `draft`
- To have a distribution build ready to deploy, use the command `write`

All files in static or posts (except for index.html and *.md) will be automatically copied to the build directory.

## Layouts

All layouts fallback to `index.html` if no other templates are found.

List of available overrides:

```
layouts/post.html // template for a single post
layouts/tags.html // template for the tag index
layouts/tag.html  // template for a single tag page
```

## Personalization

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


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
3. Create a `static/index.html` template file

## Usage

- To have a development server running, you can use the command `draft`
- To have a distribution build ready to deploy, use the command `write`

All files in static or posts (except for index.html and *.md) will be automatically copied to the build directory.

## Personalization

Both commands `draft` and `write` take an optional parameter.
Pass along a `.js` file of your choice which will export a function `head` to handle the `<head />` tag metadatas and/or `index` to handle the list of posts.

### head(document, metadata?): void

When implementing this function, you're supposed to use `document` object to manipulate dom nodes in `<head />` according to the metadata object given. The metadata are the fields placed in the yaml header descriptor of your markdown file, or undefined for the index page (so you only need to define default values).

### index(metadata[]): string

This function is made to generate the list of posts in the index file. You will need to create dom nodes according to the given array. This array contains all the posts metadata, as written in the yaml header descriptor of each file.

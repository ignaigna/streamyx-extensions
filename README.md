# Streamyx Service Example

This is a sample plugin for [Streamyx](https://streamyx.ru).

In this example we have a simple implementation of Streamyx service/plugin that adds support for downloading video from [Bitmovin](https://bitmovin.com/demos/drm/).

Service can be added to Streamyx via `install` command from direct URL or from local path.

Supported formats for services distribution are `zip` and `tgz`.

## Install

[Node.js](https://nodejs.org/en/) is required.

Clone this repository:

```shell
git clone https://github.com/vitalygashkov/streamyx-service-example.git
```

or just download and unpack source code manually.

Install dependencies:

```shell
npm install
```

## Development

Main file is `bitmovin.js`, it contains all necessary code to support downloading video from [Bitmovin](https://bitmovin.com/demos/drm/). You can use it as a template for your own service.

## Testing

File `bitmovin.test.js` contains a couple of tests. It can be useful for debugging while you developing your own script.

```shell
npm test
```

## Distribution

### Local

Pack your code:

```shell
npm pack
```

Results will be `tgz` and `zip` files. You can share any of this files to distribute service.

### Remote via NPM

Publish your code to NPM:

```shell
npm publish
```

Then you can simply add service by package name via `install` Streamyx command:

```shell
streamyx install @streamyx/service-example
```

### Remote via GitHub

Publish your code to GitHub.

Create release in [GitHub Releases](https://github.com/vitalygashkov/streamyx-service-example/releases) section.

GitHub will create `zip` and `tgz` files for you. After that you can share archive URL from GitHub releases.

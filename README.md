# Streamyx Service Example

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

File `service.js` contains simple implementation of [NTV](https://www.ntv.ru/) service. You can use it as a template for your own service.

## Testing

File `service.test.js` contains couple of tests for service. It can be useful for debugging while you developing your service.

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

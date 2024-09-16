# Example of Streamyx external service

Service can be added to Streamyx via `add` command from direct URL or from local path.

Supported formats for services distribution are `zip` and `tgz`.

## Install

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

### Remote

Publish your code to GitHub.

Create release in [GitHub Releases](https://github.com/vitalygashkov/streamyx-service-example/releases) section.

GitHub will create `zip` and `tgz` files for you. After that you can share archive URL from GitHub releases.

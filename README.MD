# @beyonk/pino-sematext

*@beyonk/pino-sematext* is a so called "transport" for the [pino][pino] logger. *pino-syslog* receives *pino* logs from `stdin` and 
sends them to a logsene compatible logger such as [sematext](https://sematext.com) via `logsene-js`.

For example:

```bash
$ node your-app.js | pino-sematext --token my-api-token
```

## Install

You should install *pino-syslog* globally so that it can be used as a utility:

```bash
$ pnpm install --production -g @beyonk/pino-sematext
```

## Configuration

*@beyonk/pino-sematext* only supports a single config option, `token` which is your sematext (or compatible) api token.

## License

[MIT License](https://antony.mit-license.org/)
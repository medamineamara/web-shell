# Web Shell

This is a basic example of a web shell, using node-pty and xterm.js.

## How to run it?

Run the below command and then visit http://localhost:3000/ in your browser.

```bash
docker build -t web-shell:1 .
docker run -d -p 3000:3000 -p 4000:4000 --name web-shell web-shell:1
```

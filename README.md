# H5P Hub Client
H5P Content Hub and H5P Content Type Hub

## Building

Run `build` to concatinate *JavaScript* files and compile scss files to css. Resulting files are found in the [dist folder](dist).

```bash
npm run build
```

Run `watch` to continually watch for changes to JavaScript and scss, and rebuild.

```bash
npm run watch
```

Run `dev` to open a web page displaying the application, for debugging.

```bash
npm run dev
```

## Embedding

#### HTML

```html
<div id="hub-client"></div>
<script type="text/javascript" src="dist/h5p-hub-client.js"></script>
```

#### JavaScript

```javascript
var hubClient = new H5P.HubClient({
  apiRootUrl: '/test/mock/api'
});

hubClient.on('select', event => {
  // use data in event
});

document.getElementById('hub-client').appendChild(hubClient.getElement());

```
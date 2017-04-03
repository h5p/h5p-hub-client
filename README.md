# H5P Hub Client
H5P Content Hub and H5P Content Type Hub

We are testing this using [browserstack.com](https://browserstack.com), to make sure it works in all supported browsers.
![Browserstack](https://raw.githubusercontent.com/h5p/h5p-hub-client/master/browserstack-logo.png)

## Building

Get the [h5p-sdk](https://github.com/h5p/h5p-sdk), and link it to this project.

```bash
 cd ..
 git clone git@github.com:h5p/h5p-sdk.git
 cd h5p-sdk
 npm link
 cd ../h5p-hub-client
 npm link h5p-sdk
```


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
}).on('select', event => {
  // use data in event
}).on('error', error => {
  // handle error
});

document.getElementById('hub-client').appendChild(hubClient.getElement());
```

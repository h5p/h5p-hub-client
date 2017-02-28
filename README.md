# H5P Hub Client
H5P Content Hub and H5P Content Type Hub

## Usage

### HTML

```html
<script type="text/javascript" src="dist/h5p-hub-client.js"></script>
```

### JavaScript

```javascript
var hubClient = new H5P.HubClient({
  apiRootUrl: '/test/mock/api'
});

hubClient.on('select', event => {
  // use data in event
});
```
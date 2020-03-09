require('../../src/styles/main.scss');
require('es6-promise').polyfill();

// Load library
H5P = H5P || {};
H5P.HubClient = require('../scripts/hub').default;

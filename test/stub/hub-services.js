import HubServices from '../../src/scripts/hub-services';

class HubServicesFailInit extends HubServices {
  constructor(state) {
    super(state);
  }

  setup() {
    this.counter = (this.counter || 0) + 1;

    if (this.counter == 1) {
      this.cachedContentTypes = Promise.reject('failed');
      return this.cachedContentTypes;
    }

    return super.setup();
  }
}

class HubServicesFailInstalling extends HubServices {
  installContentType(id) {
    this.counter = (this.counter || 0) + 1;
    return Promise[this.counter == 1 ? 'reject' : 'resolve']('result');
  }
}

class HubServicesFailFetchLicense extends HubServices {
  getLicenseDetails(licenseId) {
    this.counter = (this.counter || 0) + 1;

    return Promise[this.counter == 1 ? 'reject' : 'resolve']({
      id: licenseId,
      description: 'Here comes the license'
    });
  }
}

class HubServicesFailUploading extends HubServices {
  uploadContent(formData) {
    return Promise.reject('failed');
  }
}

export default class HubServicesFactory {
  static get(mode, state) {
    switch(mode) {
      case 'fail-fetch-content-types':
        return new HubServicesFailInit(state);
      case 'fail-installing':
      case 'fail-updating':
        return new HubServicesFailInstalling(state);
      case 'fail-fetch-license':
        return new HubServicesFailFetchLicense(state);
      case 'fail-uploading':
        return new HubServicesFailUploading(state);
    }
  }
}

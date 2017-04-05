import HubServices from '../../src/scripts/hub-services';

class HubServicesFailInit extends HubServices {
  constructor(state) {
    super(state);
  }

  setup() {
    this.counter = (this.counter || 0) + 1;

    if (this.counter === 1) {
      this.cachedContentTypes = Promise.reject({
        messageCode: 'SERVER_ERROR'
      });
      return this.cachedContentTypes;
    }

    if (this.counter === 2) {
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

class HubServicesFailUploadingValidation extends HubServices {
  uploadContent(formData) {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({
          errorCode: "VALIDATION_FAILED",
          message: "Validating h5p package failed.",
          success: false
        });
      }, 5000);
    });
  }
}

class HubServicesFailUploading extends HubServices {
  uploadContent(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 5000);
    });
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
      case 'fail-uploading-validation':
        return new HubServicesFailUploadingValidation(state);
    }
  }
}

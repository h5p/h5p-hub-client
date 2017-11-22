/**
 * Check if the content type has updates available and can be updated.
 *
 * @param {Object} contentType
 * @param {Object} apiVersion
 * @return {boolean}
 */
export default function updatable(contentType, apiVersion) {
  // Determine if the content type is using an API version that is not yet supported
  const apiVersionSupported = (apiVersion.major > contentType.h5pMajorVersion ||
                              (apiVersion.major === contentType.h5pMajorVersion &&
                               apiVersion.minor >= contentType.h5pMinorVersion));

  return (!contentType.isUpToDate && contentType.installed && contentType.canInstall && apiVersionSupported);
}

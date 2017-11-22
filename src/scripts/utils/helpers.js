export const nonEmptyString = (props, propName, componentName) => {
  if (props[propName] === undefined || props[propName].length === 0) {
    return new Error(
      `Non empty string for prop ${propName} in ${componentName}`
    );
  }
};

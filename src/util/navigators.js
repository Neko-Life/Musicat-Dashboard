const navigators = {
  landing: null,
};

export const setNavigator = (key, navigate) => {
  navigators[key] = navigate;
  return navigators[key];
};

export const getNavigator = (key) => {
  return navigators[key];
};

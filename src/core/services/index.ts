const serviceCache = new Map<string, any>();

export const addService = (name: ServiceKey, value: any) => {
  if (!serviceCache.has(name)) {
    serviceCache.set(name, value);
  }
};

export const getService = (name: ServiceKey) => {
  return serviceCache.get(name);
};

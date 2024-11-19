export const mockedRequest = async <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    const timeout = Math.floor(Math.random() * 2500) + 500;
    setTimeout(() => resolve(data), timeout);
  });
};

export const pipe = (f, g) => (...args) => g(f(...args))
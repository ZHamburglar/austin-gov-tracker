/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */
export const safeInvoke = (fn, ...args) => {
  if (typeof fn === 'function') {
    return fn(...args);
  }
};

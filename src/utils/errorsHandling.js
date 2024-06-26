/**
 * @param {Callable} func
 * @param {Callable} [fallback]
 * @return any
 */
export function inErrorBoundary(func, fallback) {
  let result;
  try {
    result = func();
  } catch (err) {
    handleError(err);
    if (fallback) {
      try {
        result = fallback();
      } catch (err) {
        handleError(err);
      }
    }
  }
  return result;
}

/**
 * @param {unknown} err
 */
export function handleError(err) {
  alert(`Произошла ошибка: 
    ${
      err instanceof Error
        ? err.message
        : typeof err === "string" && err.length
          ? err
          : "неизвестная ошибка"
    }
  `);
  console.error(err);
}

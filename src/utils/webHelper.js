/**
 * Convert object to url query string
 * @param {Object} paramsObj
 */
export function toQueryString(paramsObj) {
  return Object.keys(paramsObj)
    .filter(
      key => paramsObj[key] !== null && typeof paramsObj[key] !== 'undefined'
    )
    .map(key => `${key}=${encodeURI(paramsObj[key])}`)
    .join('&');
}

const getScrollXY = () => {
  let scrOfX = 0;
  let scrOfY = 0;
  if (typeof window.pageYOffset === 'number') {
    // Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if (
    document.body &&
    (document.body.scrollLeft || document.body.scrollTop)
  ) {
    // DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if (
    document.documentElement &&
    (document.documentElement.scrollLeft || document.documentElement.scrollTop)
  ) {
    // IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [scrOfX, scrOfY];
};

const getDocHeight = () =>
  Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

/**
 * Detect user is scrolled at bottom of page
 */
export function isScrolledToBottomOfPage() {
  if (!window || typeof window === 'undefined') {
    return false;
  }
  return getDocHeight() === getScrollXY()[1] + window.innerHeight;
}

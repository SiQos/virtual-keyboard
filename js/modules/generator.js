let createElement = (elem, ...classNames) => {
  const element = document.createElement(elem);
  element.classList.add(...classNames);

  return element;
}

export default createElement;

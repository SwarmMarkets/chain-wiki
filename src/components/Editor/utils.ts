export const findElementWithMatchedDataId = (
  elements: Element[],
  element: Element
) => {
  const matched = elements.find(
    child => child.getAttribute('data-id') === element.getAttribute('data-id')
  )

  return matched
}

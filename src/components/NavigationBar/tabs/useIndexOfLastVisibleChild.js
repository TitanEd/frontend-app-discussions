import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useWindowSize } from '@openedx/paragon';

const invisibleStyle = {
  position: 'absolute',
  left: 0,
  pointerEvents: 'none',
  visibility: 'hidden',
};

/**
 * This hook will find the index of the last child of a containing element
 * that fits within its bounding rectangle. This is done by summing the widths
 * of the children until they exceed the width of the container.
 *
 * The hook returns an array containing:
 * [indexOfLastVisibleChild, containerElementRef, invisibleStyle, overflowElementRef]
 *
 * indexOfLastVisibleChild - the index of the last visible child
 * containerElementRef - a ref to be added to the containing html node
 * invisibleStyle - a set of styles to be applied to child of the containing node
 *    if it needs to be hidden. These styles remove the element visually, from
 *    screen readers, and from normal layout flow. But, importantly, these styles
 *    preserve the width of the element, so that future width calculations will
 *    still be accurate.
 * overflowElementRef - a ref to be added to an html node inside the container
 *    that is likely to be used to contain a "More" type dropdown or other
 *    mechanism to reveal hidden children. The width of this element is always
 *    included when determining which children will fit or not. Usage of this ref
 *    is optional.
 */
export default function useIndexOfLastVisibleChild() {
  const containerElementRef = useRef(null);
  const overflowElementRef = useRef(null);
  const containingRectRef = useRef({});
  const childrenCountRef = useRef(0);
  const [indexOfLastVisibleChild, setIndexOfLastVisibleChild] = useState(-1);
  const windowSize = useWindowSize();

  const calculateVisibleIndex = useCallback(() => {
    if (!containerElementRef.current) {
      return;
    }

    const containingRect = containerElementRef.current.getBoundingClientRect();
    const currentChildrenCount = containerElementRef.current.children.length;

    // Recalculate if width changed, children count changed, or on initial render
    const widthChanged = containingRect.width !== containingRectRef.current.width;
    const childrenCountChanged = currentChildrenCount !== childrenCountRef.current;
    const isInitialRender = containingRectRef.current.width === undefined;

    if (!widthChanged && !childrenCountChanged && !isInitialRender) {
      return;
    }

    // Update refs for future comparison
    containingRectRef.current = containingRect;
    childrenCountRef.current = currentChildrenCount;

    // Use requestAnimationFrame to ensure DOM is fully rendered before measuring
    requestAnimationFrame(() => {
      if (!containerElementRef.current) {
        return;
      }

      // Get array of child nodes from NodeList form
      const childNodesArr = Array.prototype.slice.call(containerElementRef.current.children);
      const { nextIndexOfLastVisibleChild } = childNodesArr
        // filter out the overflow element
        .filter(childNode => childNode !== overflowElementRef.current)
        // sum the widths to find the last visible element's index
        .reduce((acc, childNode, index) => {
          // use floor to prevent rounding errors
          acc.sumWidth += Math.floor(childNode.getBoundingClientRect().width);
          if (acc.sumWidth <= containingRect.width) {
            acc.nextIndexOfLastVisibleChild = index;
          }
          return acc;
        }, {
          // Include the overflow element's width to begin with. Doing this means
          // sometimes we'll show a dropdown with one item in it when it would fit,
          // but allowing this case dramatically simplifies the calculations we need
          // to do above.
          sumWidth: overflowElementRef.current
            ? Math.floor(overflowElementRef.current.getBoundingClientRect().width)
            : 0,
          nextIndexOfLastVisibleChild: -1,
        });

      setIndexOfLastVisibleChild(nextIndexOfLastVisibleChild);
    });
  }, []);

  useLayoutEffect(() => {
    calculateVisibleIndex();
  }, [windowSize, calculateVisibleIndex]);

  // Watch for changes in children count using MutationObserver
  useEffect(() => {
    if (!containerElementRef.current) {
      return;
    }

    const observer = new MutationObserver(() => {
      calculateVisibleIndex();
    });

    observer.observe(containerElementRef.current, {
      childList: true,
      subtree: false,
    });

    // Also use ResizeObserver to watch for container size changes
    let resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        calculateVisibleIndex();
      });
      resizeObserver.observe(containerElementRef.current);
    }

    return () => {
      observer.disconnect();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [calculateVisibleIndex]);

  return [indexOfLastVisibleChild, containerElementRef, invisibleStyle, overflowElementRef];
}

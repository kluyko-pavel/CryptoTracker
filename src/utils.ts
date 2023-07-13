import { useEffect } from "react";

export const getItemInitialState = (item: string) => {
  const localState = localStorage.getItem(item);
  if (localState) {
    const parse = JSON.parse(localState);
    return parse;
  }
  return [];
};

export const useClickOutside = (
  ref: React.RefObject<HTMLElement> | Array<React.RefObject<HTMLElement>>,
  cb: (e: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const checkClickedElement = (el: React.RefObject<HTMLElement>) =>
        !el.current || el.current.contains(event.target as Element);

      if (
        (Array.isArray(ref) && ref.find(checkClickedElement)) ||
        (!Array.isArray(ref) && checkClickedElement(ref))
      ) {
        return;
      }

      cb(event);
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, cb]);
};

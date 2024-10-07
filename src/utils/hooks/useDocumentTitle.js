// useDocumentTitle.js
import { useRef, useEffect } from 'react'

function useDocumentTitle(title, prevailOnUnmount = false) {
    // for Changing title of everyPage
    
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [prevailOnUnmount])
}

export default useDocumentTitle
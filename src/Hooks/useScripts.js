import { useEffect } from 'react';

const useScripts = (urls) => {
  useEffect(() => {
    const scripts = urls.map(url => {
      const s = document.createElement('script');
      s.src = url;
      s.async = false;

      document.body.appendChild(s);

      return s;
    });

    return () => {
      scripts.forEach(script => {
        document.body.removeChild(script);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join(',')]);
};

export default useScripts;

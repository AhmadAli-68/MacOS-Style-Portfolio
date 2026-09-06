import { useLayoutEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import useWindowStore from '@store/window'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

const WindowWrapper = (Component, windowKey) => {
  const wrapped = (prop) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null)

    useGSAP(() => {
      const currentElement = ref.current;
      if (!currentElement | !isOpen) return

      currentElement.style.display = 'block';

      gsap.fromTo(currentElement, {
        scale: 0.8,
        opacity: 0,
        y: 40
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out'
      })
    }, [isOpen])

    useGSAP(() => {
      const currentElement = ref.current;
      if (!currentElement) return

      const [instance] = Draggable.create(currentElement, {
        onPress: () => focusWindow(windowKey)
      })

      return () => instance.kill()
    }, [])

    useLayoutEffect(() => {
      const currentElement = ref.current;
      if (!currentElement) return;
      currentElement.style.display = isOpen ? 'block' : 'none';
    }, [isOpen])

    return <section
      id={windowKey}
      ref={ref}
      style={{ zIndex }}
      className='absolute'
    >
      <Component {...prop} />
    </section>
  }

  wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

  return wrapped;
};

export default WindowWrapper
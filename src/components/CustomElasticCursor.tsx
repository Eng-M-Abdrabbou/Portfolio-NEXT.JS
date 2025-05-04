'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useMouse } from '@/hooks/use-mouse'

export default function CustomElasticCursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const maskCircleRef = useRef<SVGCircleElement>(null) // Add ref for the mask circle
  const [isHovering, setIsHovering] = useState(false)
  const [hoverBounds, setHoverBounds] = useState<DOMRect | null>(null)
  const mouse = useMouse()
  const velocity = useRef({ x: 0, y: 0 })
  const position = useRef({ x: mouse.x, y: mouse.y })

  // Hide default cursor
  useEffect(() => {
    // document.body.style.cursor = 'block'
    return () => {
      // document.body.style.cursor = 'block'
    }
  }, [])

  // Hover detection
  useEffect(() => {
    const checkHover = (target: EventTarget) => {
      const element = target as HTMLElement;
      if (element instanceof HTMLElement) {
        return element.closest('.cursor-can-hover');
      }
      return null;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = checkHover(e.target!)
      if (target) {
  //      console.log('Mouse entered hoverable element', target);
        setIsHovering(true)
        setHoverBounds(target.getBoundingClientRect())
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (!checkHover(e.relatedTarget!)) {
     //  console.log('Mouse left hoverable element');
        setIsHovering(false)
        setHoverBounds(null)
      }
    }

    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.ticker.add(animateBlob)
    })
    return () => {
      ctx.revert()
      gsap.ticker.remove(animateBlob)
    }
  }, [isHovering, hoverBounds, mouse])

  const animateBlob = () => {
    if (!blobRef.current || !dotRef.current || !maskCircleRef.current) {
 //     console.log('Refs not available in animateBlob:', { blob: blobRef.current, dot: dotRef.current, maskCircle: maskCircleRef.current });
      return;
    }

   // console.log('Mouse position in animateBlob:', { x: mouse.x, y: mouse.y });

    // Update dot position
    gsap.set(dotRef.current, {
     left: mouse.x,
     top: mouse.y,
    })

    // Update mask circle position
   // console.log('Updating mask circle position:', { x: mouse.x, y: mouse.y });
    gsap.set(maskCircleRef.current, {
      attr: {
        cx: mouse.x,
        cy: mouse.y,
      },
    })

    // Elastic blob logic
    if (!isHovering) {
      const damping = 0.2
      velocity.current.x += (mouse.x - position.current.x) * damping
      velocity.current.y += (mouse.y - position.current.y) * damping
      velocity.current.x *= 0.5
      velocity.current.y *= 0.5

      position.current.x += velocity.current.x
      position.current.y += velocity.current.y

      const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI)
      const velocityMagnitude = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      const scaleX = 1 + velocityMagnitude * 0.02
      const scaleY = 1 - velocityMagnitude * 0.01

      // Animate back to default state
      gsap.killTweensOf(blobRef.current); // Kill existing tweens
      gsap.to(blobRef.current, {
        left: position.current.x,
        top: position.current.y,
        rotation: angle,
        scaleX,
        scaleY,
        width: 48, // Default width (from className w-12)
        height: 48, // Default height (from className h-12)
        borderRadius: '9999px', // Default rounded-full
        duration: 0.3, // Short duration for smooth transition
        backdropFilter:'sepia(50%)',
        ease: 'power2.out',
      })
    } else if (hoverBounds) {
      // Hover state animation
      gsap.killTweensOf(blobRef.current); // Kill existing tweens
      gsap.to(blobRef.current, {
        left: hoverBounds.left + hoverBounds.width / 2,
        top: hoverBounds.top + hoverBounds.height / 2,
        width: hoverBounds.width*1.1, // Match hovered element width
        height: hoverBounds.height*1.2, // Match hovered element height
        borderRadius: getComputedStyle(document.documentElement)
          .getPropertyValue('--radius') || '24px', // Use CSS variable or default
        rotation: 0, // Reset rotation
        scaleX: 1, // Reset scaleX
        scaleY: 1, // Reset scaleY
        backdropFilter:'invert(100%)',
        duration: 0.3, // Adjusted duration
        ease: 'power2.out', // Adjusted ease
      })
    }
  }

  return (
    <>
      {/* Grayscale Overlay with SVG Mask */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          // filter: 'grayscale(100%)', // Removed CSS filter
          filter: 'url(#grayscale-filter)', // Reference SVG filter
          maskImage: 'url(#cursor-mask)',
          WebkitMaskImage: 'url(#cursor-mask)',
        }}
      ></div>

      {/* SVG for Mask Definition */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-40">
        <defs>
          {/* Grayscale Filter Definition */}
          <filter id="grayscale-filter">
            <feColorMatrix type="saturate" values="0" />
          </filter>

          <mask id="cursor-mask">
            {/* This rectangle makes the whole area opaque by default */}
            {/* This circle creates a "hole" in the mask, masking the grayscale content */}
            {/* The position and size of this circle will be updated by JS */}
            <circle
              ref={maskCircleRef} // Add ref here
              id="mask-circle"
              cx={mouse.x} // This will be updated
              cy={mouse.y} // This will be updated
              r="20" // Adjust radius as needed
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      {/* Custom Cursor Elements */}
      <div
        ref={blobRef}
        className="fixed w-12 h-12  backdrop-blur-sm
          border-2 border-primary rounded-full pointer-events-none
          transform -translate-x-1/2 -translate-y-1/2 z-50"
        style={{ }}
      />
      <div
        ref={dotRef}
        className="fixed w-3 h-3 bg-primary rounded-full
          pointer-events-none transform -translate-x-1/2
          -translate-y-1/2 z-50"
      />
      {/* <style jsx global>{`
        body {
          cursor: none !important;
        }
        * {
          cursor: none !important;
        }
      `}</style> */}
    </>

  )
}

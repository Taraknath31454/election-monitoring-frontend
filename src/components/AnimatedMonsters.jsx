import { useEffect, useRef, useState, useCallback } from "react";

const AnimatedMonsters = ({ showPassword = false, loginError = false }) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for each monster's eyes
  const monster1LeftEye = useRef(null);
  const monster1RightEye = useRef(null);
  const monster2Eye = useRef(null);
  const monster3LeftEye = useRef(null);
  const monster3RightEye = useRef(null);

  // Store eye center positions
  const eyeCenters = useRef({});
  const [eyePositions, setEyePositions] = useState({});

  // Calculate eye centers on mount and resize
  useEffect(() => {
    const updateEyeCenters = () => {
      const centers = {};
      
      const getCenter = (ref) => {
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
        return null;
      };

      centers.m1Left = getCenter(monster1LeftEye);
      centers.m1Right = getCenter(monster1RightEye);
      centers.m2 = getCenter(monster2Eye);
      centers.m3Left = getCenter(monster3LeftEye);
      centers.m3Right = getCenter(monster3RightEye);

      eyeCenters.current = centers;
      setEyePositions(centers);
    };

    // Small delay to ensure DOM is ready
    setTimeout(updateEyeCenters, 100);
    window.addEventListener("resize", updateEyeCenters);
    return () => window.removeEventListener("resize", updateEyeCenters);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate pupil position based on mouse and eye center
  const getPupilPosition = useCallback((eyeKey) => {
    if (showPassword) {
      // Look left when password is visible
      return { x: -5, y: 0 };
    }

    const eyeCenter = eyeCenters.current[eyeKey];
    if (!eyeCenter) return { x: 0, y: 0 };

    // Use Math.atan2 as specified in requirements
    const angle = Math.atan2(
      mousePosition.y - eyeCenter.y,
      mousePosition.x - eyeCenter.x
    );
    
    // Distance to move pupil (limited within eye)
    const maxDistance = 5;
    const distance = Math.min(
      maxDistance, 
      Math.hypot(
        mousePosition.x - eyeCenter.x,
        mousePosition.y - eyeCenter.y
      ) / 25
    );

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  }, [showPassword, mousePosition]);

  // Get pupil positions for each eye
  const m1LeftPupil = getPupilPosition("m1Left");
  const m1RightPupil = getPupilPosition("m1Right");
  const m2Pupil = getPupilPosition("m2");
  const m3LeftPupil = getPupilPosition("m3Left");
  const m3RightPupil = getPupilPosition("m3Right");

  const shakeClass = loginError ? "animate-[shake_0.5s_ease-in-out]" : "";

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center gap-10 p-8"
    >
      {/* Monster 1 - Emerald Blob */}
      <div className={`relative ${shakeClass}`} style={{ animationDelay: '0s' }}>
        <div
          className="relative flex items-center justify-center animate-[float_4s_ease-in-out_infinite]"
          style={{
            width: "150px",
            height: "130px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            boxShadow: `
              0 15px 50px rgba(16, 185, 129, 0.4),
              inset 0 -8px 25px rgba(0,0,0,0.15),
              inset 0 8px 25px rgba(255,255,255,0.2)
            `,
          }}
        >
          {/* Shine */}
          <div className="absolute top-4 left-4 w-10 h-10 bg-white opacity-20 rounded-full blur-md" />
          
          {/* Eyes */}
          <div className="flex items-center justify-center gap-8">
            <div ref={monster1LeftEye} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div 
                className="w-5 h-5 bg-gray-900 rounded-full transition-transform duration-75 ease-out"
                style={{ transform: `translate(${m1LeftPupil.x}px, ${m1LeftPupil.y}px)` }}
              >
                <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1 opacity-70" />
              </div>
            </div>
            <div ref={monster1RightEye} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div 
                className="w-5 h-5 bg-gray-900 rounded-full transition-transform duration-75 ease-out"
                style={{ transform: `translate(${m1RightPupil.x}px, ${m1RightPupil.y}px)` }}
              >
                <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1 opacity-70" />
              </div>
            </div>
          </div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black opacity-20 rounded-full blur-md animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Monster 2 - Amber Rounded */}
      <div className={`relative ${shakeClass}`} style={{ animationDelay: '0.2s' }}>
        <div
          className="relative flex items-center justify-center animate-[float_4s_ease-in-out_infinite]"
          style={{
            width: "140px",
            height: "120px",
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            borderRadius: "30%",
            boxShadow: `
              0 15px 50px rgba(245, 158, 11, 0.4),
              inset 0 -8px 25px rgba(0,0,0,0.15),
              inset 0 8px 25px rgba(255,255,255,0.2)
            `,
          }}
        >
          {/* Shine */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-white opacity-20 rounded-full blur-md" />
          
          {/* Single Center Eye */}
          <div ref={monster2Eye} className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner">
            <div 
              className="w-6 h-6 bg-gray-900 rounded-full transition-transform duration-75 ease-out"
              style={{ transform: `translate(${m2Pupil.x}px, ${m2Pupil.y}px)` }}
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full mt-1 ml-1 opacity-70" />
            </div>
          </div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black opacity-20 rounded-full blur-md animate-[pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
      </div>

      {/* Monster 3 - Red Organic */}
      <div className={`relative ${shakeClass}`} style={{ animationDelay: '0.4s' }}>
        <div
          className="relative flex items-center justify-center animate-[float_4s_ease-in-out_infinite]"
          style={{
            width: "145px",
            height: "125px",
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            boxShadow: `
              0 15px 50px rgba(239, 68, 68, 0.4),
              inset 0 -8px 25px rgba(0,0,0,0.15),
              inset 0 8px 25px rgba(255,255,255,0.2)
            `,
          }}
        >
          {/* Shine */}
          <div className="absolute top-4 left-4 w-9 h-9 bg-white opacity-20 rounded-full blur-md" />
          
          {/* Eyes */}
          <div className="flex items-center justify-center gap-7">
            <div ref={monster3LeftEye} className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div 
                className="w-4.5 h-4.5 bg-gray-900 rounded-full transition-transform duration-75 ease-out"
                style={{ transform: `translate(${m3LeftPupil.x}px, ${m3LeftPupil.y}px)` }}
              >
                <div className="w-2 h-2 bg-white rounded-full mt-0.5 ml-0.5 opacity-70" />
              </div>
            </div>
            <div ref={monster3RightEye} className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div 
                className="w-4.5 h-4.5 bg-gray-900 rounded-full transition-transform duration-75 ease-out"
                style={{ transform: `translate(${m3RightPupil.x}px, ${m3RightPupil.y}px)` }}
              >
                <div className="w-2 h-2 bg-white rounded-full mt-0.5 ml-0.5 opacity-70" />
              </div>
            </div>
          </div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-22 h-5 bg-black opacity-20 rounded-full blur-md animate-[pulse_4s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};

export default AnimatedMonsters;

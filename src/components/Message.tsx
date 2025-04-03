import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Message({
  text,
  role,
}: {
  text: string;
  role: "user" | "bot";
}) {
  const msgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      msgRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, []);

  return (
    <div
      ref={msgRef}
      className={`mb-2 p-2 rounded ${
        role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"
      }`}
    >
      {text}
    </div>
  );
}

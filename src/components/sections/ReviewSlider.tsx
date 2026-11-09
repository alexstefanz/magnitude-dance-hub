import { useEffect, useRef } from "react";

const TRUSTINDEX_SRC = "https://cdn.trustindex.io/loader.js?af7f0d86939e750dbd06ceb7d4e";

export function ReviewSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = TRUSTINDEX_SRC;
    script.defer = true;
    script.async = true;
    container.appendChild(script);
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="section-y bg-secondary/40" aria-labelledby="reviews-heading">
      <div className="container-page">
        <div className="text-center">
          <p className="eyebrow">Recenzii Google</p>
          <h2 id="reviews-heading" className="mt-2 text-3xl md:text-4xl">
            Ce spun cursanții?
          </h2>
        </div>
        <div ref={containerRef} className="mt-8" />
      </div>
    </section>
  );
}

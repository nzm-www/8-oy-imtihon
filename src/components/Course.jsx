import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

function Course() {
  const containerRef = useRef(null);
  const controls = useAnimationControls();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
        .then((response) => {
          if (!response.ok) {
            return; 
          }
          return response.json();
        })
        .then((data) => {
          setItems(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const containerWidth = containerRef.current.offsetWidth;
    const itemWidth = containerWidth / 4;

    controls.start({
      x: [-itemWidth, -itemWidth * items.length],
      transition: {
        duration: items.length * 5,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [items, controls]);

  return (
    <div className="flex items-center justify-center pt-[104px] w-[900px]">
      <div className="text-center">
        <h1 className="text-[#87CEEB] font-bold text-6xl">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <p className="text-sm text-[#A9A9A9] pt-2 pb-12">
          Get all the Info regarding your favorite Crypto Currency
        </p>
        <div className="relative h-40 w-[1000px]">
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l to-transparent z-20" />

          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              animate={controls}
              className="flex"
              style={{ width: `${items.length * 25}%` }}
            >
              {[...items, ...items].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-[270px] px-4"
                >
                  <div className="flex flex-col items-center justify-center w-full h-40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain mb-2"
                    />
                    <span className="text-cyan-400 font-medium">
                      {item.name}
                    </span>
                    <span className="text-gray-300 text-sm">
                      ${item.current_price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;

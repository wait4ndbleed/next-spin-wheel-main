/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Winwheel } from "winwheel-module";

import SpinBtn from "../../public/images/spin-marker-normal.png"

export default function Spin() {
  const wheelInstance = useRef<any>();
  const [isSpinning, setIsSpinning] = useState(false);

  const alertPrize = (segment: any) => {
    alert(`You have won ${segment.text}`);
    reset();
  };

  const reset = () => {
    wheelInstance.current.stopAnimation(false);
    wheelInstance.current.rotationAngle = 0;
    wheelInstance.current.draw();
    setIsSpinning(false);
  };

  const spin = () => {
    if (isSpinning) {
      return;
    }

    setIsSpinning(true);
    wheelInstance.current.startAnimation();
  };

  useEffect(() => {
    wheelInstance.current = new Winwheel({
      numSegments: 8, // Specify number of segments.
      outerRadius: 212, // Set outer radius so wheel fits inside the background.
      textFontSize: 28, // Set font size as desired.
      // Define segments including colour and text.
      segments: [
        { fillStyle: "#eae56f", text: "Pecado" },
        { fillStyle: "#89f26e", text: "Gênesis1.14" },
        { fillStyle: "#7de6ef", text: "Obadias1.17" },
        { fillStyle: "#e7706f", text: "Romanos11.3" },
        { fillStyle: "#eae56f", text: "Pecado" },
        { fillStyle: "#89f26e", text: "Lucas9.56" },
        { fillStyle: "#7de6ef", text: "Mateus5.8" },
        { fillStyle: "#e7706f", text: "Isaías 49.16" },
      ],
      // Specify the animation to use.
      animation: {
        type: "spinToStop",
        duration: 5, // Duration in seconds.
        spins: 8, // Number of complete spins.
        callbackFinished: alertPrize,
      },
    });
  }, []);

  return (
    <div className="grid grid-rows-1 items-center gap-8">
      <div className="xl:col-span-3 flex justify-center relative">
        <canvas id="canvas" width="434" height="434" className="w-5/6">
          <p className="text-white text-center">
            Sorry, your browser doesn't support canvas. Please try another.
          </p>
        </canvas>
        <button
          className="disabled:cursor-not-allowed absolute w-max h-max top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={spin}
          disabled={isSpinning}
        >
          <Image
            className="object-contain w-24 h-24"
            src={SpinBtn}
            alt="Spin"
          />
        </button>
      </div>
    </div>
  );
}

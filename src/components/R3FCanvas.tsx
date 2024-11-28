"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import NoiseGrid from "@/components/NoiseGrid";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import ControlsBar from "./ControlsBar";
import { Controls } from "@/types/types";

const defaultControls: Controls = {
  nScale: 0.75,
  zPosScale: 1,
  lowColor: { r: 81, g: 81, b: 128 },
  highColor: { r: 220, g: 220, b: 220 },
  lightnessMult: 1,
};

export default function R3FCanvas() {
  const [controls, setControls] = useState<Controls>(defaultControls);
  return (
    <>
      <ControlsBar controls={controls} setControls={setControls} />
      <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
        <NoiseGrid {...controls} />
        <OrbitControls />
      </Canvas>
    </>
  );
}

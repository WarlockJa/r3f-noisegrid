"use client";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { ImprovedNoise } from "@/lib/ImprovedNoise";
import { useRef } from "react";
import { Controls } from "@/types/types";
import rgbToThreeColor from "@/lib/rgbToThreeColor";

const Noise = new ImprovedNoise();

export default function NoiseGrid(controls: Controls) {
  // exercising controls over points via ref
  const pointsRef = useRef<THREE.Points>(null);
  // geometry for points distribution
  const planeGeo = new THREE.PlaneGeometry(8, 6, 64, 48);
  const coords = planeGeo.attributes.position;
  let colors = [];
  const col = new THREE.Color();
  const p = new THREE.Vector3();

  // CONTROLS
  const nScale = controls.nScale ?? 0.75;
  const zPosScale = controls.zPosScale ?? 1.0;
  const lowColor = rgbToThreeColor(controls.lowColor);
  const highColor = rgbToThreeColor(controls.highColor);
  const lightnessMult = controls.lightnessMult ?? 1;

  let elapsedTime = 0;
  useFrame((_, t) => {
    if (!pointsRef.current) return;

    elapsedTime += t * 0.5;
    const geo = pointsRef.current.geometry;
    const verts = geo.attributes.position;
    let ns;
    colors = [];
    for (let i = 0; i < coords.count; i += 1) {
      p.fromBufferAttribute(verts, i);
      ns = Noise.noise(p.x * nScale, p.y * nScale, elapsedTime);
      p.z = ns * zPosScale;
      verts.setXYZ(i, p.x, p.y, p.z);
      col.lerpColors(lowColor, highColor, ns * lightnessMult);
      const { r, g, b } = col;
      colors.push(r, g, b);
    }
    geo.setAttribute("position", verts);
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    verts.needsUpdate = true;
  });

  // loading sprite for the point
  const sprite = useLoader(THREE.TextureLoader, "./circle.png");

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={coords.count}
          array={coords.array}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial alphaTest={0.5} vertexColors size={0.1} map={sprite} />
    </points>
  );
}

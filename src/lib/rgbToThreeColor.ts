import * as THREE from "three";
import { RgbColor } from "colord";

export default function rgbToThreeColor(colors: RgbColor): THREE.Color {
  try {
    return new THREE.Color(colors.r / 255, colors.g / 255, colors.b / 255);
  } catch (error) {
    console.log(error);
    return new THREE.Color(0.5, 0.5, 0.5);
  }
}

import React from "react"
import { FaCode, FaSketch, FaAndroid,FaMobile,FaVrCardboard } from "react-icons/fa"
export default [
  {
    id: 1,
    icon: <FaCode className="service-icon" />,
    title: "MLCV and data analytics",
    text: `Develop computer vision applications using ML/deep learning methods. Preprocess data, analyse, extract useful information using algorithms, visualize and evaluate results. Tools & Tech: Opencv, Python, Keras, Tensorflow, Spark, Scikit, pandas, plotly`,
  },
  {
    id: 2,
    icon: <FaMobile FaSketch className="service-icon" />,
    title: "mobile app development",
    text: `Built functional product from scratch, from ideation-design-development-testing-lauch in app store marketplace. Tools & Tech: Swift, SwiftUI, Java, Flutter, React-Native, Sketch, Figma, Invison`,
  },
  {
    id: 3,
    icon: <FaVrCardboard className="service-icon" />,
    title: "VR/AR app development",
    text: `Involved in designing 3D components, flow visualizations. Developed and distributed the application to multiple platforms-Microsoft Hololens, Oculus. Tools & Tech: Unity, ARKit, MRTKkit, Blender`,
  },
]

import React from "react"
import { FaCode, FaSketch, FaAndroid,FaMobile,FaVrCardboard } from "react-icons/fa"
export default [
  {
    id: 1,
    icon: <FaCode className="service-icon" />,
    title: "MLCV and data solutions",
    text: `Design, develop and train machine learning and computer vision approaches. Formulate data exploration techinques to understand and solve the problem using algorithms and analyze the results. Tools & Tech: Python, Keras, Tensorflow, Spark, Scikit`,
  },
  {
    id: 2,
    icon: <FaMobile FaSketch className="service-icon" />,
    title: "mobile app development",
    text: `Build functional product from scratch, from ideation-design-development-testing-lauch in app store marketplace. Tools & Tech: Swift, SwiftUI, Java, Flutter, React-Native, Sketch, Figma, Invison`,
  },
  {
    id: 3,
    icon: <FaVrCardboard className="service-icon" />,
    title: "VR/AR app development",
    text: `Designing 3D components, flow visualizations, develop and integrate the application to multiple platforms-Microsoft Hololens, Oculus. Tools & Tech: Unity, ARKit, MRTKkit, Blender`,
  },
]

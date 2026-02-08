export type Service = {
  id: number;
  icon: "code" | "mobile" | "vr";
  title: string;
  text: string;
};

export const services: Service[] = [
  {
    id: 1,
    icon: "code",
    title: "MLCV and data analytics",
    text: "Develop computer vision applications using ML and deep learning methods. Preprocess and analyze data, extract useful insights, and evaluate results using OpenCV, Python, Keras, TensorFlow, Spark, Scikit, pandas, and Plotly.",
  },
  {
    id: 2,
    icon: "mobile",
    title: "mobile app development",
    text: "Build product-ready apps end-to-end from ideation to App Store and Play Store launch with Swift, SwiftUI, Java, Flutter, React Native, Figma, and Sketch.",
  },
  {
    id: 3,
    icon: "vr",
    title: "VR/AR app development",
    text: "Design 3D components and immersive product experiences across platforms including Microsoft HoloLens and Oculus using Unity, ARKit, MRTK, and Blender.",
  },
];

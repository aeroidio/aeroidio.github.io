// import singleton from "./DataSingleton.js";
// import * as ml5 from "ml5";
//import p5 from 'p5';
import ml5 from 'ml5'
export default function sketch(p) {
  const videoSize = {
    width: 960,
    height: 480,
  };
  const resizedSize = {
    width: 224, // Adjusted for MobileNet
    height: 224, // Adjusted for MobileNet
  };
  let video;
  let mobilenetClassifier;
  let labelDiv;
  let confidenceDiv;
  let offscreenGraphics;

  p.setup = () => {
    const myCanvas = p.createCanvas(videoSize.width, videoSize.height);
    //myCanvas.parent("canvasContainer");
    //   myCanvas.hide();
    video = p.createCapture(p.VIDEO);
    video.size(videoSize.width, videoSize.height);
    video.hide(); // Ensure the original video feed is not displayed

    // Create an off-screen graphics buffer for the resized frame
    offscreenGraphics = p.createGraphics(resizedSize.width, resizedSize.height);

    // Load the MobileNet model
    mobilenetClassifier = ml5.imageClassifier("MobileNet", p.modelReady);

    // Create placeholders for label and confidence
    labelDiv = p.createDiv("Label: ");
    confidenceDiv = p.createDiv("Confidence: ");

    // Set up a function to continuously classify video frames
    p.classifyVideo();
  };

  p.modelReady = () => {
    console.log("Model Loaded!");
  };

  p.classifyVideo = () => {
    // Capture a frame from the video
    p.image(video, 0, 0, videoSize.width, videoSize.height);

    // Resize the frame to MobileNet's expected dimensions
    offscreenGraphics.image(video, 0, 0, resizedSize.width, resizedSize.height);

    // Classify the processed frame using MobileNet
    mobilenetClassifier.classify(offscreenGraphics, p.gotResult);
  };

  p.gotResult = (error, results) => {
    if (error) {
      console.error(error);
      return;
    }

    // put data in singleton
    // singleton.label = results[0].label;
    // singleton.confidence = results[0].confidence;
    // Update the content of the existing div elements
    labelDiv.html(`Label: ${results[0].label}`);
    confidenceDiv.html(`Confidence: ${p.nf(results[0].confidence, 0, 2)}`);

    // Continue classification
    p.classifyVideo();
  };

  p.draw = () => {
    // Display the processed video frame on the canvas
    p.image(offscreenGraphics, 0, 0, videoSize.width, videoSize.height);
  };
};



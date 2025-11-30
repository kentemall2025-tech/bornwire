"use client";
// videocomp.tsx
import React, { forwardRef } from "react";

interface VideocompProps {
  src: string;
  title: string;
}

const Videocomp = forwardRef<HTMLVideoElement, VideocompProps>(
  ({ src, title }, ref) => {
    return (
      <div>
        <video ref={ref} controls title="">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>{title}</p>
      </div>
    );
  }
);

Videocomp.displayName = "Videocomp"; // This is important for debugging

export default Videocomp;

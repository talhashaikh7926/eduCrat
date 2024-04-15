"use client";

import React from "react";
import ModalVideo from "react-modal-video";
export default function ModalVideoComponent({ isOpen, setIsOpen, videoId }) {
  var Id = videoId?.split('v=')[1];
  return (
    <ModalVideo
      channel="youtube"
      youtube={{ mute: 0, autoplay: 0 }}
      isOpen={isOpen}
      videoId={Id}
      onClose={() => setIsOpen(false)}
    />
  );
}

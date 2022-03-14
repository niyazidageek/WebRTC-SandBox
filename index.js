var stream;
var sam = true;
var audio = false;
var video = false;

function hasUserMedia() {
  return !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia
  );
}

function createStream(video = false, audio = false) {
  this.video = video;
  this.audio = audio;
  if (hasUserMedia()) {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    navigator.getUserMedia(
      { video, audio },
      function (s) {
        stream = s;
        var video = document.querySelector("video");

        video.srcObject = stream;
      },
      function (err) {}
    );
  } else {
    alert("WebRTC is not supported");
  }
}

function stopStream(video, audio) {
  this.video = video;
  this.audio = audio;

  video || stream.getVideoTracks()[0]?.stop();
  audio || stream.getAudioTracks()[0]?.stop();
}

createStream(true, true);

btnGetAudioTracks.addEventListener("click", function () {
  console.log("getAudioTracks");
  console.log(stream.getAudioTracks());
});

btnGetTrackById.addEventListener("click", function () {
  console.log("getTrackById");
  console.log(stream.getTrackById(stream.getAudioTracks()[0].id));
});

btnGetTracks.addEventListener("click", function () {
  console.log("getTracks()");
  console.log(stream.getTracks());
});

btnGetVideoTracks.addEventListener("click", function () {
  console.log("getVideoTracks()");
  console.log(stream.getVideoTracks());
});

btnRemoveAudioTrack.addEventListener("click", function () {
  console.log("removeAudioTrack()");
  stream.removeTrack(stream.getAudioTracks()[0]);
});

btnRemoveVideoTrack.addEventListener("click", function () {
  console.log("removeVideoTrack()");
  stream.removeTrack(stream.getVideoTracks()[0]);
});

btnHandleVideo.addEventListener("click", function () {
  video ? stopStream(!video, audio) : createStream(!video, audio);
});

btnHandleAudio.addEventListener("click", function () {
  audio ? stopStream(video, !audio) : createStream(video, !audio);
});

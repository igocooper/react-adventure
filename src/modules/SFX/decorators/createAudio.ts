export const createAudio = (
  src: string,
  options: {
    volume?: number;
    loop?: boolean;
  } = {}
) => {
  const audio = new Audio(src);
  const originalPlay = audio.play;
  audio.play = async () => {
    if (window.config?.sound === false) {
      return;
    }

    audio.pause();
    // Set the current time to the beginning
    audio.currentTime = 0;
    // Play the audio again
    await originalPlay.call(audio);
  };

  const optionsEntries = Object.entries(options);

  if (optionsEntries.length !== 0) {
    audio.addEventListener('loadeddata', () => {
      optionsEntries.forEach(([property, value]) => {
        // @ts-expect-error
        audio[property] = value;
      });
    });
  }

  return audio;
};

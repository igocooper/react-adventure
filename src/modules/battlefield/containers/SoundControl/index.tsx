import React, { useCallback, useEffect, useState } from 'react';
import { Panel, Icon } from './styled';
import SFX from 'modules/SFX';

export const SoundControl = () => {
  const [soundSetting, setSoundSetting] = useState(true);
  const [musicSetting, setMusicSetting] = useState(false);
  useEffect(() => {
    window.config = { sound: soundSetting };
  });
  const toggleSound = useCallback(() => {
    void SFX.click.play();

    if (soundSetting) {
      void SFX.battleTheme2.pause();
      setMusicSetting(false);
    }

    window.config.sound = !window.config.sound;
    setSoundSetting((state) => !state);
  }, [soundSetting, setSoundSetting]);

  const toggleMusic = useCallback(() => {
    if (!soundSetting) {
      return;
    }

    if (musicSetting) {
      void SFX.battleTheme2.pause();
    } else {
      void SFX.battleTheme2.play();
    }

    setMusicSetting((state) => !state);
  }, [soundSetting, musicSetting, setSoundSetting]);

  return (
    <Panel>
      <Icon onClick={toggleSound} onMouseOver={SFX.hover.play.bind(SFX.click)}>
        {soundSetting ? '🔈' : '🔇'}
      </Icon>
      <Icon
        onClick={toggleMusic}
        disabled={!soundSetting}
        onMouseOver={SFX.hover.play.bind(SFX.click)}
      >
        {musicSetting ? '🎵🎵' : '🎵🤐'}
      </Icon>
    </Panel>
  );
};

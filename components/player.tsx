import { useEffect, useRef, useState, FC } from "react";
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { Song } from "@prisma/client";
import { formatTime } from "../lib/formatter";

interface IPlayer {
  songs: Song[];
  activeSong: Song;
}

export const Player: FC<IPlayer> = ({ songs, activeSong }) => {
  const soundRef = useRef(null);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  const [playing, setPlaying] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(
    activeSong ? songs.findIndex((song) => song.id === activeSong.id) : 0
  );
  const [seek, setSeek] = useState<number>(0.0);
  const [duration, setDuration] = useState<number>(0.0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  useEffect(() => {
    setActiveSong(index);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  console.log("active song is", activeSong);

  const prevSong = () => {
    setIndex((state) => (state === 0 ? songs.length - 1 : state - 1));
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) {
          nextSong();
        }
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeat) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  const handlePlay = (value) => setPlaying(value);
  const handleRepeat = () => setRepeat((repeat) => !repeat);
  const handleShuffle = () => setShuffle((shuffle) => !shuffle);

  return (
    <Box>
      <Box>
        {activeSong && (
          <ReactHowler
            playing={playing}
            src={activeSong?.url}
            ref={soundRef}
            onLoad={onLoad}
            onEnd={onEnd}
          />
        )}
      </Box>
      <Center>
        <ButtonGroup>
          <IconButton
            aria-label="shuffle"
            outline="none"
            variant="link"
            color={shuffle ? "white" : "gray.600"}
            fontSize="24px"
            icon={<MdShuffle />}
            onClick={handleShuffle}
          />
          <IconButton
            aria-label="previous"
            outline="none"
            variant="link"
            color="gray.600"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              aria-label="play"
              outline="none"
              variant="link"
              color="white"
              fontSize="40px"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => handlePlay(false)}
            />
          ) : (
            <IconButton
              aria-label="pause"
              outline="none"
              variant="link"
              color="white"
              fontSize="40px"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => handlePlay(true)}
            />
          )}
          <IconButton
            aria-label="next"
            outline="none"
            variant="link"
            color="gray.600"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            aria-label="repeat"
            outline="none"
            variant="link"
            color={repeat ? "white" : "gray.600"}
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            onClick={handleRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex align="center" justify="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              id="player-range"
              value={[seek]}
              onChange={onSeek}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

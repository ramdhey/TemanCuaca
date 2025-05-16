import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

const CountdownTimer = ({duration, style}) => {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    // Hanya mengatur interval jika durasi lebih besar dari 0
    if (duration > 0) {
      const interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      // Bersihkan interval saat komponen di-unmount atau durasi berubah
      return () => clearInterval(interval);
    }
  }, [duration]);

  // Fungsi untuk format waktu ke MM:SS
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Mengubah style teks jika waktu kurang dari atau sama dengan 15 detik
  const countdownStyle = countdown <= 15 ? {...style, color: 'red'} : style;
  return <Text style={countdownStyle}>{formatTime(countdown)}</Text>;
};

export default CountdownTimer;

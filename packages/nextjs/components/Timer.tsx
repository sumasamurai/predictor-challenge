import { useEffect, useState } from 'react';

export const Timer = ({ unixTimestamp }: { unixTimestamp: number }) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    Math.max(0, Math.floor((unixTimestamp - Date.now() / 1000))
    ));

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
      } else {
        setRemainingSeconds(remainingSeconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingSeconds]);

  const minutes: number = Math.floor(remainingSeconds / 60);
  const seconds: number = remainingSeconds % 60;

  const formattedMinutes: string = minutes.toString().padStart(2, '0');
  const formattedSeconds: string = seconds.toString().padStart(2, '0');

  return (remainingSeconds > 0 &&
    <div className='timer'>
      <svg viewBox="0 0 43.99 37.23" className='timer-decor'>
        <g>
          <g>
            <path d="M0,2.14,2.14,0l17,17H44v3H19L2.37,37.23.25,35.11,16,19V18Z" />
          </g>
        </g>
      </svg>
      <div className='timer-text text-base font-light'>
        {formattedMinutes}:{formattedSeconds}
      </div>
    </div>
  );
}

export default Timer;
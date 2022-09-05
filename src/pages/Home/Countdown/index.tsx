import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "..";
import { CountdownContainer, CountdownSeparator } from "./style";

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CyclesContext);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  const currentSecond = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSecond / 60);
  const secondsAmount = currentSecond % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = "Ignite Feed";
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <CountdownSeparator>:</CountdownSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}

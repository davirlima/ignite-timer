import { HandPalm, Play } from "phosphor-react";
import {
  StartCountdownButton,
  StopCountdownButton,
  HomeContainer,
} from "./style";
import { createContext, useEffect, useState } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const newCycle: Cycle = {
  //     id: String(new Date().getTime()),
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   };

  //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleId(newCycle.id);

  //   reset();
  // }

  // const isFormSubmitDisabled = watch("task") === "";

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit" /*disabled={isFormSubmitDisabled}*/
          >
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}

export interface IRace {
  velocity: number;
  distance: number;
}

export interface IRaceProps {
  isStarted: boolean;
  onStart(): void;
  onReset(): void;
}

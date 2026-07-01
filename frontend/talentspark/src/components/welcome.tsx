import type { FC } from "react";

type WelcomeProps = {
  currentTime: Date;
};

const Welcome: FC<WelcomeProps> = ({ currentTime }) => {

  return (
    <section className="hero-block">
      <div>
        <p className="subtitle">Real-time status</p>
        <h1>Live time and date</h1>
      </div>
      <div className="time-blocks">
        <div className="time-card">
          <span>Current date</span>
          <strong>{currentTime.toLocaleDateString()}</strong>
        </div>
        <div className="time-card">
          <span>Current time</span>
          <strong>{currentTime.toLocaleTimeString()}</strong>
        </div>
      </div>
    </section>
  );

}

export default Welcome;
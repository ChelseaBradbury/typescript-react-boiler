import * as React from "react";
import "./main.css";

interface MainProps {}
interface MainState {}

export class Main extends React.Component<MainProps, MainState> {
  render(): React.ReactElement<void> {
    return <div className="main">Hello, World!</div>;
  }
}

export default Main;

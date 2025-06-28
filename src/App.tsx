import { useState } from "react";
import StackProfileCard from "./stack-profile-card/StackProfileCard";
import "./styles.css";

export default function App() {
  const [userProfiles, setUserProfiles] = useState(() => {
    return [
      {
        id: "1",
        name: "Javi A. Torres",
        title: "Software Engineer",
        status: "Online",
        avatarUrl: "https://www.reactbits.dev/assets/person.png",
      },
      {
        id: "2",
        name: "Javi A. Torres",
        title: "Software Engineer",
        status: "Offline",
        avatarUrl: "https://www.reactbits.dev/assets/person.png",
      },
      {
        id: "3",
        name: "Javi A. Torres",
        title: "Software Engineer",
        status: "Online",
        avatarUrl: "https://www.reactbits.dev/assets/person.png",
      },
      {
        id: "4",
        name: "Javi A. Torres",
        title: "Software Engineer",
        status: "Online",
        avatarUrl: "https://www.reactbits.dev/assets/person.png",
      },
    ];
  });
  return (
    <div className="App">
      <StackProfileCard profiles={userProfiles}></StackProfileCard>
    </div>
  );
}

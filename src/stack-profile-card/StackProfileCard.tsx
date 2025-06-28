import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import "./StackProfileCard.css";
import ProfileCard from "../profile-card/ProfileCard";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  profiles?: Array<{
    id: string;
    name: string;
    title: string;
    status: string;
    avatarUrl: string;
  }>;
}

export default function StackProfileCard({ profiles = [] }: StackProps) {
  const randomRotation = false;
  const sensitivity = 200;
  const animationConfig = { stiffness: 260, damping: 20 };
  const sendToBackOnClick = false;
  const [cards, setCards] = useState(profiles);

  const sendToBack = (id: string | number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="stack-container"
      style={{
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="card"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              <ProfileCard
                name={card.name}
                title={card.title}
                handle="javicodes"
                status={card.status}
                contactText="Contact Me"
                avatarUrl={card.avatarUrl}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log("Contact clicked")}
                iconUrl="./assets/iconpattern.png"
                grainUrl="./assets/grain.webp"
                miniAvatarUrl={undefined}
                showBehindGradient={true}
              ></ProfileCard>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}

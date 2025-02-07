// import WordRotate from "@/components/magicui/word-rotate";

import WordRotate from "./ui/word-rotate";

export function WordRotateDemo() {
  return (
    <WordRotate
      className="text-4xl md:text-6xl md:text-center font-bold"
      words={["Built From The", "Ground Up !"]}
    />
  );
}

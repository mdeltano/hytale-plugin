"use client";
import { ExternalLinkIcon, BookIcon, MessageSquare } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import Image, { StaticImageData } from "next/image";
import { localizeHref } from "@/lib/locale";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMessages } from "@/lib/hooks/useMessages";

import WulfrumProsthesis from "./(showcaseImages)/wulfrum_prosthesis.png";
import Melodium from "./(showcaseImages)/Melodium.gif";
import GaleWivern from "./(showcaseImages)/gale_wivern.gif";
import WulfrumArmor from "./(showcaseImages)/Wulfrum_Armor.gif";
import ElectricMotor from "./(showcaseImages)/HyEnergy_Electric_Motor.gif";
import { DiscordButton } from "./discord-button";
import { GitInfoButton } from "@/components/git-info-button";

interface ShowcaseItem {
  title: string;
  author: string;
  image: StaticImageData;
  link: string;
}

const ShowcaseCard = ({ item }: { item: ShowcaseItem }) => {
  return (
    <Card className="relative overflow-hidden w-96 h-64">
      <CardContent className="flex h-full items-center justify-center p-0">
        <div className="from-card absolute z-20 flex size-full items-end bg-linear-to-t from-15% to-transparent to-30% p-6">
          <div className="flex flex-1 flex-col">
            <h3 className="z-20 text-xl font-bold line-clamp-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-base z-20">
              {item.author}
            </p>
          </div>
          <Button size="default" asChild className="ml-3">
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="w-7 h-7" />
            </Link>
          </Button>
        </div>
        <Image
          src={item.image}
          alt={item.title}
          className="absolute size-full object-cover opacity-30 blur-sm"
        />
        <div className="z-10 flex size-full items-center justify-center">
          <Image
            src={item.image}
            alt={item.title}
            className="h-full w-auto overflow-hidden object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  const params = useParams();
  const messages = useMessages();
  
  const showcaseItems: ShowcaseItem[] = [
    {
      title: "Hynergy: Electric Motor",
      author: "by seyager",
      image: ElectricMotor,
      link: "https://x.com/SeyagerYT",
    },
    {
      title: "[WIP] Hylamity: Wulfrum Prosthesis",
      author: "by alder_",
      image: WulfrumProsthesis,
      link: "https://discord.gg/f2fMKYnRqR",
    },
    {
      title: "[WIP] Soundscape: Melodium Chunk",
      author: "by 44Hydras",
      image: Melodium,
      link: "https://discord.com/users/197065442479702016",
    },
    {
      title: "Gale Wivern",
      author: "by Nicolas | Tourne_Vis",
      image: GaleWivern,
      link: "https://x.com/TourneVis_MC",
    },
    {
      title: "[WIP] Hylamity: Wulfrum Armor",
      author: "by alder_",
      image: WulfrumArmor,
      link: "https://discord.gg/f2fMKYnRqR",
    },
  ];

  const repeatedShowcaseItems = [...showcaseItems, ...showcaseItems, ...showcaseItems];

  return (
    <div className="relative flex flex-1 overflow-hidden">
      <GitInfoButton />
      <Spotlight />
      <div className="container mx-auto flex flex-1 flex-col items-center px-12 py-8">
        <div className="max-w-5xl space-y-8 text-center py-32">
            <div className="space-y-6">
            <h1 className="text-5xl font-semibold text-balance">
              <div>{messages.home.title.split("{flipwords}")[0]}</div>
              <div>
                <FlipWords words={messages.home.flipwords} />
              </div>
              <div>
              {messages.home.title.split("{flipwords}")[1]}
              </div>
            </h1>
            <h2 className="text-muted-foreground text-xl text-balance">
              {messages.home.description}
            </h2>
            </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link href={localizeHref("/docs", params.lang?.toString())}>
                <BookIcon /> {messages.home.documentation}
              </Link>
            </Button>
            <Button asChild>
              <Link
                href="https://forum.hytalemodding.guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare /> {messages.home.forum}
              </Link>
            </Button>
            <DiscordButton />
          </div>
        </div>
      </div>
      
      <div className="absolute left-0 right-0 bottom-32">
        <Marquee className="h-64 w-full">
          <MarqueeFade side="left" className="w-12" />
          <MarqueeContent speed={50} pauseOnHover autoFill={false}>
            {repeatedShowcaseItems.map((item, index) => (
              <MarqueeItem key={`${item.title}-${index}`} className="mx-2">
                <ShowcaseCard item={item} />
              </MarqueeItem>
            ))}
          </MarqueeContent>
          <MarqueeFade side="right" className="w-12" />
        </Marquee>
      </div>
    </div>
  );
}

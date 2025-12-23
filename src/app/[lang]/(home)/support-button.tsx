"use client";
import { HeartHandshakeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startTransition, useEffect, useState, ViewTransition } from "react";
import { getSponsors } from "./actions";
import { useMessages } from "@/lib/hooks/useMessages";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { localizeHref } from "../../../lib/locale";
import { useParams } from "next/navigation";

interface Sponsor {
  name: string;
  image: string;
  profile?: string;
}

export function SponsorButton() {
  const messages = useMessages();
  const params = useParams();
  const locale = params.lang as string;
  const [randomSponsors, setRandomSponsors] = useState<Sponsor[]>([]);
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    getSponsors()
      .then((sponsors) => {
        // Get 3 random sponsors
        const shuffled = [...sponsors].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3);
        setRandomSponsors(selected);
        startTransition(() => setState("loaded"));
      })
      .catch((error) => {
        console.error("Failed to fetch sponsors:", error);
        startTransition(() => setState("error"));
      });
  }, []);
    
  return (
    <Button className="relative" asChild>
      <Link href={`/${locale}/sponsors`}>
        <HeartHandshakeIcon />
        {messages.misc.supportUs}
        <div className="absolute top-full mt-2 flex">
          <ViewTransition>
            {state === "loading" ? (
              <p className="text-muted-foreground text-sm">
                {messages.misc.loading}
              </p>
            ) : state === "loaded" && randomSponsors.length > 0 ? (
              <div className="flex -space-x-2">
                {randomSponsors.map((sponsor, index) => (
                  <Avatar
                    key={index}
                    className="h-8 w-8 border-2 border-background"
                    title={sponsor.name}
                  >
                    <AvatarImage src={sponsor.image} alt={sponsor.name} />
                    <AvatarFallback>{sponsor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-destructive text-sm">Failed to load sponsors</p>
            )}
          </ViewTransition>
        </div>
      </Link>
    </Button>
  );
}

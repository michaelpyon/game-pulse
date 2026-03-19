import type { Game } from "@/lib/types";

export const games: Game[] = [
  {
    id: "counter_strike_2",
    name: "Counter-Strike 2",
    studio: "Valve",
    genre: "shooter_pc",
    steamShare: 1.0,
    peers: ["marvel_rivals", "the_finals", "team_fortress_2"],
    baselineComplete: true,
  },
  {
    id: "marvel_rivals",
    name: "Marvel Rivals",
    studio: "NetEase",
    genre: "shooter_pc",
    steamShare: 0.35,
    peers: ["counter_strike_2", "overwatch", "the_finals"],
    baselineComplete: true,
  },
  {
    id: "team_fortress_2",
    name: "Team Fortress 2",
    studio: "Valve",
    genre: "shooter_pc",
    steamShare: 1.0,
    peers: ["counter_strike_2", "overwatch", "marvel_rivals"],
    baselineComplete: true,
  },
  {
    id: "the_finals",
    name: "The Finals",
    studio: "Embark Studios",
    genre: "shooter_pc",
    steamShare: 0.5,
    peers: ["marvel_rivals", "counter_strike_2", "overwatch"],
    baselineComplete: true,
  },
  {
    id: "marathon",
    name: "Marathon",
    studio: "Bungie",
    genre: "console_shooter",
    steamShare: 0.35,
    peers: ["destiny_2", "halo_infinite", "overwatch"],
    baselineComplete: true,
  },
  {
    id: "overwatch",
    name: "Overwatch 2",
    studio: "Blizzard",
    genre: "console_shooter",
    steamShare: 0.2,
    peers: ["marvel_rivals", "marathon", "the_finals"],
    baselineComplete: true,
  },
  {
    id: "destiny_2",
    name: "Destiny 2",
    studio: "Bungie",
    genre: "console_shooter",
    steamShare: 0.35,
    peers: ["marathon", "halo_infinite", "overwatch"],
    baselineComplete: true,
  },
  {
    id: "halo_infinite",
    name: "Halo Infinite",
    studio: "343 Industries",
    genre: "console_shooter",
    steamShare: 0.12,
    peers: ["destiny_2", "marathon", "overwatch"],
    baselineComplete: true,
  },
];

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

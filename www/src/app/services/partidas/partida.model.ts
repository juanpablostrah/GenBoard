import { Player } from "app/routes/player/player";
import { Actor } from "app/routes/actor/actor";

export interface Partida {
    id: number;
    name: string;
    history: string;
    operaciones: number;
    guests: Player[];
    actors: Actor[];
    cantPlayersMax: number;
}

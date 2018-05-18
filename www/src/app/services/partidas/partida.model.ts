import { Player } from "app/routes/player/player";

export interface Partida {
    id?: number;
    name: string;
    history: string;
    operaciones: number;
    guests: Player[];
}

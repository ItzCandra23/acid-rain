import { ArmorSlot } from "bdsx/bds/inventory";
import { GameType } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { AcidRain } from "..";

const interval = setInterval(() => {
    for (const player of bedrockServer.serverInstance.getPlayers()) {
        if (!player.isPlayer()) return;
        if (player.getGameType() === GameType.Creative || player.getGameType() === GameType.Spectator) return;

        if (AcidRain.isUmbrella(player.getArmor(ArmorSlot.Head))) return;
        if (player.isInThunderstorm()) {
            AcidRain.getThunderEffects().forEach((effect) => player.addEffect(effect));
            return;
        }
        if (player.isInRain()) {
            AcidRain.getEffects().forEach((effect) => player.addEffect(effect));
            return;
        }
    }
}, 2000);

events.serverStop.on(() => {
    clearInterval(interval);
});
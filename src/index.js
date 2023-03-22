"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = require("bdsx/bds/inventory");
const player_1 = require("bdsx/bds/player");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const __1 = require("..");
const interval = setInterval(() => {
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        if (!player.isPlayer())
            return;
        if (player.getGameType() === player_1.GameType.Creative || player.getGameType() === player_1.GameType.Spectator)
            return;
        if (__1.AcidRain.isUmbrella(player.getArmor(inventory_1.ArmorSlot.Head)))
            return;
        if (player.isInThunderstorm()) {
            __1.AcidRain.getThunderEffects().forEach((effect) => player.addEffect(effect));
            return;
        }
        if (player.isInRain()) {
            __1.AcidRain.getEffects().forEach((effect) => player.addEffect(effect));
            return;
        }
    }
}, 2000);
event_1.events.serverStop.on(() => {
    clearInterval(interval);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUErQztBQUMvQyw0Q0FBMkM7QUFDM0Msc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QywwQkFBOEI7QUFFOUIsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtJQUM5QixLQUFLLE1BQU0sTUFBTSxJQUFJLHdCQUFhLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQUUsT0FBTztRQUMvQixJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxpQkFBUSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssaUJBQVEsQ0FBQyxTQUFTO1lBQUUsT0FBTztRQUV0RyxJQUFJLFlBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNqRSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQzNCLFlBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzNFLE9BQU87U0FDVjtRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ25CLFlBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwRSxPQUFPO1NBQ1Y7S0FDSjtBQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVULGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0QixhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMifQ==
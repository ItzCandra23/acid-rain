"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcidRain = void 0;
const effects_1 = require("bdsx/bds/effects");
const event_1 = require("bdsx/event");
const message_1 = require("./src/utils/message");
const path = require("path");
const fs = require("fs");
let config = {
    effects: {
        normal: [{ effect: effects_1.MobEffectIds.Poison, duration: 20, amplifier: 2 }],
        thunderstorm: [{ effect: effects_1.MobEffectIds.Poison, duration: 40, amplifier: 2 }, { effect: effects_1.MobEffectIds.Slowness, duration: 40 }],
    },
    umbrellas: [
        "minecraft:turtle_helmet",
        "minecraft:iron_helmet",
        "minecraft:golden_helmet",
        "minecraft:diamond_helmet",
        "minecraft:netherite_helmet",
    ],
};
const configPath = path.join(__dirname, "config.json");
try {
    config = require(configPath);
}
catch (err) { }
var AcidRain;
(function (AcidRain) {
    function isUmbrella(item) {
        const itm = item.getName();
        return config.umbrellas.includes(itm);
    }
    AcidRain.isUmbrella = isUmbrella;
    function getUmbrellas() {
        return config.umbrellas;
    }
    AcidRain.getUmbrellas = getUmbrellas;
    function EffectJsonToEffectInstance(effect) {
        return effects_1.MobEffectInstance.create(effect.effect, effect.duration, effect.amplifier, undefined, false, false);
    }
    AcidRain.EffectJsonToEffectInstance = EffectJsonToEffectInstance;
    function getEffects() {
        let result = [];
        config.effects.normal.forEach((v) => {
            result.push(EffectJsonToEffectInstance(v));
        });
        return result;
    }
    AcidRain.getEffects = getEffects;
    function getThunderEffects() {
        let result = [];
        config.effects.thunderstorm.forEach((v) => {
            result.push(EffectJsonToEffectInstance(v));
        });
        return result;
    }
    AcidRain.getThunderEffects = getThunderEffects;
    function addUmbrella(itemId) {
        if (config.umbrellas.includes(itemId))
            return false;
        config.umbrellas.push(itemId);
        return true;
    }
    AcidRain.addUmbrella = addUmbrella;
    function removeUmbrella(itemId) {
        if (!config.umbrellas.includes(itemId))
            return false;
        config.umbrellas = config.umbrellas.filter((v) => itemId !== v);
        return true;
    }
    AcidRain.removeUmbrella = removeUmbrella;
    function save(message = false) {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`);
            }
        });
    }
    AcidRain.save = save;
})(AcidRain = exports.AcidRain || (exports.AcidRain = {}));
event_1.events.serverOpen.on(() => {
    require("./src");
    message_1.send.success("Started!");
});
event_1.events.serverClose.on(() => {
    AcidRain.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBbUU7QUFFbkUsc0NBQW9DO0FBQ3BDLGlEQUEyQztBQUMzQyw2QkFBNkI7QUFDN0IseUJBQXlCO0FBUXpCLElBQUksTUFBTSxHQU1OO0lBQ0EsT0FBTyxFQUFFO1FBQ0wsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsc0JBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDckUsWUFBWSxFQUFFLENBQUUsRUFBRSxNQUFNLEVBQUUsc0JBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsc0JBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFFO0tBQ2pJO0lBQ0QsU0FBUyxFQUFFO1FBQ1AseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDRCQUE0QjtLQUMvQjtDQUNKLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUV2RCxJQUFJO0lBQ0EsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNoQztBQUFDLE9BQU0sR0FBRyxFQUFFLEdBQUU7QUFFZixJQUFpQixRQUFRLENBNER4QjtBQTVERCxXQUFpQixRQUFRO0lBRXJCLFNBQWdCLFVBQVUsQ0FBQyxJQUFlO1FBQ3RDLE1BQU0sR0FBRyxHQUFJLElBQUksQ0FBQyxPQUFPLEVBQWEsQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFIZSxtQkFBVSxhQUd6QixDQUFBO0lBRUQsU0FBZ0IsWUFBWTtRQUN4QixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUZlLHFCQUFZLGVBRTNCLENBQUE7SUFFRCxTQUFnQiwwQkFBMEIsQ0FBQyxNQUFxQjtRQUM1RCxPQUFPLDJCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFGZSxtQ0FBMEIsNkJBRXpDLENBQUE7SUFFRCxTQUFnQixVQUFVO1FBQ3RCLElBQUksTUFBTSxHQUF3QixFQUFFLENBQUM7UUFFckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQVJlLG1CQUFVLGFBUXpCLENBQUE7SUFFRCxTQUFnQixpQkFBaUI7UUFDN0IsSUFBSSxNQUFNLEdBQXdCLEVBQUUsQ0FBQztRQUVyQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBUmUsMEJBQWlCLG9CQVFoQyxDQUFBO0lBRUQsU0FBZ0IsV0FBVyxDQUFDLE1BQWM7UUFDdEMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUVwRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBTGUsb0JBQVcsY0FLMUIsQ0FBQTtJQUVELFNBQWdCLGNBQWMsQ0FBQyxNQUFjO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUVyRCxNQUFNLENBQUMsU0FBUyxHQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUxlLHVCQUFjLGlCQUs3QixDQUFBO0lBRUQsU0FBZ0IsSUFBSSxDQUFDLFVBQW1CLEtBQUs7UUFDekMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDOUQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsY0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ2pDLE1BQU0sR0FBRyxDQUFDO2lCQUNiOztvQkFDSSxjQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDM0M7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFWZSxhQUFJLE9BVW5CLENBQUE7QUFDTCxDQUFDLEVBNURnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQTREeEI7QUFFRCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLGNBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyJ9
import { MobEffectIds, MobEffectInstance } from "bdsx/bds/effects";
import { ItemStack } from "bdsx/bds/inventory";
import { events } from "bdsx/event";
import { send } from "./src/utils/message";
import * as path from "path";
import * as fs from "fs";

interface MobEffectJson {
    effect: MobEffectIds;
    duration: number;
    amplifier?: number;
}

let config: {
    umbrellas: ItemId[];
    effects: {
        normal: MobEffectJson[];
        thunderstorm: MobEffectJson[];
    };
} = {
    effects: {
        normal: [{ effect: MobEffectIds.Poison, duration: 20, amplifier: 2 }],
        thunderstorm: [ { effect: MobEffectIds.Poison, duration: 40, amplifier: 2 }, { effect: MobEffectIds.Slowness, duration: 40 } ],
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
} catch(err) {}

export namespace AcidRain {

    export function isUmbrella(item: ItemStack): boolean {
        const itm = (item.getName() as ItemId);
        return config.umbrellas.includes(itm);
    }

    export function getUmbrellas(): ItemId[] {
        return config.umbrellas;
    }

    export function EffectJsonToEffectInstance(effect: MobEffectJson): MobEffectInstance {
        return MobEffectInstance.create(effect.effect, effect.duration, effect.amplifier, undefined, false, false);
    }

    export function getEffects(): MobEffectInstance[] {
        let result: MobEffectInstance[] = [];

        config.effects.normal.forEach((v) => {
            result.push(EffectJsonToEffectInstance(v));
        });

        return result;
    }

    export function getThunderEffects(): MobEffectInstance[] {
        let result: MobEffectInstance[] = [];

        config.effects.thunderstorm.forEach((v) => {
            result.push(EffectJsonToEffectInstance(v));
        });

        return result;
    }

    export function addUmbrella(itemId: ItemId): boolean {
        if (config.umbrellas.includes(itemId)) return false;

        config.umbrellas.push(itemId);
        return true;
    }

    export function removeUmbrella(itemId: ItemId): boolean {
        if (!config.umbrellas.includes(itemId)) return false;

        config.umbrellas=config.umbrellas.filter((v) => itemId !== v);
        return true;
    }

    export function save(message: boolean = false): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`);
                    throw err;
                }
                else send.success(`config.json Saved!`);
            }
        });
    }
}

events.serverOpen.on(() => {
    require("./src");
    send.success("Started!");
});

events.serverClose.on(() => {
    AcidRain.save(true);
});
import { AbstractConfigSetColors, AbstractConfigSetLevels } from "winston/lib/winston/config";

const levelConfig: { levels: AbstractConfigSetLevels, colours: AbstractConfigSetColors } = {
    levels: {
        error: 0,
        info: 1,
        request: 1,
        debug: 2,
        trace: 3
    },
    colours: {
        error: "red",
        info: "yellow",
        request: "cyan",
        debug: "green",
        trace: "blue"
    }
};

export = levelConfig;

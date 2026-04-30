import { type FC } from "react";
import LogoImage from "./logo.webp";
import Preview from "./preview.webp";
import MauroDev from "./maurodev.webp";
import lacostillita from "./lacostillita.webp";
import TECHapp from "./TECHapp.webp";
import thewinenation from "./thewinenation.webp";
import Lumiflowca from "./Lumiflowca.png";
import Sagcomstore from "./Sagcomstore.png";
import BlueWaveEnergy from "./BlueWaveEnergy.png";
import CrealabStudio from "./CrealabStudio.png";
import ViaViajes from "./Viaviajes.png";
import PreferredEnergyPower from "./PreferredEnergyPower.png";
import TaskFlowAI from "./TaskFlowAI.png";
import Allsafebackflow from "./allsafebackflow.png"
import SolarComfortUSA from "./SolarComfortUSA.png"

export const images = {
    logo: LogoImage,
    preview: Preview,
    MauroDev: MauroDev,
    lacostillita: lacostillita,
    TECHapp: TECHapp,
    thewinenation: thewinenation,
    lumiflowca: Lumiflowca,
    sagcomstore: Sagcomstore,
    BlueWaveEnergy: BlueWaveEnergy,
    CrealabStudio: CrealabStudio,
    viaviajes: ViaViajes,
    preferredEnergyPower: PreferredEnergyPower,
    taskFlowAI: TaskFlowAI,
    Allsafebackflow: Allsafebackflow,
    SolarComfortUSA: SolarComfortUSA
};

type ImageProps = {
    srcLocal?: keyof typeof images;
    src?: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    loading?: "lazy" | "eager";
};

export const Image: FC<ImageProps> = ({
    alt,
    srcLocal,
    height,
    width,
    src,
    loading,
    ...rest
}) => {
    if (!srcLocal && !src) {
        throw new Error("srcLocal or src is required");
    }

    const image = srcLocal ? images[srcLocal] : { src, width, height };

    return (
        <img
            src={image.src}
            alt={alt}
            width={width ? width : image.width}
            height={height ? height : image.height}
            {...rest}
            loading="lazy" 
        />
    );
};

// default export of the images
export { Preview, TECHapp, lacostillita, thewinenation, Lumiflowca, Sagcomstore, BlueWaveEnergy, CrealabStudio, ViaViajes, SolarComfortUSA, PreferredEnergyPower, TaskFlowAI, Allsafebackflow };

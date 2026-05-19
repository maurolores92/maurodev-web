import styled from "@emotion/styled";
import { Image } from "@static/images";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const HeroWrapper = styled.section`
    position: relative;
    overflow: hidden;
    min-height: 780px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 90px 0;
    text-align: center;
`;

export const CanvasContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
`;

export const HeroContent = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    max-width: 650px;
    margin: 0 auto;
`;

export const HeroImageStyled = styled(Image)`
    border-radius: 100%;

    margin-bottom: 30px;

    ${MediaQuery.max("md")} {
        width: 200px;
        height: 200px;
    }
`;

export const PreHeading = styled.p`
    color: ${Theme.textSecondary};
`;

export const HeroTitle = styled.h1`
    margin-bottom: 20px;
`;

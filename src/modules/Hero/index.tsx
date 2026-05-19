import { type FC, useRef } from "react";
import * as S from "./styled";
import { Button } from "@components/Button";
import { Container } from "@components/Container";
import { Socials } from "@components/Socials";
import SamplePdf from "@static/sample.pdf";
import { FadeIn } from "@utils/animations/FadeIn";
import { CanvasBackground } from "./CanvasBackground";

export const Hero: FC = () => {
    const heroRef = useRef<HTMLElement | null>(null);

    return (
        <S.HeroWrapper ref={heroRef}>
            <CanvasBackground parentRef={heroRef} />
            <Container>
                <S.HeroContent>
                    <FadeIn>
                        <S.HeroImageStyled
                            srcLocal="MauroDev"
                            alt="hero"
                            width={300}
                            height={300}
                            loading="lazy"
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <S.PreHeading data-aos="fade-up">
                            Hola, soy <strong>MauroDev</strong>
                        </S.PreHeading>
                        <S.HeroTitle>Web Developer</S.HeroTitle>
                        <p>
                            Soy <b>Desarrollador FullStack</b> con mas de <b>4</b> años de experiencia en la industria.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <Socials />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <Button link={SamplePdf} target="_blank">
                            Descargar CV
                        </Button>
                    </FadeIn>
                </S.HeroContent>
            </Container>
        </S.HeroWrapper>
    );
};

import { type FC } from "react";
import * as S from "./styled";
import { Container } from "@components/Container";
import { Image } from "@static/images";
import { Button } from "@components/Button";
import { TextBox } from "@components/textBox";
import { FadeIn } from "@utils/animations/FadeIn";

type AboutProps = {
    hideExp?: boolean;
};

// Hide exp is for hiding the commercial experience - on the about page cuz there is a separate section for that
export const About: FC<AboutProps> = ({ hideExp }) => {
    return (
        <S.AboutStyled>
            <Container>
                <FadeIn>
                    <S.AboutTitle>Sobre Mi</S.AboutTitle>
                </FadeIn>
                <S.AboutContent>
                    <S.AboutContentText>
                        <FadeIn>
                            <p>
                            Soy desarrollador full stack y trabajo creando sitios web, eCommerce y plataformas personalizadas para negocios y marcas. Me enfoco en desarrollar productos rápidos, funcionales y fáciles de administrar, combinando diseño, experiencia de usuario y desarrollo backend.
                            </p>

                            <h3>¿Que puedo hacer?</h3>
                            <p>
                            Trabajo principalmente con React, Next.js, TypeScript, Node.js y MySQL, además de WordPress y WooCommerce para soluciones comerciales. Me interesa crear proyectos modernos, optimizados y pensados para resolver necesidades reales.
                            </p>
                        </FadeIn>
                        <FadeIn>
                            <S.AboutContentBoxesWrapper>
                                
                                <TextBox>
                                    <h4>Desarrollador Web</h4>
                                    <p>
                                        Desarrollo sitios web dinámicos y responsivos, enfocados en rendimiento 
                                        y experiencia de usuario.
                                    </p>
                                </TextBox>

                                <TextBox>
                                    <h4>Diseñador UX/UI</h4>
                                    <p>
                                    Diseño interfaces intuitivas y atractivas que mejoran la experiencia del usuario.
                                    </p>
                                </TextBox>

                                <TextBox>
                                    <h4>Administrador de Redes<p>de internet</p></h4>
                                    <p>
                                    Gestiono y optimizo redes de internet, asegurando su seguridad y eficiencia.
                                    </p>
                                </TextBox>
                            </S.AboutContentBoxesWrapper>
                        </FadeIn>
                        {!hideExp && (
                            <FadeIn>
                                <h3>Certificaciones y Experiencia Profesional</h3>
                                <S.AboutContentBoxesWrapper>
                                    <a href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
                                        <TextBox variant="background-text" bgText="Javascript">
                                            <h4>Javascript</h4>
                                            <p>4 años</p>
                                        </TextBox>
                                    </a>
                                    <a href="https://react.dev/" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
                                        <TextBox variant="background-text" bgText="React">
                                            <h4>React</h4>
                                            <p>3 años</p>
                                        </TextBox>
                                    </a>
                                    <a href="https://nextjs.org/" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
                                        <TextBox variant="background-text" bgText="Next">
                                            <h4>Next.js</h4>
                                            <p>3 años</p>
                                        </TextBox>
                                    </a>
                                    <a href="https://docs.nestjs.com/" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
                                        <TextBox variant="background-text" bgText="NestJs">
                                            <h4>Next.js</h4>
                                            <p>3 años</p>
                                        </TextBox>
                                    </a>
                                    <a href="https://docs.nestjs.com/" target="_blank" rel="noopener" style={{textDecoration:'none'}}>
                                        <TextBox variant="background-text" bgText="NestJs">
                                            <h4>NestJs</h4>
                                            <p>1 año</p>
                                        </TextBox>
                                    </a>
                                </S.AboutContentBoxesWrapper>
                                <Button link="/about">Ver mas</Button>
                            </FadeIn>
                        )}
                    </S.AboutContentText>
                    <S.AboutContentImage>
                        <FadeIn delay={0.3}>
                            <Image
                                srcLocal="MauroDev"
                                alt="MauroDev"
                                width={500}
                                height={500}
                                loading="lazy"
                            />
                        </FadeIn>
                    </S.AboutContentImage>
                </S.AboutContent>
            </Container>
        </S.AboutStyled>
    );
};

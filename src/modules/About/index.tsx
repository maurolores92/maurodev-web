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
                            Soy un desarrollador web freelance, especializado en soluciones full stack modernas y escalables. Me mantengo en formación continua en tecnologías como JavaScript, TypeScript y React, y trabajo tanto en frontend como en backend para crear productos innovadores, accesibles y funcionales que se adaptan a las necesidades de cada cliente y usuario.
                            </p>

                            <h3>¿Que puedo hacer?</h3>
                            <p>
                            Desarrollo proyectos web de forma independiente, utilizando herramientas avanzadas como React, Next.js, TypeScript, Node.js, Express y NestJS, además de bases de datos como MySQL. Mi experiencia me permite crear aplicaciones eficientes, seguras y de alto rendimiento, integrando las últimas tendencias y tecnologías del sector para ofrecer resultados profesionales y personalizados.
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

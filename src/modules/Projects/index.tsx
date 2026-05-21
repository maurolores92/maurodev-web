import { type FC, useMemo } from "react";
import { Container } from "@components/Container";
import * as S from "./styled";
import { ImageModal } from "@components/ImageModal";
import { FadeIn } from "@utils/animations/FadeIn";

type ProjectsProps = {
    data: {
        title: string;
        image: {
            src: string;
            width: number;
            height: number;
            alt: string;
        };
        links: {
            title: string;
            link: string;
        }[];
        extraInfo: {
            title: string;
            description: string;
        }[];
        content: string;
    }[];
};


export const Projects: FC<ProjectsProps> = ({ data }) => {
    /**
     * List of the slides
     */
    const slides = useMemo(
        () =>
            data.map((project, index) => (
                <ImageModal
                    key={index}
                    title={project.title}
                    image={project.image}
                    links={project.links}
                    extraInfo={project.extraInfo}
                    content={project.content}
                />
            )),
        [data]
    );

    return (
        <S.ProjectsStyled>
            <Container>
                <S.ProjectHeading>
                    <FadeIn>
                        <h2>Proyectos</h2>
                        <p>
                            Algunos de los proyectos en los que he trabajado. Cada proyecto aqui no solo es un testimonio de mis habilidades 
                            tecnicas, sino tambien un reflejo de mi dedicacion a superar desafios con creatividad y atencion al detalle.
                        </p>
                    </FadeIn>
                </S.ProjectHeading>

                <S.ProjectsContent>{slides}</S.ProjectsContent>
                {data.length <= 6 && (
                    <FadeIn>
                        <S.ProjectButton link="/projects" align="center">
                            Ver mas
                        </S.ProjectButton>
                    </FadeIn>
                )}
            </Container>
            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '1.1rem' }}>
                ¿Te gustaría trabajar juntos en tu próximo proyecto?{' '}
                <a href="/contact" style={{ color: '#4fa3f7', fontWeight: 'bold', textDecoration: 'underline' }}>
                    Contáctame aquí
                </a>.
            </div>
        </S.ProjectsStyled>
    );
};

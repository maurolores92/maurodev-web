import { type FC, useState } from "react";
import * as S from "./styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStyled } from "@components/Form";
import { Input } from "@components/Form/components/Input";
import { Button } from "@components/Button";
import { TextBox } from "@components/textBox";
import axios from "axios";
import { FadeIn } from "@utils/animations/FadeIn";

export const Contact: FC = () => {
    const [emailSent, setEmailSent] = useState(false);

    const schema = z.object({
        name: z.string().min(2, {
            message: "El nombre debe tener al menos 2 caracteres.",
        }),
        email: z.string().email({
            message: "Por favor, ingrese un correo electrónico válido.",
        }),
        message: z.string().min(10, {
            message: "El mensaje debe tener al menos 10 caracteres.",
        }),
    });

    const contactForm = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const formSubmit = contactForm.handleSubmit(async (values) => {
        axios
            .post("https://api.emailjs.com/api/v1.0/email/send", {
                service_id: "service_wellod8",
                template_id: "template_dizuau5",
                user_id: "sy06gLXSaERt67846",
                template_params: {
                    name: values.name,
                    email: values.email,
                    message: values.message,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setEmailSent(true);
                }
            });
    });

    return (
        <S.ContactStyled>
            <S.ContainerStyled>
                <FadeIn>
                    <S.ContactTitle>Contactame</S.ContactTitle>
                </FadeIn>
                {!emailSent ? (
                    <FadeIn>
                        <FormStyled onSubmit={formSubmit}>
                            <h2>
                                ¿Estas interesado(a) en hablar conmigo??{" "}
                                <b>Hablemos</b>
                            </h2>
                            <Input
                                type="text"
                                placeholder="Nombre *"
                                register={contactForm.register("name")}
                                error={
                                    contactForm.formState.errors.name?.message
                                }
                            />
                            <Input
                                type="email"
                                placeholder="Correo Electronico *"
                                register={contactForm.register("email")}
                                error={
                                    contactForm.formState.errors.email?.message
                                }
                            />
                            <Input
                                type="textarea"
                                placeholder="Mensaje *"
                                register={contactForm.register("message")}
                                error={
                                    contactForm.formState.errors.message
                                        ?.message
                                }
                            />
                            <Button asButton={true} type="submit">
                                Enviar
                            </Button>
                        </FormStyled>
                    </FadeIn>
                ) : (
                    <h3>
                        ¡Gracias por tu mensaje! Me comunicaré contigo como
                        tan pronto como sea posible!!
                    </h3>
                )}

                <S.ContactBox>
                    <FadeIn delay={0.1}>
                        <TextBox
                            variant="background-text"
                            bgText="Telefono"
                            boxAsLink={true}
                            href="tel:+52 123 233 421"
                            target="_blank"
                        >
                            <h3>+54 11 2688 2173</h3>
                            <p>
                                Llamame si tienes alguna pregunta o quieres trabajar conmigo
                            </p>
                        </TextBox>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <TextBox
                            variant="background-text"
                            bgText="Email"
                            boxAsLink={true}
                            href="mailto:mauricioloresdev@gmail.com"
                            target="_blank"
                        >
                            <h3>mauricioloresdev@gmail.com</h3>
                            <p>
                                Envíame un correo electrónico si tienes alguna pregunta
                            </p>
                        </TextBox>
                    </FadeIn>
                </S.ContactBox>
                <FadeIn delay={0.3}>
                    <TextBox variant="background-text" bgText="Direccion">
                        <h3>Direccion</h3>
                        <p>Villa urquiza, Capital Federal - Argentina</p>
                    </TextBox>
                </FadeIn>
                
            </S.ContainerStyled>
            
        </S.ContactStyled>
    );
};

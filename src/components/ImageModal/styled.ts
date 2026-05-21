import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const ImageModalStyled = styled.div`
    height: 100%;
    width: 100%;
`;

export const ImageModalContent = styled.div<{
    $isOpen: boolean;
}>`
    z-index: 11;
    display: flex;
    position: fixed;
    background: #0000008f;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s linear, visibility 0.4s linear;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    ${({ $isOpen }) =>
        $isOpen &&
        `
            display: flex;
            opacity: 1;
            visibility: visible;
    `}
`;

export const ImageModalContainer = styled.div`
    max-width: clamp(320px, 80%, 920px);
    padding: 90px 0;
    margin: 0 auto;
    padding: 40px;
    background-color: ${Theme.bgElement};
    max-height: 75vh;
    overflow: auto;
    height: 100%;

    ${MediaQuery.max("lg")} {
        padding: 20px;
    }

    &::-webkit-scrollbar {
        background-color: ${Theme.bgElement};
        width: 9px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${Theme.secondary};
    }
`;

export const ImagePreview = styled.figure`
    position: relative;
    width: 100%;
    height: 250px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    will-change: transform, box-shadow;

    &:hover {
        transform: translateY(-6px);
        border-color: rgba(79, 163, 247, 0.22);
        box-shadow: 0 30px 80px rgba(15, 23, 42, 0.18);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.55s ease, filter 0.55s ease;
    }

    &:hover img {
        transform: scale(1.03);
        filter: saturate(1.02);
    }

    .preview-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 1.5rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.35s ease;
        background: linear-gradient(180deg, rgba(10, 25, 65, 0) 40%, rgba(10, 25, 65, 0.62) 100%);
    }

    &:hover .preview-overlay {
        opacity: 1;
    }

    .preview-actions {
        display: inline-flex;
        gap: 0.7rem;
    }

    .preview-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.55rem 1rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: ${Theme.textDefault};
        font-size: 0.92rem;
        backdrop-filter: blur(10px);
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.35s ease, transform 0.35s ease;
        pointer-events: none;
    }

    &:hover .preview-action {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const ImageModalContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
`;

export const ImageModalImage = styled.div`
    width: 100%;
    margin-bottom: 10px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);

    img {
        width: 100%;
        height: 40vw;
        max-height: 450px;
        object-fit: cover;
    }
`;

export const ImageModalLinks = styled.div`
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;

    a {
        display: inline-block;

        font-size: 20px;
        color: ${Theme.textDefault};

        &:after {
            content: "";
            display: block;
            width: 0;
            height: 2px;
            background: ${Theme.secondary};
            transition: width 0.3s;
        }

        &:hover:after {
            width: 100%;
        }
    }
`;

export const ImageModalExtraInfo = styled.div`
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-bottom: 10px;
        font-size: 20px;

        &:after {
            content: none;
        }
    }
    p {
        font-size: 16px;

        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }
`;

export const TopicList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.75rem;
`;

export const TopicButton = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.55rem 0.95rem;
    border-radius: 999px;
    background: rgba(79, 163, 247, 0.12);
    color: ${Theme.textDefault};
    font-size: 0.9rem;
    border: 1px solid rgba(79, 163, 247, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 20px rgba(79, 163, 247, 0.12);
    }
`;

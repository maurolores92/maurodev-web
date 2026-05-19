import { type FC, useEffect, useRef, useState } from "react";
import * as S from "./styled";

interface CanvasBackgroundProps {
    parentRef: React.RefObject<HTMLElement | null>;
}

class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    radius: number;
    baseAlpha: number;
    alpha: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originX = this.x;
        this.originY = this.y;

        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.radius = Math.random() * 1.2 + 0.6;
        
        this.baseAlpha = Math.random() * 0.4 + 0.4;
        this.alpha = this.baseAlpha;
    }

    update(
        mouseX: number,
        mouseY: number,
        isHovering: boolean,
        width: number,
        height: number
    ) {
        this.x += this.vx;
        this.y += this.vy;
        this.originX += this.vx;
        this.originY += this.vy;

        if (this.x < 0 || this.x > width) {
            this.vx *= -1;
            this.originX = this.x;
        }
        if (this.y < 0 || this.y > height) {
            this.vy *= -1;
            this.originY = this.y;
        }

        if (isHovering) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceRadius = 120;

            if (distance < forceRadius) {
                const force = (forceRadius - distance) / forceRadius;
                const angle = Math.atan2(dy, dx);
                const pushX = Math.cos(angle) * force * 3.5;
                const pushY = Math.sin(angle) * force * 3.5;

                this.x -= pushX;
                this.y -= pushY;
                this.alpha = Math.min(0.95, this.baseAlpha + force * 0.45);
            } else {
                const dxOrigin = this.originX - this.x;
                const dyOrigin = this.originY - this.y;
                this.x += dxOrigin * 0.05;
                this.y += dyOrigin * 0.05;
                this.alpha += (this.baseAlpha - this.alpha) * 0.05;
            }
        } else {
            const dxOrigin = this.originX - this.x;
            const dyOrigin = this.originY - this.y;
            this.x += dxOrigin * 0.05;
            this.y += dyOrigin * 0.05;
            this.alpha += (this.baseAlpha - this.alpha) * 0.05;
        }
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;

        ctx.shadowBlur = 14;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
    }
}

export const CanvasBackground: FC<CanvasBackgroundProps> = ({ parentRef }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [themeColor, setThemeColor] = useState<string>("#778DA9");
    const mouseRef = useRef({ x: 0, y: 0, isHovering: false });

    const updateThemeColors = () => {
        if (typeof window === "undefined") return;

        const currentTheme = document.documentElement.getAttribute("data-theme");
        const isDark = currentTheme === "dark" || !currentTheme;

        if (isDark) {
            setThemeColor("#FFFFFF");
        } else {
            const computedStyles = getComputedStyle(document.documentElement);
            const secondaryColor = computedStyles.getPropertyValue("--secondary").trim();
            setThemeColor(secondaryColor || "#1B263B");
        }
    };

    useEffect(() => {
        updateThemeColors();

        // Monitor theme modifications in real-time
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "data-theme") {
                    updateThemeColors();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = parentRef.current;
        if (!canvas || !parent) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const getParticlesCount = (width: number) => {
            if (width < 768) return 80;
            if (width < 1200) return 150;
            return 220;
        };

        const resizeCanvas = () => {
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            const count = getParticlesCount(rect.width);
            particles = Array.from({ length: count }, () => new Particle(rect.width, rect.height));
        };

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(parent);

        resizeCanvas();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.isHovering = true;
        };

        const handleMouseLeave = () => {
            mouseRef.current.isHovering = false;
        };

        parent.addEventListener("mousemove", handleMouseMove);
        parent.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { x, y, isHovering } = mouseRef.current;

            particles.forEach((particle) => {
                particle.update(x, y, isHovering, canvas.width, canvas.height);
            });

            // Draw inter-particle lines
            const maxConnectDistance = 95;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectDistance) {
                        const connectionAlpha = (1 - dist / maxConnectDistance) * 0.22;
                        ctx.save();
                        ctx.globalAlpha = connectionAlpha;
                        ctx.strokeStyle = themeColor;
                        ctx.lineWidth = 0.9;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            // Draw connections from the cursor
            if (isHovering) {
                const maxMouseDistance = 145;
                particles.forEach((p) => {
                    const dx = p.x - x;
                    const dy = p.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxMouseDistance) {
                        const mouseConnAlpha = (1 - dist / maxMouseDistance) * 0.35;
                        ctx.save();
                        ctx.globalAlpha = mouseConnAlpha;
                        ctx.strokeStyle = themeColor;
                        ctx.lineWidth = 1.15;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            }

            particles.forEach((particle) => {
                particle.draw(ctx, themeColor);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            parent.removeEventListener("mousemove", handleMouseMove);
            parent.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [themeColor, parentRef]);

    return (
        <S.CanvasContainer>
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
        </S.CanvasContainer>
    );
};

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

        // Velocidades ágiles y orgánicas para mayor dinamismo
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;

        // Radios variados más pequeños para una red de constelación sumamente fina y discreta
        this.radius = Math.random() * 1.2 + 0.6;

        // Opacidad base incrementada para mayor intensidad de luz
        this.baseAlpha = Math.random() * 0.8 + 0.8;
        this.alpha = this.baseAlpha;
    }

    update(
        mouseX: number,
        mouseY: number,
        isHovering: boolean,
        width: number,
        height: number
    ) {
        // Movimiento base constante
        this.x += this.vx;
        this.y += this.vy;

        // Mantener actualizado el origen ideal de movimiento
        this.originX += this.vx;
        this.originY += this.vy;

        // Comportamiento de rebote suave en bordes
        if (this.x < 0 || this.x > width) {
            this.vx *= -1;
            this.originX = this.x;
        }
        if (this.y < 0 || this.y > height) {
            this.vy *= -1;
            this.originY = this.y;
        }

        // Interacción física con el cursor (Repulsión con retorno elástico suave)
        if (isHovering) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceRadius = 120; // Distancia de influencia

            if (distance < forceRadius) {
                // Fuerza inversamente proporcional a la distancia
                const force = (forceRadius - distance) / forceRadius;
                const angle = Math.atan2(dy, dx);

                // Vector de repulsión
                const pushX = Math.cos(angle) * force * 3.5;
                const pushY = Math.sin(angle) * force * 3.5;

                // Desplazamiento dinámico
                this.x -= pushX;
                this.y -= pushY;

                // La partícula brilla más con la proximidad del cursor
                this.alpha = Math.min(0.95, this.baseAlpha + force * 0.45);
            } else {
                // Retorno elástico amortiguado a la trayectoria original
                const dxOrigin = this.originX - this.x;
                const dyOrigin = this.originY - this.y;
                this.x += dxOrigin * 0.05;
                this.y += dyOrigin * 0.05;

                // Desvanecimiento suave al brillo original
                this.alpha += (this.baseAlpha - this.alpha) * 0.05;
            }
        } else {
            // Retorno a la trayectoria original en ausencia del cursor
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

        // Efecto Glow (Resplandor ultra-brillante)
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

    // Función para obtener el color dinámico del tema (Optimizado para alto contraste)
    const updateThemeColors = () => {
        if (typeof window === "undefined") return;

        // Asume dark si data-theme no está establecido o si es explícitamente dark
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const isDark = currentTheme === "dark" || !currentTheme;

        if (isDark) {
            setThemeColor("#FFFFFF"); // Blanco brillante de alta visibilidad en modo oscuro
        } else {
            const computedStyles = getComputedStyle(document.documentElement);
            const secondaryColor = computedStyles.getPropertyValue("--secondary").trim();
            setThemeColor(secondaryColor || "#1B263B"); // Contraste oscuro premium en modo claro
        }
    };

    useEffect(() => {
        // Inicializar el color
        updateThemeColors();

        // Observar cambios en el atributo 'data-theme' en el elemento html raíz
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

        // Función para calcular densidad de partículas óptima según tamaño de pantalla (Duplicada a petición)
        const getParticlesCount = (width: number) => {
            if (width < 768) return 80; // Menos partículas en pantallas móviles
            if (width < 1200) return 150;
            return 220; // Densidad ideal para pantallas amplias (Doble de cantidad original)
        };

        // Redimensionamiento y regeneración de partículas
        const resizeCanvas = () => {
            const rect = parent.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Regenerar partículas en base al nuevo tamaño
            const count = getParticlesCount(rect.width);
            particles = Array.from({ length: count }, () => new Particle(rect.width, rect.height));
        };

        // Escuchar cambios de tamaño usando ResizeObserver en el elemento padre para total precisión
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(parent);

        // Inicialización
        resizeCanvas();

        // Captura de movimientos del mouse sobre el contenedor padre
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

        // Bucle de animación (60 FPS)
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { x, y, isHovering } = mouseRef.current;

            // 1. Actualizar posiciones
            particles.forEach((particle) => {
                particle.update(x, y, isHovering, canvas.width, canvas.height);
            });

            // 2. Trazar conexiones (Red de constelación entre partículas)
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

            // 3. Trazar conexiones finas entre el mouse y las partículas cercanas
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

            // 4. Dibujar partículas (con resplandor)
            particles.forEach((particle) => {
                particle.draw(ctx, themeColor);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Iniciar ciclo de animación
        animate();

        // Limpieza de eventos y observers
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

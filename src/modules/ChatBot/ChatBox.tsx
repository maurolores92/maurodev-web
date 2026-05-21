import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import ChatBot from 'react-simple-chatbot';
import { Icon } from '@iconify/react';


const ChatbotComponent: typeof ChatBot = (ChatBot as any).default || ChatBot;

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#527ABD',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#527ABD',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  { id: '1', message: '¡Hola! Soy MauroDev, un desarrollador web con experiencia en React, TypeScript, y más. ¿En qué puedo ayudarte hoy?', trigger: 'options' },
  
  // Opciones principales
  { id: 'options', options: [
      { value: 'services', label: 'Servicios', trigger: 'services' },
      { value: 'projects', label: 'Proyectos', trigger: 'projects' },
      { value: 'experience', label: 'Experiencia', trigger: 'experience' },
      { value: 'contact', label: 'Contacto', trigger: 'contact' },
    ]},

  // Servicios
  { id: 'services', message: '¿Sobre qué servicio te gustaría saber más?', trigger: 'serviceOptions' },
  { id: 'serviceOptions', options: [
      { value: 'webDevelopment', label: 'Desarrollo Web', trigger: 'webDevelopment' },
      { value: 'uxUiDesign', label: 'Diseño UX/UI', trigger: 'uxUiDesign' },
      { value: 'networkManagement', label: 'Administración de Redes', trigger: 'networkManagement' },
      { value: 'back', label: 'Volver', trigger: 'options' },
    ]},

  { id: 'webDevelopment', message: 'En desarrollo web, creo sitios personalizados utilizando tecnologías como React y TypeScript. Puedo desarrollar desde sitios informativos hasta aplicaciones web completas. Si quieres conocer más sobre las tecnologías y herramientas que manejo, puedes visitar la sección "Sobre mí" en mi sitio web, donde encontrarás los lenguajes de programación y herramientas que utilizo.', trigger: 'serviceOptions' },
  { id: 'uxUiDesign', message: 'En diseño UX/UI, me enfoco en crear interfaces atractivas y usables. Trabajo en la estructura y el diseño visual para garantizar una experiencia de usuario excepcional.', trigger: 'serviceOptions' },
  { id: 'networkManagement', message: 'En administración de redes, manejo equipos y redes utilizando tecnología de punta, incluyendo equipos MikroTik, Ubiquiti y Arista. Me ocupo de la configuración, mantenimiento y optimización de redes para garantizar un rendimiento seguro y eficiente. Si deseas saber más sobre mi experiencia y habilidades, puedes descargar mi CV desde la página principal.', trigger: 'serviceOptions' },

  // Proyectos
  { id: 'projects', message: 'He trabajado en diversos proyectos, desde sitios web personalizados hasta aplicaciones complejas. ¿Te gustaría saber más sobre algún proyecto en particular o ver algunos ejemplos? Te invito a visitar la sección “Proyectos” donde verás algunos de los trabajos que he realizado.', trigger: 'options' },

  // Experiencia
  { id: 'experience', message: 'Tengo más de 3 años de experiencia en el desarrollo web. ¿Te gustaría saber más sobre alguna de las siguientes áreas? Elige una opción:', trigger: 'experienceOptions' },
  { id: 'experienceOptions', options: [
      { value: 'webDevelopmentExperience', label: 'Desarrollo Web', trigger: 'webDevelopmentExperience' },
      { value: 'uxUiDesignExperience', label: 'Diseño UX/UI', trigger: 'uxUiDesignExperience' },
      { value: 'networkManagementExperience', label: 'Administración de Redes', trigger: 'networkManagementExperience' },
      { value: 'back', label: 'Volver', trigger: 'options' },
    ]},

    { id: 'webDevelopmentExperience', message: 'En desarrollo web, me especializo en crear soluciones a medida utilizando las últimas tecnologías y herramientas más avanzadas. Utilizo tecnologías modernas como React y TypeScript para desarrollar sitios web interactivos y aplicaciones web completas. Mi enfoque está en emplear las herramientas más recientes y efectivas para garantizar que cada proyecto sea altamente funcional y esté a la vanguardia. Siempre me esfuerzo por incorporar las prácticas más actuales en el desarrollo para ofrecer resultados de alta calidad. ¿Te gustaría saber más sobre algún proyecto en particular o sobre cómo aplico estas tecnologías en mis trabajos?', trigger: 'experienceOptions' },
    { id: 'uxUiDesignExperience', message: 'En diseño UX/UI, me enfoco en crear interfaces intuitivas y atractivas, siempre aplicando los principios más actuales del diseño centrado en el usuario. Estoy en constante aprendizaje, explorando nuevas tendencias y herramientas para asegurarme de que mis diseños no solo cumplan con las expectativas, sino que las superen. Realizo proyectos propios y experimentos para mantenerme a la vanguardia y ofrecer soluciones innovadoras. Mi objetivo es garantizar que cada interfaz no solo sea visualmente atractiva, sino también funcional y fácil de usar. ¿Te gustaría saber más sobre mi enfoque en el diseño UX/UI o sobre cómo aplico estas prácticas en mis trabajos?', trigger: 'experienceOptions' },
    { id: 'networkManagementExperience', message: 'En administración de redes, cuento con más de 3 años de experiencia trabajando para proveedores de servicios de Internet (ISP) y empresas privadas. He gestionado redes complejas utilizando equipos MikroTik para redes de internet y redes empresariales, asegurando un rendimiento óptimo y seguro. Además, tengo una sólida experiencia con equipos Ubiquiti para soluciones hogareñas y empresariales, y manejo equipos Arista para configuraciones más avanzadas y profesionales. Mi experiencia abarca la configuración, mantenimiento y optimización de redes para garantizar la máxima eficiencia y fiabilidad. Si deseas saber más sobre mi experiencia en administración de redes o cómo aplico estas habilidades en proyectos específicos, estaré encantado de proporcionarte más detalles.', trigger: 'experienceOptions' },

  
  // Contacto
  { id: 'contact', message: 'Si deseas contactarme para discutir un proyecto o si tienes alguna pregunta adicional, por favor elige cómo prefieres comunicarte:', trigger: 'contactOptions' },
{ id: 'contactOptions', options: [
    { value: 'email', label: 'Por Email', trigger: 'contactEmail' },
    { value: 'phone', label: 'Por Teléfono', trigger: 'contactPhone' },
    { value: 'back', label: 'Volver', trigger: 'options' },
]},
{ id: 'contactEmail', message: 'Puedes contactarme por email a mauricioloresdev@gmail.com. ¡Espero tu mensaje!', end: true },
{ id: 'contactPhone', message: 'Puedes contactarme por teléfono al +54 11 2688 2173. Estaré disponible para atenderte.', end: true },

];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleChatbot} aria-label="ChatBot" style={{background:'transparent', border:'none'}}>
        {isOpen ? <Icon icon="icon-park:close-one" fontSize={25}/> : <Icon icon="cryptocurrency-color:chat"  fontSize={50}/>}
      </button>
      {isOpen && (
        <ThemeProvider theme={theme}>
          <ChatbotComponent steps={steps} />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Chatbot;
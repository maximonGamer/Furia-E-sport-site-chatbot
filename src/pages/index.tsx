import PlayersShowcase from '@/pages/PlayersShowcase';
import Head from 'next/head';
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaTrophy, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ChatBot from "@/components/ChatBot";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css/core';

// Seção de Conquistas (versão melhorada mantendo seu layout original)
const Conquistas = () => {
  const conquistas = [
    { 
      nome: 'Campeão da ESL Pro League', 
      ano: '2024', 
      imagem: '/images/trophy-1.png',
      descricao: 'Vitória histórica contra a Team Liquid na final'
    },
    { 
      nome: 'Vencedor da Blast Premier', 
      ano: '2023', 
      imagem: '/images/trophy-2.png',
      descricao: 'Dominância absoluta no torneio internacional'
    },
    { 
      nome: 'Primeiro Lugar na IEM Katowice', 
      ano: '2022', 
      imagem: '/images/trophy-3.png',
      descricao: 'Primeiro título em solo europeu'
    },
    { 
      nome: 'Campeão da VCT 2021', 
      ano: '2021', 
      imagem: '/images/trophy-4.png',
      descricao: 'Título inaugural no cenário de VALORANT'
    },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
        Conquistas da FURIA
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {conquistas.map((conquista, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center bg-gradient-to-t from-gray-800 to-black p-6 rounded-xl shadow-lg hover:shadow-2xl border border-yellow-500/20"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center">
              <FaTrophy className="text-black text-xl" />
            </div>
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={conquista.imagem}
                alt={conquista.nome}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
            <h3 className="text-xl font-bold text-center text-yellow-300">{conquista.nome}</h3>
            <p className="text-yellow-500 text-sm mb-2">{conquista.ano}</p>
            <p className="text-gray-300 text-xs text-center">{conquista.descricao}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Seção de Notícias (com carrossel Splide mas mantendo seu estilo)
const NoticiasReais = () => {
  const noticias = [
    { 
      titulo: 'FURIA COGITA MANTER APENAS HEAT NO ELENCO DE VALORANT', 
      data: '15 de Abril de 2025', 
      link: 'https://www.thespike.gg/br/valorant/news/furia-heat-valorant/6077',
      resumo: 'Nova formação traz jogadores promissores do cenário nacional'
    },
    { 
      titulo: 'FURIA fecha patrocínio histórico com a Nike', 
      data: '10 de Abril de 2025', 
      link: 'https://www.folhape.com.br/esportes/esports/furia-esports-anuncia-patrocinio-historico-da-nike/109311/',
      resumo: 'Maior contrato de patrocínio da história dos esports brasileiros'
    },
    { 
      titulo: 'FURIA anuncia nova line-up de League of Legends', 
      data: '05 de Abril de 2025', 
      link: 'https://maisesports.com.br/lta-sul-2025-furia-oficializa-line-up-com-guigo-e-treinador-campeao-da-lcs/',
      resumo: 'Time reforçado para disputar o CBLOL 2025'
    },
    { 
      titulo: 'FURIA Esports Announces Major Roster Overhaul', 
      data: '18 de Abril de 2025', 
      link: 'https://juked.gg/counter-strike/news/furia-esports-announces-major-roster-overhaul-to-boost-global-competitiveness/#:~:text=FURIA%20Esports%20Plans%20Major%20Roster%20Changes&text=The%20overhaul%20of%20the%20team,a%20move%20to%20the%20bench.',
      resumo: 'Reestruturação para competições globais'
    },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
        Últimas Notícias da FURIA
      </h2>
      
      <div className="px-6">
        <Splide
          options={{
            type: 'slide',
            perPage: 3,
            gap: '1rem',
            breakpoints: {
              1024: { perPage: 2 },
              768: { perPage: 1 }
            }
          }}
        >
          {noticias.map((noticia, index) => (
            <SplideSlide key={index}>
              <motion.div
                className="bg-gradient-to-t from-gray-800 to-black p-6 rounded-xl shadow-lg h-full mx-2"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  <a href={noticia.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    {noticia.titulo} <FaExternalLinkAlt className="text-xs" />
                  </a>
                </h3>
                <p className="text-sm text-gray-400 mb-3">{noticia.data}</p>
                <p className="text-gray-300 text-sm mb-4">{noticia.resumo}</p>
                <a 
                  href={noticia.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-500 text-xs font-medium inline-flex items-center"
                >
                  Ler mais <FaArrowRight className="ml-1 text-xs" />
                </a>
              </motion.div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

// Componente Principal (Página Inicial)
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Head>
        <title>FURIA | Oficial</title>
        <meta name="description" content="FURIA E-SPORTS - Orgulho do Brasil nos esports." />
      </Head>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION (mantendo seu original) */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/882db583081525.5ea5da24d7c69.jpg"
          alt="FURIA Banner"
          fill
          priority
          quality={100}
          className="object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full py-12 bg-gradient-to-b from-black to-transparent text-center text-white shadow-lg">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-white"
          >
            FURIA <span className="block text-xl md:text-3xl text-white tracking-wider">E-SPORTS</span>
          </motion.h1>
        </div>
      </section>

      {/* HISTÓRIA DA FURIA (mantendo seu original) */}
      <section className="py-24 px-6 md:px-20 bg-zinc-900 flex flex-col md:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <Image
            src="/images/d80679130678949.618531b1d21f0.png"
            alt="História da FURIA"
            width={600}
            height={400}
            className="rounded-2xl object-cover shadow-2xl transform transition-all duration-300 hover:scale-105"
            quality={100}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-gray-300"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400">Nossa História</h2>
          <p className="text-lg leading-relaxed mb-6">
          A FURIA Esports nasceu em agosto de 2017, em Uberlândia, Minas Gerais, impulsionada pelo sonho de representar o Brasil no cenário competitivo de Counter-Strike. Fundada por Jaime Pádua, André Akkari e Cris Guedes, a organização rapidamente se destacou por seu estilo de jogo agressivo e pela paixão que transmitia dentro e fora dos servidores.​

Em 2019, a FURIA participou de seu primeiro Major no IEM Katowice, marcando presença entre as melhores equipes do mundo. No ano seguinte, conquistou a ESL Pro League Season 12: North America, seu primeiro grande título internacional de CS:GO. Em 2022, alcançou as semifinais do IEM Rio Major, celebrada pela torcida brasileira.​

A partir de 2021, a FURIA expandiu sua atuação para outros jogos, incluindo Rocket League, Valorant, League of Legends, Rainbow Six Siege e Apex Legends. No Rocket League Championship Series (RLCS) de 2021–22, a equipe chegou às semifinais do torneio mundial.​
, a enciclopédia livre

Além do sucesso competitivo, a FURIA criou iniciativas como o FURIA Skate Club e o Cine FURIA, conectando esports à cultura urbana e entretenimento. Eleita melhor organização de esports no Prêmio eSports Brasil em 2020 e 2021, a FURIA tornou-se um símbolo de inovação e profissionalismo no Brasil.​

Em 2023, inaugurou uma sede em Mellieħa, Malta, para facilitar competições na Europa. Em 2024, estreou no Futebol 7 na Kings League. Para 2025, anunciou entrada na Porsche Cup Brasil, mostrando ambições além dos videogames.​

Com raízes firmes e olhar no futuro, a FURIA segue escrevendo sua história de superação, inspirando uma geração de jogadores e fãs que acreditam no poder dos esports.​



Fontes

          </p>
          <p className="text-lg leading-relaxed">
            Ao longo dos anos, a FURIA consolidou-se como uma das principais organizações de esports do mundo.
          </p>
        </motion.div>
      </section>

      {/* RECONHECIMENTO DA FURIA */}
      <PlayersShowcase />

      {/* CONQUISTAS DA FURIA (versão atualizada) */}
      <Conquistas />

      {/* NOTÍCIAS REAIS (versão com carrossel) */}
      <NoticiasReais />

      {/* RODAPÉ (mantendo seu original) */}
      <footer className="bg-black py-16 mt-20 border-t border-gray-800 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-yellow-500 text-xl font-semibold mb-4">Links</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 hover:text-yellow-500 transition-transform transform hover:scale-110">
                  <i className="fas fa-globe text-2xl"></i>
                  <a href="https://www.furia.gg" target="_blank" rel="noopener noreferrer" className="text-lg">
                    FURIA.GG E-SPORTS
                  </a>
                </li>
                <li className="flex items-center gap-3 hover:text-yellow-500 transition-transform transform hover:scale-110">
                  <i className="fab fa-instagram text-2xl"></i>
                  <a href="https://www.instagram.com/furiagg" target="_blank" rel="noopener noreferrer" className="text-lg">
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-3 hover:text-yellow-500 transition-transform transform hover:scale-110">
                  <i className="fas fa-users text-2xl"></i>
                  <a href="https://escharts.com/pt/organizations/furia-esports" target="_blank" rel="noopener noreferrer" className="text-lg">
                    Times e Modalidades
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-yellow-500 text-xl font-semibold mb-4">Siga-nos</h3>
              <div className="flex flex-col gap-4 text-lg">
                <a
                  href="https://x.com/FURIA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-500 transition-transform transform hover:scale-105"
                >
                  <i className="fab fa-twitter text-2xl"></i>
                  <span>Twitter</span>
                </a>
                <a
                  href="https://www.twitch.tv/furiatv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-500 transition-transform transform hover:scale-105"
                >
                  <i className="fab fa-twitch text-2xl"></i>
                  <span>Twitch</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center md:items-end">
              <p className="text-gray-400 text-sm">© 2025 FURIA E-SPORTS</p>
              <p className="text-gray-600 text-xs">Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      

      {/* CHATBOT ADICIONADO AQUI */}
      <ChatBot />
    </div>
  );
}
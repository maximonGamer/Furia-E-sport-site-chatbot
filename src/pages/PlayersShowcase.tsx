import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Jogador = {
  nome: string;
  jogo: string;
  imagem: string;
  funcao: string;
};

const jogadores: Jogador[] = [
  // Counter-Strike
  { nome: 'KSCERATO', jogo: 'CS', imagem: '/images/jogadores/kscerato.jpg', funcao: 'Rifler' },
  { nome: 'yuurih', jogo: 'CS', imagem: '/images/jogadores/yuurih.jpg', funcao: 'Entry Fragger' },
  { nome: 'chelo', jogo: 'CS', imagem: '/images/jogadores/chelo.jpg', funcao: 'Support' },
  { nome: 'fallen', jogo: 'CS', imagem: '/images/jogadores/fallen.jpg', funcao: 'IGL / AWP' },
  { nome: 'arT', jogo: 'CS', imagem: '/images/jogadores/art.jpg', funcao: 'Lurker' },

  // League of Legends
  { nome: 'Guigo', jogo: 'LoL', imagem: '/images/jogadores/guigo.jpg', funcao: 'Top Laner' },
  { nome: 'Aegis', jogo: 'LoL', imagem: '/images/jogadores/aegis.jpg', funcao: 'Jungler' },
  { nome: 'Envy', jogo: 'LoL', imagem: '/images/jogadores/envy.jpg', funcao: 'Mid Laner' },
  { nome: 'Netuno', jogo: 'LoL', imagem: '/images/jogadores/netuno.jpg', funcao: 'ADC' },
  { nome: 'RedBert', jogo: 'LoL', imagem: '/images/jogadores/redbert.jpg', funcao: 'Support' },

  // Valorant
  { nome: 'qck', jogo: 'Valorant', imagem: '/images/jogadores/qck.jpg', funcao: 'Duelista' },
  { nome: 'mwzera', jogo: 'Valorant', imagem: '/images/jogadores/mwzera.jpg', funcao: 'Flex' },
  { nome: 'xand', jogo: 'Valorant', imagem: '/images/jogadores/xand.jpg', funcao: 'Entry' },
  { nome: 'rafaj', jogo: 'Valorant', imagem: '/images/jogadores/rafaj.jpg', funcao: 'Controller' },
  { nome: 'havoc', jogo: 'Valorant', imagem: '/images/jogadores/havoc.jpg', funcao: 'Initiator' },
];

const games = ['Todos', 'CS', 'LoL', 'Valorant'];

export default function PlayersShowcase() {
  const [filtro, setFiltro] = useState<string>('Todos');

  const jogadoresFiltrados = filtro === 'Todos'
    ? jogadores
    : jogadores.filter(j => j.jogo === filtro);

  return (
    <section className="py-24 bg-zinc-950 text-white px-6 md:px-20">
      <h2 className="text-5xl font-bold text-center mb-12 text-yellow-400 drop-shadow-lg">
        Destaques da FURIA
      </h2>

      {/* Filtro por jogo */}
      <div className="flex justify-center mb-10">
        <select
          className="bg-zinc-800 text-white border border-yellow-500 px-4 py-2 rounded-lg"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          {games.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* Cards de jogadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {jogadoresFiltrados.map((jogador, index) => (
          <motion.div
            key={index}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={jogador.imagem}
              alt={jogador.nome}
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-yellow-400">{jogador.nome}</h3>
              <p className="text-sm text-gray-400">{jogador.funcao}</p>
              <span className="text-xs text-gray-500 uppercase">{jogador.jogo}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

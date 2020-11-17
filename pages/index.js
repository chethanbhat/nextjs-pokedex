import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home({pokemon}) {

  const paddedIndex = (index) => ("00" + (index + 1)).slice(-3);

  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">
        NextJS Pokedex
      </h1>
      <ul className="flex flex-wrap justify-start sm:justify-center">
        {
          pokemon.map((poke, index) => (
            <li key={index} className="w-40 mx-2">
              <Link href={`/pokemon?id=${index + 1}`}>
                <a>
                  <div className="card border p-4 border-gray my-2 capitalize items-center text-lg bg-gray-200 shadow">
                    <img className="w-20 h-20" src={poke.image} alt={poke.name}/>
                    <span className="block my-2 text-xs tracking-widest">{paddedIndex(index)}</span>
                    <p className="font-bold text-xl tracking-wider">{poke.name}</p>
                  </div>
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export async function getStaticProps(context){

  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const {results} = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        image,
        paddedIndex
      }
    });

  return {
    props: {pokemon}
  }


  } catch (error) {
    console.error(error);
  }

}
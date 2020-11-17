import React from 'react'
import Layout from '../components/Layout';
import Link from 'next/link';

const Pokemon = ({poke}) => {
    return (
        <Layout title={poke.name}>
            <div className="card shadow-xl bg-white p-16 rounded-xl">
                <h1 className="text-4xl mb-2 text-center text-bold track-widest capitalize">{poke.name}</h1>
                <img className="mx-auto" src={poke.image} alt={poke.name}/>
                <div className="border border-gray-400 p-4 m-2">
                    <p><span className="font-bold mr-2">Weight:</span>{poke.weight} lbs</p>
                    <p><span className="font-bold mr-2">Height:</span>{poke.height} inches</p>
                </div>
                <div className="border border-gray-400 p-4 m-2">
                    <h2 className="text-2xl mb-2">Type</h2>
                    {
                        poke.types.map((type, index) => <p className="capitalize font-bold" key={index}>{type.type.name}</p>)
                    }
                </div>
                <p className="mt-10 text-center">
                    <Link href="/">
                        <a className="text-2xl underline">
                            Home
                        </a>
                    </Link>
                </p>
            </div>
        </Layout>
    )
}

export default Pokemon

export async function getServerSideProps({query}) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const poke = await res.json();
        const paddedIndex = ("00" + (id)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        poke.image = image;
        return {
            props : {poke}
        }
    } catch (error) {
        console.error(error);
    }
}
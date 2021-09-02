import React from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head'
export default function Rocket({ launches }) {
    return (
        <>
            <Head>
                <title>{`SpaceX Rockets | ${launches.mission_name}`}</title>
                <link rel="shortcut icon" href={launches.links.mission_patch_small} />
            </Head>
            <div className="container">
                <div className="card my-3 mx-auto" style={{ width: "18rem" }}>
                    {launches.links.mission_patch_small == null ? null : <img src={launches.links.mission_patch_small} className="card-img-top" alt={launches.mission_name} />}
                    <div className="card-body">
                        <h5 className="card-title">{launches.mission_name}</h5>
                        <p className="card-text">Rocket - {launches.rocket.rocket_name}</p>
                        <p className="card-text">{launches.details}</p>
                        <a href={launches.links.wikipedia} className="btn btn-outline-dark">Wikipedia</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: 'https://api.spacex.land/graphql/',
        cache: new InMemoryCache()
    });
    const { data } = await client.query({
        query: gql`
    {
      launchesPast {
        id
      }
    }`
    })
    const paths = data.launchesPast.map((rocket) => (
        {
            params: { id: rocket.id }
        }
    ))
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params: { id } }) {
    const client = new ApolloClient({
        uri: 'https://api.spacex.land/graphql/',
        cache: new InMemoryCache()
    });
    const { data } = await client.query({
        query: gql`
        {
  launch(id: ${id}) {
    mission_name
    rocket {
      rocket_name
    }
    links {
      mission_patch_small
      wikipedia
    }
    details
  }
}
    `
    })
    return {
        props: {
            launches: data.launch
        }
    }
}
import React from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head'
const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
});
export default function Rocket({ launch }) {
    return (
        <>
            <Head>
                <title>{`SpaceX Rockets | ${launch.mission_name}`}</title>
                <link rel="shortcut icon" href={launch.links.mission_patch_small} />
            </Head>
            <div className="container">
                <div className="card my-3 mx-auto" style={{ width: "18rem" }}>
                    {launch.links.mission_patch_small == null ? null : <img src={launch.links.mission_patch_small} className="card-img-top" alt={launch.mission_name} />}
                    <div className="card-body">
                        <h5 className="card-title">{launch.mission_name}</h5>
                        <p className="card-text">Rocket - {launch.rocket.rocket_name}</p>
                        <p className="card-text">{launch.details}</p>
                        <a href={launch.links.wikipedia} className="btn btn-outline-dark">Wikipedia</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export async function getServerSideProps({ query }) {
    const id = query.id;
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
            launch: data.launch
        }
    }
}
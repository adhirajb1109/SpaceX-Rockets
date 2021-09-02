import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Navbar from '../components/Navbar';
export default function Home({ launches }) {
  return (
    <div>
      <Head>
        <title>Spacex Rockets</title>
        <meta name="description" content="Spacex Rockets is an app which tells us about all the missions of Spacex ." />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
      </Head>

      <main>
        <Navbar />
        <div className="container">
          {launches.map((launch) => (
            <div className="card mx-4 my-4" key={launch.id}>
              <div className="card-body">
                <h5><a className="card-title" href={launch.links.wikipedia} className="text-decoration-none text-dark">{launch.mission_name}</a></h5>
                <p className="card-text mt-3">Rocket &rarr; {launch.rocket.rocket_name}</p>
                <p className="card-text">Launch Year &rarr; {launch.launch_year}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
    {
      launchesPast {
        id
        mission_name
        links {
          mission_patch_small
          wikipedia
        }
        rocket {
          rocket_name
        }
        launch_year
      }
    }`
  })
  return {
    props: {
      launches: data.launchesPast
    }
  }
}

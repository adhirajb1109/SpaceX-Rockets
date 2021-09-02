import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});
export default function Home({ launches }) {
  return (
    <div>
    <main>
        <div className="container">
          {launches.map((launch) => (
            <div className="card mx-4 my-4" key={launch.id}>
              <div className="card-body">
                <h5><a className="card-title text-decoration-none text-dark" href={`/rockets/${launch.id}`}>{launch.mission_name}</a></h5>
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
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
    {
      launchesPast {
        id
        mission_name
        links {
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

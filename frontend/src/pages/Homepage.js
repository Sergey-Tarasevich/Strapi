import React from "react"
import { Link } from "react-router-dom"
// import useFetch from "../hooks/useFetch"
import { useQuery, gql } from "@apollo/client"

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      body
      rating
      id
      categories {
        id
        name
      }
    }
  }
`

export default function Homepage() {
  // work with useFetch hook
  // const { loading, error, data } = useFetch("http://localhost:1337/reviews")

  // work with graphql hook
  const { loading, error, data } = useQuery(REVIEWS)

  if (loading)
    return (
      <div component="p">
        <h2>Loading...</h2>
      </div>
    )
  if (error)
    return (
      <div component="p">
        <h2>UPS :( ERROR</h2>
      </div>
    )

  // console.log(data)

  return (
    <div>
      {/* use this block if you work with graphql */}

      {data.reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map((c) => (
            <small key={c.id}>{c.name}</small>
          ))}

          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more...</Link>
        </div>
      ))}

      {/* finish graphql block */}

      {/* use this block if you work with useFetch */}

      {/* {data.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          <small>console list</small>

          <p>{review.body.substring(0, 300)}...</p>
          <Link to={`/details/${review.id}`}>Read more...</Link>
        </div>
      ))} */}

      {/* finish useFetch block */}
    </div>
  )
}

import React from "react"
import { useQuery, gql } from "@apollo/client"
import { useParams, Link } from "react-router-dom"

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      id
      reviews {
        title
        body
        rating
        id
        categories {
          name
          id
        }
      }
    }
  }
`

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  })

  if (loading)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  if (error)
    return (
      <div>
        <h2>UPS :( ERROR</h2>
      </div>
    )

  // console.log(data)

  return (
    <div>
      <h2>{data.category.name} </h2>
      {data.category.reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map((c) => (
            <small key={c.id}>{c.name}</small>
          ))}

          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}

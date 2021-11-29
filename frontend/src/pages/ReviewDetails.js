import React from "react"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
// import useFetch from "../hooks/useFetch"

import { useQuery, gql } from "@apollo/client"

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
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
`

export default function ReviewDetails() {
  // use 'id' because path="/details/:id" in App.js
  const { id } = useParams()

  // work with useFetch hook
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/reviews/" + id
  // )

  // work with graphql hook
  const { loading, error, data } = useQuery(REVIEW, {
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
    <div className="review-card">
      {/* use this block if you work with graphql */}
      <div className="rating">{data.review.rating}</div>
      <h2>{data.review.title}</h2>

      {data.review.categories.map((c) => (
        <small key={c.id}>{c.name}</small>
      ))}

      <ReactMarkdown>{data.review.body}</ReactMarkdown>

      {/* finish graphql block */}

      {/* use this block if you work with useFetch */}
      {/* <div className="rating">{data.rating}</div>
      <h2>{data.title}</h2>

      <small>console list</small>

      <p>{data.body}</p> */}
      {/* finish useFetch block */}
    </div>
  )
}

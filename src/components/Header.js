import React from "react"
import { Link } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      id
    }
  }
`

export default function Header() {
  const { loading, error, data } = useQuery(CATEGORIES)

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

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Cats & dogs</h1>
      </Link>

      <nav className="categories">
        <span>Filter reviews by animal:</span>
        {data.categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

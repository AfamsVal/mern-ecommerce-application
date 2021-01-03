import React, { useState, useEffect } from "react"
import Rating from "../components/Rating"
import { useSelector, useDispatch } from "react-redux"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { productDetailsReducer } from "../action/productActions"

const ProductDetails = (props) => {
  const { goBack } = props.history
  const { id } = props.match.params

  const dispatch = useDispatch()

  const { product, error, loading } = useSelector(
    ({ productDetails }) => productDetails
  )
  const {
    description,
    category,
    name,
    images,
    price,
    rating,
    numReviews,
    countInStock,
  } = product

  // console.log([...Array(countInStock).keys()])

  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(productDetailsReducer(id))
  }, [dispatch, id])

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const addCartHandle = (e) => {
    e.preventDefault()
    props.history.push(`/checkout/${id}?qty=${qty}`)
  }

  return error ? (
    <div className="col-12 mt-5">
      <h1 className="py-5 text-center text-danger">
        <i className="fa fa-info-circle"></i> {error}
      </h1>
    </div>
  ) : loading ? (
    <div className="container mt-6 mb-2">
      <div className="row mb-5">
        <div className="col-12 col-sm-5">
          <SkeletonTheme color="#ddd" highlightColor="#ccc">
            <Skeleton count={1} height={400} />
          </SkeletonTheme>
        </div>
        <div className="col-12 col-sm-7">
          <SkeletonTheme color="#ddd" highlightColor="#ccc">
            <Skeleton count={7} height={60} />
          </SkeletonTheme>
        </div>
      </div>
    </div>
  ) : (
    <section>
      <div className="container mt-6 mb-2">
        <div className="row mb-5">
          <div
            onClick={() => goBack()}
            className="col-12 text-dark font-weight-bold cursor-pointer"
          >
            <i className="fas fa-arrow-left mr-2"></i> Go back
          </div>
          <div className="col-sm-5 mt-3">
            <div className="card pt-4 px-5 mt-2">
              <p className="font-size-3 text-gray">
                <span>
                  <i className="fa fa-home font-size-4 "></i>
                </span>
                <span className="ml-2">
                  <i className="fa fa-long-arrow-right"></i> Products
                </span>
                <span className="ml-2">
                  <i className="fa fa-long-arrow-right"></i> {category}
                </span>
              </p>
              <hr />
              <img className="w-100" src={images} alt={name} />
            </div>
          </div>
          <div className="col-sm-7">
            <div className="card py-5 px-5 mt-2 mb-5">
              <h3 className="text-uppercase font-weight-bold">{name}</h3>
              <div>
                <Rating rating={rating} numReviews={`${numReviews} reviews`} />
              </div>
              <p className="product-description my-3">{description}</p>
              <h4>
                Current price:{" "}
                <span className="font-weight-bolder">${price}</span>
              </h4>
              <div className="row mt-2">
                <div className="col-6">
                  {countInStock ? (
                    <div className="form-group">
                      <label htmlFor="sel1">Quantity:</label>
                      <select
                        onChange={(e) => setQty(e.target.value)}
                        className="browser-default custom-select"
                      >
                        {[...Array(countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <h5 className="text-danger">Out of Stock</h5>
                  )}
                </div>
              </div>
              <p className="vote mt-3">
                <strong>91%</strong> of buyers enjoyed this product!{" "}
                <strong>(87 votes)</strong>
              </p>

              <div>
                {countInStock !== 0 && (
                  <div className="btn-group btn-group-lg">
                    <button
                      onClick={addCartHandle}
                      type="button"
                      className="btn btn-dark"
                    >
                      <i className="fa fa-shopping-cart"></i> Add to cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
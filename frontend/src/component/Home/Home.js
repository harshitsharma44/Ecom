import React, { Fragment, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import coverImage from "../../images/cover.jfif";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecomify | Good things, chosen well" />

          <div className="home-page">
            <section className="home-hero" aria-labelledby="home-hero-title">
              <img className="home-hero__image" src={coverImage} alt="" />
              <div className="home-hero__scrim" aria-hidden="true" />
              <div className="home-hero__content">
                <p className="home-hero__eyebrow">A better kind of everyday</p>
                <h1 id="home-hero-title">
                  Good things.<br />
                  <span>Chosen well.</span>
                </h1>
                <p className="home-hero__description">
                  Thoughtful finds for the spaces you live in and the life you
                  make there.
                </p>
                <Link className="home-hero__cta" to="/products">
                  Explore the collection <FaArrowRight aria-hidden="true" />
                </Link>
              </div>
              <p className="home-hero__caption">The Ecomify collection / 01</p>
            </section>

            <section className="home-featured" id="featured-products">
              <div className="home-featured__heading">
                <div>
                  <p className="home-section-kicker">Made to be lived with</p>
                  <h2>Find your next favorite.</h2>
                </div>
                <Link className="home-featured__all" to="/products">
                  Shop all <FaArrowRight aria-hidden="true" />
                </Link>
              </div>

              {products && products.length > 0 ? (
                <div className="container home-product-grid">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="home-featured__empty">
                  New finds are on their way. Check back soon.
                </p>
              )}
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

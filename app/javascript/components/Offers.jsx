import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UNAUTHORIZED = 401;
const ENTITY_UNPROCESSED = 422;

const Offers = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    const url = "/api/offers";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((res) => setOffers(res))
      .catch((err) => {
        if (err?.status === UNAUTHORIZED){
          navigate("/account");
        }
      });
  }

  const handleClaimOfferClick = async (offerId) => {
    const endpoint = '/api/claimed_offers';
    const payload = {
      offer_id: offerId
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (response.ok) {
        fetchOffers();
        return;
      }
      throw response;
    } catch (error) {
      if (error?.status === ENTITY_UNPROCESSED) {
        setError('Unable to process or save registration fields, fix and try again!');
      } else {
        setError('Something went wrong.. try again!');
      }
    }
  }

  const allOffers = offers.map((offer, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{offer.title}</h5>
          <p className="card-text">{offer.description}</p>
          <button onClick={() => handleClaimOfferClick(offer.id)} className="btn btn-outline-success">
            Claim Offer
          </button>
        </div>
      </div>
    </div>
  ));
  const noOffer = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No offers yet.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Available Offers</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-start mb-3">
            <Link to="/" className="btn btn-lg btn-primary">
              Home
            </Link>
          </div>
          <div className="row">
            {offers.length > 0 ? allOffers : noOffer}
          </div>
        </main>
      </div>
    </>
  );
};

export default Offers;
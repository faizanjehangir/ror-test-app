import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UNAUTHORIZED = 401;

const Home = () =>  {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  const fetchClaimedOffers = () => {
    fetch(`/api/claimed_offers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      },
      credentials: 'include',
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .then(res => setOffers(res))
    .catch((err) => {
      if (err?.status === UNAUTHORIZED) {
        navigate("/account")
      } else if (err) {
        console.log(err);
      }
    });
  }

  useEffect(() => {
    fetchClaimedOffers();
  }, []);

  const handleCancel = async(offerId) => {

    try {
      const response = await fetch(`/api/claimed_offers/${offerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        },
        credentials: 'include',
      });

      if (response.ok) {
        fetchClaimedOffers();
      } else {
        throw new Error('Failed to unclaim offer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleLogout = async () => {
    const url = "/api/logout";
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        },
        credentials: 'include',
      });

      if (response.ok) {
        // navigate to accounts
        navigate("/account");
        return;
      }
      throw response;
    } catch (error) {
      if (error?.message) {
        console.log(error?.message);
      }
    }
  }

  const allOffers = offers.length ? offers.map((offer, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{offer.title}</h5>
          <p className="card-text">{offer.description}</p>
          <button onClick={() => handleCancel(offer.id)} className="btn btn-outline-danger">
            Release Offer
          </button>
        </div>
      </div>
    </div>
  )) : [];
  
  const noOffer = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No offers claimed yet.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Welcome to the PlayGround!</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="d-flex flex-row bd-highlight justify-content-between">
              <Link
                to="/offers"
                className="btn btn-lg btn-primary"
                role="button"
              >
                View Offers
              </Link>
              <button type="button" className="btn btn-lg btn-secondary" onClick={handleLogout}>Sign Out</button>
            </div>
            <hr className="my-4" />
            <div className="row">
              {offers.length > 0 ? (
                <>
                  <h1 className="display-4">Your Offers</h1>
                    {allOffers}
                </>
              ) : noOffer}
            </div>
        </main>
      </div>
    </>
  );
};

export default Home;
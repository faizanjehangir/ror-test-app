import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UNAUTHORIZED = 401;

const Home = () =>  {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleCancel = async(offer) => {
    console.log("cancelled..", offer);
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
          <button onClick={() => handleCancel(offer)} className="btn btn-outline-danger">
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

  console.log(allOffers);

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
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UNAUTHORIZED = 401;

const Home = () =>  {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const url = "/api/offers/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((res) => setOffers(res))
      .catch((err) => {
        if (err?.status === UNAUTHORIZED) {
          navigate("/account")
        }
      });
  }, []);

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

  const allOffers = offers.map((offer, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{offer.title}</h5>
          <Link to={`/offer/${offer.id}`} className="btn custom-button">
            View Offer
          </Link>
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
     <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <div className="d-flex flex-row bd-highlight justify-content-between">
              <Link
                to="/offers"
                className="btn btn-lg custom-button"
                role="button"
              >
                View Offers
              </Link>
              <button type="button" className="btn btn-lg custom-button" onClick={handleLogout}>Sign Out</button>
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
            {/* <p className="lead">
              List of all available offers redeemed:
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
class Api::ClaimedOffersController < ApplicationController
  before_action :authenticate_user!

  def index
    claimed_offers = current_user.claimed_offers.includes(:offer)
    render json: claimed_offers.map { |claimed_offer| claimed_offer.offer }, status: :ok
  end

  def create
    offer = Offer.find(params[:offer_id])
    claimed_offer = current_user.claimed_offers.build(offer: offer)

    if claimed_offer.save
      render json: { message: 'Offer claimed successfully' }, status: :created
    else
      render json: { errors: claimed_offer.errors.full_messages }, status: :unprocessable_entity
    end
  end
end

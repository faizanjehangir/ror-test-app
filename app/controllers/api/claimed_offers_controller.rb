class Api::ClaimedOffersController < ApplicationController
  before_action :authenticate_user!

  def create
    offer = Offer.find(params[:offer_id])
    claimed_offer = current_user.claimed_offers.find_or_initialize_by(offer: offer)
    claimed_offer.active = true

    if claimed_offer.save
      render json: { message: 'Offer claimed successfully' }, status: :created
    else
      render json: { errors: claimed_offer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    claimed_offers = current_user.claimed_offers.active.includes(:offer)
    render json: claimed_offers.map { |claimed_offer| claimed_offer.offer }, status: :ok
  end

  def destroy
    claimed_offer = current_user.claimed_offers.find_by(offer_id: params[:id])

    if claimed_offer
      claimed_offer.update(active: false)
      render json: { message: 'Offer unclaimed successfully' }, status: :ok
    else
      render json: { error: 'Offer not found or not claimed by user' }, status: :not_found
    end
  end
end

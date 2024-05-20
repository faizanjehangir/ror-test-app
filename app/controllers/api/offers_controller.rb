class Api::OffersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_offer, only: %i[show destroy]

  def index
    claimed_offer_ids = current_user.claimed_offers.active.pluck(:offer_id)
    offers = Offer.where.not(id: claimed_offer_ids).order(created_at: :desc)
    render json: offers
  end

  def create
    offer = Offer.create!(offer_params)
    if offer
      render json: offer
    else
      render json: offer.errors
    end
  end

  def show
    render json: @offer
  end

  def destroy
    @offer&.destroy
    render json: { message: 'Offer deleted!' }
  end

  private

  def offer_params
    params.permit(:title, :description, :age, :gender)
  end

  def set_offer
    @offer = Offer.find(params[:id])
  end
end

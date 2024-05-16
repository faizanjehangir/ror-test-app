class Api::OffersController < ApplicationController
  before_action :set_offer, only: %i[show destroy]

  def index
    offer = Offer.all.order(created_at: :desc)
    render json: offer
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

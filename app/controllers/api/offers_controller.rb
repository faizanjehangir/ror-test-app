class Api::OffersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_offer, only: %i[show destroy]

  def index
    offers = Offer.available_for_user(current_user)
                  .page(params[:page])
                  .per(params[:per_page])

    render json: {
      offers: offers,
      meta: {
        current_page: offers.current_page,
        next_page: offers.next_page,
        prev_page: offers.prev_page,
        total_pages: offers.total_pages,
        total_count: offers.total_count
      }
    }
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

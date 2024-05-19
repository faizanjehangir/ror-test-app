class Api::RegistrationController < ApplicationController
  wrap_parameters false

  def create
    birth_year = user_params[:birthYear].to_i
    age = User.calculate_age(birth_year)
    gender = User.validate_gender(user_params[:gender])
    
    @user = User.new(user_params.except(:birthYear, :gender).merge(age: age, gender: gender))

    if @user.save
      session[:user_id] = @user.id
      render json: { user: @user }, status: :created
    else
      render json: { error: @user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :gender, :birthYear)
  end
end

class SearchSuggestionsController < ApplicationController
  def index
    @user = User.where("first_name LIKE ? or last_name LIKE ?","%#{params[:search]}%","%#{params[:search]}%")
    render json: @user
  end
end

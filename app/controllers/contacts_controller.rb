class ContactsController < ApplicationController


  def new
  end

  def index 
    @contacts = Contact.all

    respond_to do |f|
      f.json {render :json => @contacts, :only => [:id, :name, :email, :number, :imgUrl]}
    end
  end

  def create
    @contact = Contact.new contact_params

    respond_to do |f|
      if @contact.save
        f.json {render json: @contact, status: :created}
      else
        f.json {render json: @contact.errors, status: :unprocessable_entity}
      end
    end
  end

  private

  def contact_params 
    params.require(:contact).permit(:name, :email, :number, :imgUrl)
  end
  
end

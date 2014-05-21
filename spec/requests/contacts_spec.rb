require 'spec_helper'

describe '/contacts' do
  before (:each) do
    @contact=Contact.create(name: "Joe", email: "joe@joe.com", number: "918-220-2999")
  end

  describe 'Get with JSON' do
    before (:each) do 
      get '/contacts.json'
      @result = JSON.parse(response.body)
    end

    it 'returns a list of contacts' do
      @result.should_not be_nil
      @result.should have(1).contact
    end

    it 'should not have updated_at or created_at' do
      @result[0]['updated_at'].should be_nil
      @result[0]['created_at'].should be_nil
    end

    it 'should have the correct data in the contact' do
      @result.find do |contact|
        contact["name"] == "Joe"
      end.should_not be_nil
    end
  end

end
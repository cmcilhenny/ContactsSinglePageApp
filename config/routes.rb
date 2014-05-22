ContactsSinglePageApp::Application.routes.draw do
  root 'contacts#new'

  resources :contacts
end

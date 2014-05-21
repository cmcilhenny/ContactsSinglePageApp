ContactsSinglePageApp::Application.routes.draw do
  root 'contacts#main'

  resources :contacts
end

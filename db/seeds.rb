# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Contact.create ([
  {name: "John", email: "john@john.com", number: "917-239-2929"},
  {name: "Adam", email: "adam@adam.com", number: "917-239-2929"},
  {name: "Sally", email: "sally@sally.com", number: "917-555-2929"},
  {name: "Sam", email: "sam@sam.com", number: "917-239-5555"}
  ])
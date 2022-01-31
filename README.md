# Podkeeper

The social podcast app - listen, review, and share the podcasts you're listening to. And see what friends are listening to and recommending. 

The backend repo is [here](http://github.com/).

## User Stories

As a user,
* I want to be able to create an account, so I can log in and use the app.
* I want to be able to search for podcasts and subscribe to them.
* I want to be able to listen to an episode of a podcast, with the expected features of a podcast player (play/pauise, mute , skip).
* I want to be able to give a x/5 star rating to each episode and leave a review.
* I want to see a timeline of all the podcast episodes I've listened to or reviewed.
* I want to search for other users and see their timelines.

## Models and Relationships

![My Data Relationships](public/podkeep-db-diagram.png)

### User

A user has many subscriptions.
A user has many episodes.
A user has many relationships.
A user has many activities.

### Podcasts

A podcast has many episodes.
An episode belongs to a podcast.
A podcast and an episode belong to a user_activity.
A podcast and an episode belong to a user_subscription.
A podcast and an episode belong to a user_episode.


## API

Each table will have multiple endpoints. Here are a few of the important ones:

### POST /users

Creates a new user. Response JSON looks like this:

```json
{ 
  id: 111,
  username: "johndoe",
  firstname: "John",
  lastname: "Doe",
}
```

### POST /user_subscriptions

Creates a new podcast subscription for the user. The data being sent:

```json
{ user_id: 1,
podcast_id: 1,
podcast_rating: null }
```

There is also a DELETE and PATCH endpoint for this table.

### POST /user_activity

Creates a new activity record for the user. The data being sent:

```json
{ user_id: 1,
podcast_id: 1,
episode_id: 1,
rating: 4,
review: "my review is...",
activity_type: "review" }
```
A user can only create new activites and see existing activites. They can't DELETE activities.

Aside from my API, I am using iTunes Search to find podcasts and episodes. 


## Wireframe / Mockup

![My Data Relationships](public/Homepage-1.jpeg)

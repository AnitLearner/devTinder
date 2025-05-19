# DevTinder APIs
auth router
- POST / signup
- POST / login
- POST / logout
profile router
- PATCH / profile/edit
- GET /  profile/view
- PATCH / profile/password

Status : ignore, interested, accepted, rejected
connectionn request router
- POST / request/send/interested/:userId
- POST / request/send/ignored/:userId
- POST / request/review/accepted/:requestId
- POST / request/review/rejected/:requestId 

user
- GET user/connections
- GET user/request/recieved
- GET user/feed - Gets you the profile of other users on platform

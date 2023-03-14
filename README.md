# cse341-course-management

A course management system for our CSE 341 BYUI class.

## Setup

* get the repo downloaded
* make a <code>.env</code> file and include the contents Tyler sent in Teams (**ACCESS_TOKEN_SECRET** and **CONNECTION_STRING**)
* run <code>npm i</code> from the root directory to download the packages
* run <code>npm run start-dev</code> to run the dev environment

## Committing

* pull changes first
* make changes
* fix merge conflicts (ask team members)
* run swagger (<code>npm run swagger</code>)
* test locally to make sure it works
* commit and push
* the pipeline to Render will run on its own. if it has issues, contact Tyler

## Testing

* run <code>npm test</code>
* It pulls tests from the spec folder

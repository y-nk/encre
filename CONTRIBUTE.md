# A quick guide to start contributing

## About architecture

The main strategy is to relay heavily on express routing system.

The development server is configured via a router available in `src/router`.
Later on, the build uses the same router detached from express with mock request/response objects in order to generate html files. By using the same pipe, we're sure paths and output are matching. 

## Adding a feature

If you want to implement a new feature, there are 3 spots to look at:

1. `./modules/`: it's the place where your feature should be.
  Ideally, your feature should expose _at least_ some function or express router.

2. `./router/index.js`: add your feature to the routing system ; hence the router in 1.

3. `./bin/build`: because routes can be dynamic, we can't list all url in advance and so we need to manually call for the rendering of a certain page.

## Testing

As for now it's a small project so let's keep it simple. Test your feature with the local server, and test the build. I'll deny broken PRs.

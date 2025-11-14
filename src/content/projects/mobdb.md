---
title: "mobdb"
description: "Building my first R package - and the adventures along the way"
pubDate: "Nov 13 2025"
heroImage: "https://asset.staticeagles.com/img/project/mobdb.png"
badge: ""
tags: ["R","transit", "open data"]
---
## TL;DR

I built an R package that connects to the [Mobility Database](https://mobilitydatabase.org), a repository of over 4000+ transit feeds from
around the world and allows you to discover, search, and download feeds - all directly in R. For GTFS Schedule feeds it was built to
support `tidytransit` methods but also supports direct download. It does support GTFS Realtime and GBFS feeds (since they're in the
Mobility Database too), but the methods for those are still fairly basic.

The package documentation page [is here](https://mobdb.pages.dev) and has full instructions on installing and using it.

The GitHub repo [is here](https://github.com/jasonad123/mobdb/) - have a gander!

## What challenge were you trying to solve?

Like most things, inspiration strikes in the most unusual of places. In my case it was an Instagram reel hyping up how transit-accessible
Climate Pledge Arena was (and therefore by extension, how transit-accessible Seattle Kraken games were)[^1]. This got me thinking - "has
someone assessed how transit accessible each NHL team is?"

So with that, a methodology was developed, spreadsheets written, a Git repo initialized, and so on. As part of my methodology, I was going
to be using [r5r](https://ipeagit.github.io/r5r/), which supports GTFS (General Transit Feed Specification) Schedule files
as part of the travel time analysis. However, with 32 NHL teams, and with many markets having multiple transit agencies, I was *not*
going to go through the task of searching for and downloading however many GTFS feeds it would take.

Enter the [Mobility Database](https://mobilitydatabase.org).

### What is the Mobility Database?

The Mobility Database is a repository of over 4000+ transit and shared mobility feeds from all around the world, hosted by the lovely
team at [MobilityData](https://mobilitydata.org), the non-profit organization that are the stewards of GTFS, GBFS (General Bikeshare Feed Specification), and other similar data standards for transit and shared mobility.

The Mobility Database is a replacement for TransitFeeds, which is set to be deprecated by the end of 2025. In addition to providing
discoverability of feeds, MobilityData also archives GTFS-Schedule feeds, serves as an alternate host for such feeds, and validates those
feeds through the [canonical GTFS validator](https://gtfs-validator.mobilitydata.org/), making it a valuable resource for all involved.

And of course, they have an API that exposes all of those resources, which is what drove my willingness to do this. If I was gonna work in
R anyway for the analysis, why not have something that works in R too?

I did have a look in the ecosystem and this was a gap - tools like `tidytransit`, `gtfsio`, and `gtfstools` only do their thing *after* 
you have a GTFS file - although `tidytransit` does support reading in GTFS directly from a URL - very handy indeed.

## How'd you do it?

Start with what I know about R, and go from there. *Aaaand get a good bit of help from Claude Code.* I'm honest about my use of
agentic coding - in most projects I own you'll see a disclaimer in the README **and** in commits. But I never just let it shoot the
puck all the way down the ice, ***no***. I always supervise it and work with it interactively - I basically treat it like it's pair programming.

All of that is to say, Sonnet 4.5 is *impressively good* at developing an R package, but a lot of the startup, testing, troubleshooting,
debugging, and polishing can only be done by hand. Heck, it tried to make a logo but failed miserably, so I made my own in Affinity
Designer. If you're an eagle-eyed Canadian transit nerd (or hockey fan, or *both*), you may notice it's a particular city's metro
system, but fast-forwarded a bit.

The package is fairly simple - a couple of core functions that make the API calls, a few functions for discovery, a core function
to download GTFS Schedule feeds (`download_feed()`), a couple of functions to surface the validation reports, and others to work with
the metadata and the package itself.

It's really a cool thing - once you set it up, the world (of transit and shared mobility feeds) is your oyster:

```r
library(mobdb)

trimet <- mobdb_search("TriMet"
)
pdx_gtfs <- download_feed("mdb-247")
export_gtfs(pdx_gtfs, "data/gtfs/trimet.zip")

# Get validation report for a feed
datasets <- mobdb_datasets("mdb-482")  # Alexandria DASH
validation <- get_validation_report(datasets)
validation

# View detailed validation report in browser
view_validation_report("mdb-482")

# Check feed quality, then download if clean
if (validation$total_error == 0) {
  gtfs <- download_feed("mdb-482")
}
```

## Any lessons learned?


## What's the latest status?

It's still a work in progress - I will be using it for the project that I mentioned earlier, but I've also actually started using it
in other workflows to automate downloading GTFS files - since `mobdb` supports source downloads or hosted downloads, there's granularity
between the two and it makes what used to take a good chunk of time now take mere seconds to execute as an R script.

## So, can I use it?

Of course! It's not on CRAN yet but you can use it by downloading the development version of the package.

```r
# Install using pak (recommended)
# install.packages("pak")
pak::pak("jasonad123/mobdb")

# Or using remotes
# install.packages("remotes")
remotes::install_github("jasonad123/mobdb")

# Once it's installed:
library(mobdb)

```

The package documentation page [is here](https://mobdb.pages.dev)

The GitHub repo [is here](https://github.com/jasonad123/mobdb/)

[^1]: Which I still dispute, by the way, as a resident of Other Washington but a fan of Both Washington hockey teams, but I digress.

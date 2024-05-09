
# CMS Front
[![github-top-lang](https://img.shields.io/github/languages/top/mugendi/cmsfront-monorepo?style=social&logo=github)](https://github.com/mugendi/cmsfront-monorepo)
[![github-watchers](https://img.shields.io/github/watchers/mugendi/cmsfront-monorepo?label=Watch&style=social&logo=github)](https://github.com/mugendi/cmsfront-monorepo)
[![github-stars](https://img.shields.io/github/stars/mugendi/cmsfront-monorepo?style=social&logo=github)](https://github.com/mugendi/cmsfront-monorepo)


![Alt](https://repobeats.axiom.co/api/embed/c556ad39e5a96921e764a4187e202c8d78ab41e4.svg "Repobeats analytics image")

# What it is
An AI powered Content Management System that removes the hassle from managing content.

# Motivation
Over the decades, Wordpress, Drupal and others have dominated the world of content management. They brought with them complex back ends that require a bit of learning to use. While they changed the world and introduced amazing concepts such as the plugin system that has allowed them to be endlessly extended, the way we interact with content management systems, especially in this age of AI can be drastically improved.

# Project Goals

- **Keep It Simple, Stupid (KISS)**
    - Must be super easy to use. No complex back ends.
    - Content storage should be simple (preferably via flat files) to remove the need for complex database setups.
    - Should remove the need for data modelling. You simply design your UI and annotate it.
- **Light**
    - The core system must be light weight. All additional functionality to be provided via a plugin system.
- **Fast**
    - Should utilize browser cacheing as much as possible to ensure websites load almost instantaneously
    - Should be easy to integrate with CDNS such as S3 for even faster content loading
- **Cutting Edge**
    - Should use modern technologies such as MDX to allow for advanced component based content management.
    - Should incorporate Artificial Intelligence (via plugins) to perform tasks like content composition and SEO content optimization.

## System Requirements
Built and tested on Ubuntu 22.04 but should run on any system with the following basic requirements:

1. [NodeJs](https://nodejs.org/en)
2. This monorepo is managed via [pnpm](https://www.npmjs.com/package/pnpm) so have it installed. 

## Documentation

1. [Building & Running](/docs/building.md)
    

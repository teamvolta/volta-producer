#Volta Energy-Producer
[![Circle CI](https://circleci.com/gh/teamvolta/volta-producer/tree/dev.svg?style=svg&circle-token=5512b8cd9398e5a58afd8b52ef260b56e6bf1962)](https://circleci.com/gh/teamvolta/volta-producer/tree/dev)

A smart grid management system with dynamic energy pricing that enables customers to trade green energy in local markets.

[Volta Energy-Producer](https://github.com/teamvolta/volta-producer) represents the power plant model of the [Volta Energy system](https://github.com/teamvolta).

Also see: 
* [Volta Energy-Consumer](https://github.com/teamvolta/volta-consumer)
* [Volta Energy-System](https://github.com/teamvolta/volta-system)

##Table of Contents

1. [Team](#team)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Distributive System Tool](#distributive-system-tool)
4. [Roadmap](#roadmap)

##Team

* Product Manager: [Anastasia Zotova](https://github.com/azotova)
* Technical Lead: [John Tan](https://github.com/johnttan)
* Scrum Master: [Michael Lom](https://github.com/mlom)
* Development Team: [Nikhil Ballaney](https://github.com/NBallaney)

##Requirements
* Node.js

##Development

###Installing Dependencies

From within the root directory:

```
npm install -g bower
npm install
```
From within the client directory:

```
bower install
```

###Distributive System Tool
The Volta Energy system requires running multiple servers for each [consumer](https://github.com/teamvolta/volta-consumer), [system](https://github.com/teamvolta/volta-system) and [producer](https://github.com/teamvolta/volta-producer) model. To assist running multiple servers simultaneously, please refer to [Distributive System Tool](https://github.com/teamvolta/distmanager).

### Roadmap

View the project roadmap [here](https://github.com/teamvolta/volta-producer/issues).

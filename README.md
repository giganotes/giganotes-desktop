# GigaNotes

[GigaNotes](https://giganotes.com) is an open source data management and note taking app.

![Giganotes](/docs/giganotes.png)

## Features

* Note-taking app with faster and handier operation
* Notes can be taken work both in online and offline
* Able to work without the server ('offline' mode)
* Synchronizes notes among all connected devices
* Works in both Windows and Linux 
* Powerful searching capabilites that allow to reach any note pretty fast
* Rich editor for texts including cross-references
* Authoritative content manager
* Works as resourceful personal wiki
* Has a [web version](https://web.giganotes.com) that works directly from the browser
* Has a [mobile version](https://play.google.com/store/apps/details?id=com.thetapad.app) for Android

## Application architecture

![Giganotes](/docs/giganotes-desktop-diagram.png)

GigaNotes is an [Electron](https://electronjs.com) application that is using [native core component](https://github.com/FourthByteLabs/giganotes-core) written in [Rust](https://www.rust-lang.org/) system programming language for faster data processing.
Applying native code instead of javascript allows us to reach essential performance boost, especially for data synchronization and another tasks like advanced document analysis, link extraction and many others.

Backend API server provides the ability of data dynchronization and some extra features like optical character recognition in images.

## Build

Giganotes is an Electron-based application. In order to build it, [Node.js](https://nodejs.org) is required.

To build GigaNotes, dependencies should be installed using

```bash
npm install
```

### Windows

To produce a windows binaries, please run

```bash
npm run electron:windows
```

### Linux

To produce a linux binaries, please run

```bash
npm run electron:linux
```

## Development 

To run Giganotes in development mode please use the command

```bash
npm start
```
## Contributions

We'd love to accept your patches and contributions to this project. Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Code reviews

All submissions, including submissions by project members, require review. We
use GitHub pull requests for this purpose. Please read
[GitHub Help](https://help.github.com/articles/about-pull-requests/) for more
information on using pull requests.

## License
-------

    Copyright 2018 FourthByte
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
    http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

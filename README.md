# dynamic-file-require

This package is usefull for quickly adding required custom node modules anywhere in your project without having to use the relative path.

PreReqs: Node 6.4+

Usage 1: 

From the main file or root of your project, include the function from the package. Call the function to instantiate a global function called `__find()` as shown below. The first param to globalFindFile is the absolute system path to the desired starting search position. `__dirname` will give you the folder you current working file is in. The second paramenter is an optional parent folder index in case your main app file is nested a bit and you will require files in a higher directory. 1 for example would be the direct parent folder , 2 would be the next folder up the chain and so on, currently 10 is the limit. In subsequent required files you don't need to set up you globalFindFile as it was allready created and saved as a function globally from you main app source. The third optional param to globalFindFile() which you dont see below is an optional array of files or folders you DONT want to search in. By default currently this is :

`['Dockerfile', 'Jenkinsfile', 'LICENSE', 'node_modules']`

Setup:

`const {globalFindFile} = require('dynamic-file-require');`

`globalFindFile(__dirname, 0); 
// zero is the default so you don't need to pass it in, just here as example`

Use: 

`const foo = require(__find('foo.js'));`






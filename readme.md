<h1>Build Your Own AngularJS</h1>

<a href="https://teropa.info/build-your-own-angular/" target="_blank">
Link to site
</a>
</br>

<h2>
Know Your AngularJS Inside Out
</h2>

<p>
AngularJS is a powerful JavaScript framework. 
It can also be difficult to grasp fully. 
As a result, many struggle to capture all the benefits Angular has to offer.
</p>
<p>
Build Your Own AngularJS helps you understand everything there is to understand about Angular. 
By creating your very own implementation of Angular piece by piece, 
you gain deep insight into what makes this framework tick. 
Say goodbye to fixing problems by trial and error and hello to reasoning your way through them.
</p>

> **server Test'em**
http://localhost:7357

<pre>
atal error: spawn ENOENT (sic)
https://github.com/teropa/build-your-own-angularjs/issues/88
**result:**
Same problem worked perfectly only small detail:
in file:
node_modules\grunt-contrib-testem\node_modules\testem\lib\browser_launcher.js
it was the line line 120 (not 123 as mentioned above)
exe: 'phantomjs', ---> exe: 'phantomjs.cmd',
</pre>
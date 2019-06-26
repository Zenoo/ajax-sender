# Ajax Sender [(Demo)](https://jsfiddle.net/Zenoo0/sxupbLyk/)

Send AJAX requests easily

### Doc

* **Installation**

Simply import AjaxSender into your HTML.
```
<script src="https://gitcdn.link/repo/Zenoo/ajax-sender/master/AjaxSender.min.js"></script>	
```
* **How to use**

Create a new [`AjaxSender`](https://zenoo.github.io/ajax-sender/AjaxSender.html) object with the URL as the first parameter :
```js
let ajax = new AjaxSender('https://your.url', options);
// OR using await
let data = await new AjaxSender('https://your.url', {
	...,
	wait: true
}).asPromise().send();
```
* **Options**

```js
{
	method: 'GET',
	data: { ... },
	responseType: 'json',
	wait: false, // Wait before sending the request ?
	headers: { ... },
	progress: response => { ... },
	load: response => { ... },
	error: response => { ... },
	uploadProgress: response => { ... },
	uploadLoad: response => { ... }
}
```
* **Methods**

See the [documentation](https://zenoo.github.io/ajax-sender/AjaxSender.html) for the method definitions.  

* **Example**

See this [JSFiddle](https://jsfiddle.net/Zenoo0/sxupbLyk/) for a working example

## Authors

* **Zenoo** - *Initial work* - [Zenoo.fr](https://zenoo.fr)
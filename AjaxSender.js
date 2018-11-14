/* exported AjaxSender */

/**
 * Callback function used for the XHR events
 *
 * @callback eventCallback
 * @param {Object} response The XHR response
 */

/**
 * AjaxSender Class used to handle ajax calls
 */
class AjaxSender{
	/**
     * Creates an instance of AjaxSender
	 * @param {String}					url                   			URL to send the call to
     * @param {Object}					[parameters]            		Request parameters
     * @param {String}					[parameters.method=GET]			Request method
     * @param {Object|FormData}			[parameters.data]				Request data
     * @param {String}					[parameters.responseType=json]	Request response type
     * @param {Object.<String, String>}	[parameters.headers]			Request headers
     * @param {eventCallback}			[parameters.progress]			Callback for the progress event
     * @param {eventCallback}			[parameters.load]				Callback for the load event
     * @param {eventCallback}			[parameters.error]				Callback for the error event
     * @param {eventCallback}			[parameters.uploadProgress]		Callback for the upload progress event
     * @param {eventCallback}			[parameters.uploadLoad]			Callback for the upload progress event
     */
	constructor(url, parameters){
		/**
		 * The request corresponding XMLHttpRequest
		 * @type {XMLHttpRequest}
		 */
		this.xhr = new XMLHttpRequest();

		// Default values
		this._parameters = {
			method: parameters.method || 'GET',
			data: parameters.data || {},
			responseType: parameters.responseType || 'json',
			headers: parameters.headers || {},
			progress: parameters.progress,
			load: parameters.load,
			error: parameters.error,
			uploadProgress: parameters.uploadProgress,
			uploadLoad: parameters.uploadLoad
		};

		this._handleCallbacks();

		/**
		 * Request method
		 */
		if(this._parameters.method == 'GET'){
			this.xhr.open('GET', url + '?' + this._objectToURL(this._parameters.data));
		}else{
			this.xhr.open(this._parameters.method, url);
		}

		/**
		 * Request headers
		 */
		Object.entries(this._parameters.headers).forEach(([header, value]) => this.xhr.setRequestHeader(header, value));

		/**
		 * Data handling
		 */
		if(this._parameters.method == 'GET'){
			this.xhr.send();
		}else{
			if(this._parameters.data instanceof FormData){
				this._parameters.data.processData = false;
				this._parameters.data.contentType = false;
				this.xhr.send(this._parameters.data);
			}else{
				const formData = new FormData();
	
				formData.processData = false;
				formData.contentType = false;
				Object.keys(this._parameters.data).forEach(key => {
					const data = typeof this._parameters.data[key] == 'object' ? JSON.stringify(this._parameters.data[key]) : this._parameters.data[key];

					console.log(data);
					formData.append(key, data);
				});
				this.xhr.send(formData);
			}
		}
	}

	/**
	 * Handle callback attachment
	 * @private
	 */
	_handleCallbacks(){
		/**
		 * DOWNLOAD CALLBACKS
		 */
		if(this._parameters.progress){
			this.xhr.addEventListener('progress', () => {
				Reflect.apply(this._parameters.progress, null, [this.xhr.response]);
			});
		}
		if(this._parameters.load){
			this.xhr.addEventListener('load', () => {
				if(this.xhr.status == 200){
					Reflect.apply(this._parameters.load, null, [this.xhr.response]);
				}else{
					if(this._parameters.error){
						Reflect.apply(this._parameters.error, null, [this.xhr]);
					}else{
						console.log(this.xhr);
					}
				}
			});
		}
		this.xhr.addEventListener('error', this._parameters.error ? () => {
			Reflect.apply(this._parameters.error, null, [this.xhr]);
		} : () => {
			console.log(this.xhr);
		});

		/**
		 * UPLOAD CALLBACKS
		 */
		if(this._parameters.uploadProgress){
			this.xhr.upload.addEventListener('progress', () => {
				Reflect.apply(this._parameters.uploadProgress, null, [this.xhr.response]);
			});
		}
		if(this._parameters.uploadLoad){
			this.xhr.upload.addEventListener('load', () => {
				Reflect.apply(this._parameters.uploadLoad, null, [this.xhr.response]);
			});
		}
		this.xhr.upload.addEventListener('error', this._parameters.error ? () => {
			Reflect.apply(this._parameters.error, null, [this.xhr]);
		} : () => {
			console.log(this.xhr);
		});
	}

	/**
	 * Encode an object for an URL use
	 * @param {Object} object Object to transform
	 * @param {String} prefix Parameter needed for the recursion
	 * @private
	 */
	_objectToURL(object, prefix){
		const str = [];

		for (const p in object) {
			if (Reflect.ownKeys(object).includes(p)) {
			const 	k = prefix ? prefix + '[' + p + ']' : p,
					v = object[p];

				str.push(v !== null && typeof v === 'object' ? this._objectToURL(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
			}
		}

		return str.join('&');
	}

	/**
	 * Stops any outgoing request
	 * @returns {AjaxSender} The current AjaxSender
	 */
	stop(){
		this.xhr.abort();

		return this;
	}
}
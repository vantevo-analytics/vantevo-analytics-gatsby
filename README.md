# The analytics of your website, but simpler
 
**Vantevo Analytics** is the alternative platform to Google Analytics that respects privacy, because it does not need cookies not compliant with the GDPR. Easy to use, light and can be integrated into any website and back-end.
 
For more information visit the website [vantevo.io](https://vantevo.io).

Official plugin Vantevo Analytics for Gatsby.

## Installation
 
`npm install vantevo-analytics-gatsby`


## Usage
 
To start tracking page views and events, you need add the plugin to your `gatsby-config.js`.

```json
module.exports = {
  "plugins": [
    {
      "resolve": "vantevo-analytics-gatsby",
      "options": {
        "excludePath": [],
        "dev": false,
        "hash": false,
        "domain": null,
        "manualPageview": false,
        "outboundLinks": false,
        "trackFiles": null,
        "saveExtensionFiles": false,
        "trackEcommerce": false,
        "srcScript": null,
        "proxyServer": null,
        "scrScriptEcommerce": null,
        "proxyServerEcommerce": null,
      }
    }
  ]
};
```

These are the parameters available for the tracker settings, all fields are optional.
 
| Option                | Type                  | Description                                                                                                                    | Default |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| excludePath           | `array`  (Optional)   | You can exclude one or more pages from the statistics, [settings](https://vantevo.io/docs/)          | `[]`    |
| dev                   | `boolean` (Optional)  | Tracker will not send data to server, please check browser console to view request information.                              | `false` |
| hash                  | `boolean` (Optional)  | Allows tracking based on URL hash changes.                                                            | `false` |
| domain                | `string` (Optional)   | Use this option when the script is installed on a different domain than the one entered on Vantevo Analytics. To use this function remember to authorize the domain to be able to save the statistics, for more information [read more](https://vantevo.io/docs/domain-settings/information#authorized-domains). | `null`  |
| manualPageview        | `boolean` (Optional)  | Allows you to track page views automatically, the script uses the `popstate` event to navigate the site. | `false`  |
| outboundLinks         | `boolean` (Optional)  | Allows you to monitor all outbound links from your site automatically, the script uses the `click` and` auxclick` events.          | `false`  |
| trackFiles            | `string` (Optional)   | Is a list of extensions, separated by commas, example: zip,mp4,avi,mp3. Whenever a user clicks on a link, the script checks if the file extension is in the list you entered in the parameter and sends a `File Download` event with the value `url`. | `null`  |
| saveExtensionFiles    | `boolean` (Optional)  | Allows you to save in the event detail together with the` url` also the name of the file extension as `meta_key` to get more information and statistics about your files to download. | `false`  |
| trackEcommerce        | `boolean` (Optional)  | Add ecommerce monitoring script automatically. | `false`  |
| srcScript             | `string` (Optional)   | You can download the `vantevo.js` file local instead of using the file externally. | `https://vantevo.io/js/vantevo.js`  |
| proxyServer           | `string` (Optional)   | If you want to use a proxy server for requests sent to Vantevo.  | `https://api.vantevo.io/event`  |
| scrScriptEcommerce    | `string` (Optional)   | You can download the `vantevo-ecommerce.js` file local instead of using the file externally. | `https://vantevo.io/js/vantevo-ecommerce.js`  |
| proxyServerEcommerce  | `string` (Optional) | If you want to use a proxy server for requests sent to Vantevo for ecommerce events. | `https://api.vantevo.io/event-ecommerce`  |




## Page view monitoring and event management
#### Parameters
 
| Option         | Type                  | Description                                                                              | Default                  |
| -------------- | --------------------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| event          | `string` (required)   | Event Name.                                                                              | `pageview`               |
| values         | `object` (required)   | An object with custom properties for events.                                             | `{}`                     |
| callback       | `function` (optional) | A function that is called once the event has been successfully logged.                   | `null`  

### Simple Pageview

Submit a pageview using `location.href` as the request URL and` document.title` for the page title.

```ts
window.vantevo("pageview");
```
 
 ### Pageview change pathname of url

You can submit a custom pageview where you can change the `pathname` of the page. In the example below, the page URL is https://example.com/blog?page=2 with the `pathname=/blog` and the`page=2` parameter (the page = 2 parameter will be ignored, see [guide](https://vantevo.io/docs)), using the `pageview` event with the` meta` parameter of type `{path:"/blog/page/2"}` , the script will save as page pathname: `/blog/page/2`.

```ts
window.vantevo("pageview", { path: "/blog/page/2" }, () => {});
```

### Pageview change title page

Vantevo uses `document.title` to get the full title of the page, in this example you will see how you can change the page title.

```ts
window.vantevo("pageview", { title: "New Title Page" }, () => {});
```


## Event
 
An example of how to send an event with the name "Download" and with the information `meta_key=pdf` and` meta_value=presentation`, the `meta` parameter is a simple json.
 
Vantevo Analytics handles the `meta_key=duration`, the value of this field is of type `Number`. With the `duration` parameter it is possible to send a number (seconds) with the event that will be used to calculate the average duration of the event itself.

```ts
window.vantevo("download", { pdf: "presentation"  }, () => {});
/*** or ***/
window.vantevo("video", { title: "presentation", duration: 30 }, () => {});

```


## Monitoring Ecommerce

In the ecommerce section of Vantevo you can monitor specific actions affecting your ecommerce website and the sources of traffic that lead to sales. 


### Parameters

| Option         | Type                  | Description                                                                              | Default                  |
| -------------- | --------------------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| event          | `string` (required)   | Event Name. See below the list of events you can use for monitoring your ecommerce.      | `pageview`               |
| values         | `object` (required)   | An object with custom properties for events.                                             | `{}`                     |
| callback       | `function` (optional) | A function that is called once the event has been successfully logged.                   | `null`                   |


### List events 

These are the events to use to monitor your ecommerce:

| Event              | Description                                          |
| :----------------- | :--------------------------------------------------- |
| `add_to_wishlist`  | a user adds a product to the favorites list          |
| `view_item`        | a user views a product                               |
| `remove_item_cart` | a user removes a product from the cart               |
| `add_item_cart`    | a user adds product to the cart                      |
| `start_checkout`   | a user has started the checkout process              |
| `checkout_info`    | a user submits personal data                         |
| `checkout_ship`    | a user submits shipments data                        |
| `checkout_payment` | a user initiated the payment process                 |
| `purchase`         | a user has completed a purchase                      |


### Example

```ts
window.vanteco_ecommerce("view_item", { 
    "items": [
         {
            'item_id': "SKU_123",
            'item_name': "Samsung Galaxy",
            'currency': "EUR",
            'quantity': 1,
            'price': 199.99,
            'discount': 0,
            'position': 1,
            'brand': "Samsung",
            'category_1': "Smartphone",
            'category_2': "Samsung",
            'category_3': "Galaxy",
            'category_4': "",
            'category_5': "",
            'variant_1': "Black",
            'variant_2': "5.5 inch",
            'variant_3': ""
        }
    ]
});

```

Read our [guide](https://vantevo.io/docs/ecommerce/index/?utm_source=npm&utm_medium=vantevo-analytics-gatsby) for more information of how to use the ecommerce tracking function.


## Vantevo Analytics Guide
 
To see all the features and settings of Vantevo Analytics we recommend that you read our complete guide [here](https://vantevo.io/docs).
 



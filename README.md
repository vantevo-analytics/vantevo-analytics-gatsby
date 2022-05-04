# The analysis of your website, but simpler
 
**Vantevo Analytics** is the alternative platform to Google Analytics that respects privacy, because it does not need cookies not compliant with the GDPR. Easy to use, light and can be integrated into any website and back-end.
 
For more information visit the website [vantevo.io](https://vantevo.io).


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
        "saveExtesionFiles": false,
        "srcScript": null
      }
    }
  ]
};
```

These are the parameters available for the tracker settings, all fields are optional.
 
| Option          | Type                  | Description                                                                                                                    | Default |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| excludePath       | `array`  (Optional) | You can exclude one or more pages from the statistics, [settings](https://vantevo.io/docs/)          | `[]`    |
| dev               | `boolean` (Optional)| Tracker will not send data to server, please check browser console to view request information.                              | `false` |
| hash              | `boolean` (Optional)| Allows tracking based on URL hash changes.                                                            | `false` |
| domain            | `string` (Optional) | Use this option when the script is installed on a different domain than the one entered on Vantevo Analytics. | `null`  |
| manualPageview    | `boolean` (Optional)| Allows you to track page views automatically, the script uses the `popstate` event to navigate the site. | `false`  |
| outboundLinks     | `boolean` (Optional)| Allows you to monitor all outbound links from your site automatically, the script uses the `click` and` auxclick` events.          | `false`  |
| trackFiles        | `string` (Optional) | Is a list of extensions, separated by commas, example: zip,mp4,avi,mp3. Whenever a user clicks on a link, the script checks if the file extension is in the list you entered in the parameter and sends a `File Download` event with the value `url`. | `null`  |
| saveExtesionFiles | `boolean` (Optional)| Allows you to save in the event detail together with the` url` also the name of the file extension as `meta_key` to get more information and statistics about your files to download. | `false`  |
| srcScript         | `string` (Optional) | You can download the `vantevo.js` file local instead of using the file externally. | `https://vantevo.io/js/vantevo.js`  |


 
## Vantevo Analytics Guide
 
To see all the features and settings of Vantevo Analytics we recommend that you read our complete guide [here](https://vantevo.io/docs).
 



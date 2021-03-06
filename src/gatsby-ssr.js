const React = require("react");

const defaultOptions = {
  "excludePath": [],
  "dev": false,
  "hash": false,
  "domain": null,
  "manualPageview": false,
  "outboundLinks": false,
  "trackFiles": null,
  "saveExtensionFiles": false,
  "scrScript": "https://vantevo.io/js/vantevo.js",
  "params": {}
};

const addHeaderComponent = (setHeadComponents, scriptProps) => {
  return setHeadComponents([
    <script key="gatsby-plugin-vantevo-analytics" id="vantevo-analytics" {...scriptProps}></script>,
    <script
      key="gatsby-plugin-vantevo-analytics-custom"
      dangerouslySetInnerHTML={{
        __html: `window.vantevo = window.vantevo || function() {(window.vantevo.data = window.vantevo.data || [])};`
      }}
    />,
  ]);
};

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const scriptProps = {
    defer: true,
    async: true,
    src: "https://vantevo.io/js/vantevo.js"
  };
  
  const { excludePath, dev, hash, domain, manualPageview, outboundLinks, trackFiles, saveExtensionFiles, scrScript } = pluginOptions;

  if (scrScript) {
    scriptProps["src"] = scrScript;
  }

  if (excludePath && Array.isArray(excludePath)) {
    scriptProps["data-param-exclude"] = excludePath.join(",");
  }

  if (dev === true) {
    scriptProps["data-param-dev"] = true;
  }

  if (hash === true) {
    scriptProps["data-param-hash"] = true;
  }

  if (manualPageview === true) {
    scriptProps["data-param-manual-pageview"] = true;
  }

  if (outboundLinks === true) {
    scriptProps["data-param-outbound-links"] = true;
  }

  if (trackFiles) {
    scriptProps["data-param-track-files"] = trackFiles;
  }

  if (saveExtensionFiles === true) {
    scriptProps["data-param-save-extension"] = true;
  }

  if (domain) {
    scriptProps["data-param-domain"] = domain;
  }

  if (process.env.NODE_ENV === 'production') {
    return addHeaderComponent(setHeadComponents, scriptProps);
  }

  if (process.env.NODE_ENV !== 'production' && dev === true) {
    return addHeaderComponent(setHeadComponents, scriptProps);
  }

  return null;

};

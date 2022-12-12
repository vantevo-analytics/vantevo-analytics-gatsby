"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

const React = require("react");

const defaultOptions = {
  "excludePath": [],
  "dev": false,
  "hash": false,
  "domain": null,
  "manualPageview": false,
  "outboundLinks": false,
  "trackFiles": null,
  "trackEcommerce": false,
  "saveExtensionFiles": false,
  "scrScript": "https://vantevo.io/js/vantevo.js",
  "scrScriptEcommerce": "https://vantevo.io/js/vantevo.ecommerce.js",
  "proxyServer": "https://api.vantevo.io/event",
  "proxyServerEcommerce": "https://api.vantevo.io/event-ecommerce",
  "params": {}
};

const addHeaderComponent = (setHeadComponents, scriptProps, scriptEcommerceProps) => {
  var components = [/*#__PURE__*/React.createElement("script", (0, _extends2.default)({
    key: "gatsby-plugin-vantevo-analytics",
    id: "vantevo-analytics"
  }, scriptProps)), /*#__PURE__*/React.createElement("script", {
    key: "gatsby-plugin-vantevo-analytics-custom",
    dangerouslySetInnerHTML: {
      __html: `window.vantevo = window.vantevo || function() {(window.vantevo.data = window.vantevo.data || [])};`
    }
  })];

  if (scriptEcommerceProps && scriptEcommerceProps.trackEcommerce) {
    var _props = scriptEcommerceProps;
    delete _props.trackEcommerce;
    components.push( /*#__PURE__*/React.createElement("script", (0, _extends2.default)({
      key: "gatsby-plugin-vantevo-analytics-ecommerce",
      id: "vantevo-analytics-ecommerce"
    }, scriptEcommerceProps)));
    components.push( /*#__PURE__*/React.createElement("script", {
      key: "gatsby-plugin-vantevo-analytics-ecommerce-custom",
      dangerouslySetInnerHTML: {
        __html: `window.vantevo_ecommerce = window.vantevo_ecommerce || function() {(window.vantevo_ecommerce.data = window.vantevo_ecommerce.data || [])};`
      }
    }));
  }

  return setHeadComponents(components);
};

exports.onRenderBody = ({
  setHeadComponents
}, pluginOptions) => {
  const scriptProps = {
    defer: true,
    async: true,
    src: "https://vantevo.io/js/vantevo.js"
  };
  const scriptEcommerceProps = {
    defer: true,
    async: true,
    src: "https://vantevo.io/js/vantevo.ecommerce.js",
    trackEcommerce: false
  };
  const {
    excludePath,
    dev,
    hash,
    domain,
    manualPageview,
    outboundLinks,
    trackFiles,
    saveExtensionFiles,
    scrScript,
    trackEcommerce,
    scrScriptEcommerce,
    proxyServer,
    proxyServerEcommerce
  } = pluginOptions;

  if (trackEcommerce) {
    scriptEcommerceProps["trackEcommerce"] = trackEcommerce;
  }

  if (scrScriptEcommerce) {
    scriptEcommerceProps["src"] = scrScriptEcommerce;
  }

  if (proxyServerEcommerce) {
    scriptEcommerceProps["data-param-api"] = proxyServerEcommerce;
  }

  if (dev === true) {
    scriptProps["data-param-dev"] = true;
    scriptEcommerceProps["data-param-dev"] = true;
  }

  if (proxyServer) {
    scriptProps["data-param-api"] = proxyServer;
  }

  if (domain) {
    scriptProps["data-param-domain"] = domain;
    scriptEcommerceProps["data-param-domain"] = domain;
  }

  if (scrScript) {
    scriptProps["src"] = scrScript;
  }

  if (excludePath && Array.isArray(excludePath)) {
    scriptProps["data-param-exclude"] = excludePath.join(",").split(" ").join("");
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

  if (process.env.NODE_ENV === 'production') {
    return addHeaderComponent(setHeadComponents, scriptProps, scriptEcommerceProps);
  }

  if (process.env.NODE_ENV !== 'production' && dev === true) {
    return addHeaderComponent(setHeadComponents, scriptProps, scriptEcommerceProps);
  }

  return null;
};
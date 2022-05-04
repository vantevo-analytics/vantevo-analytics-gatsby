"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

const React = require("react");

const defaultOptions = {
  "excludePath": [],
  "dev": true,
  "hash": true,
  "domain": null,
  "manualPageview": true,
  "outboundLinks": true,
  "trackFiles": null,
  "saveExtesion": false,
  "scrScript": "https://vantevo.io/js/vantevo.js",
  "params": {}
};

const addHeaderComponent = (setHeadComponents, scriptProps) => {
  return setHeadComponents([/*#__PURE__*/React.createElement("script", (0, _extends2.default)({
    key: "gatsby-plugin-vantevo-analytics",
    id: "gatsby-vantevo"
  }, scriptProps)), /*#__PURE__*/React.createElement("script", {
    key: "gatsby-plugin-vantevo-analytics-custom",
    dangerouslySetInnerHTML: {
      __html: `window.vantevo = window.vantevo || function() {(window.vantevo.data = window.vantevo.data || [])};`
    }
  })]);
};

exports.onRenderBody = ({
  setHeadComponents
}, pluginOptions) => {
  const scriptProps = {
    defer: true,
    async: true,
    src: "https://vantevo.io/js/vantevo.js"
  };
  const {
    excludePath,
    dev,
    hash,
    domain,
    manualPageview,
    outboundLinks,
    trackFiles,
    saveExtesion,
    scrScript
  } = pluginOptions;

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

  if (saveExtesion === true) {
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
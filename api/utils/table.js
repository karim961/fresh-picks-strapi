"use strict";

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.map((obj) => jsonToTable(obj));
  } else if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
};

const jsonToTable = (json) => {
  const rows = Object.keys(json).map(
    (key) => `
      <tr>
        <td>${key}</td>
        <td>${formatValue(json[key])}</td>
      </tr>
    `
  );

  return `
    <table>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
      ${rows.join("\n")}
    </table>
  `;
};

module.exports = jsonToTable;

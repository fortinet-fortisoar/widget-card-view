| [Home](../README.md) |
| ----------------- |

# Usage

The **Card View** widget renders records from your configured data source as a grid of visual cards. Once added and configured on a template, the card grid updates automatically as new records are created or existing records are modified in FortiSOAR.

## What Each Card Displays

Each card in the grid is made up of the following elements, all driven by your configuration:

| Element         | Description                                                                                                                                                         |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Header**      | An image or banner at the top of the card, sourced from the field selected in **Card Header Content**                                                               |
| **Title**       | The primary label of the card, sourced from the field selected in **Card Title**                                                                                    |
| **Left Border** | A colored vertical bar on the left edge of the card, reflecting the value of the field selected in **Card Left Border** — useful for status or severity at a glance |
| **Body Fields** | Additional fields displayed as labeled rows inside the card, as configured in the **Fields** section                                                                |

## Interacting with Cards

- **Clicking a card** opens the full detail view of that record, allowing you to review or act on it without leaving the current page context.
- The card grid respects the **Limit** and **Filter Criteria** you configured, so only relevant records within the defined limit are shown.
- Cards are ordered according to the **Default Sort** settings defined during configuration.

## Example — Threat Intel Reports

When used with the Threat Intel Management solution pack, the Card View widget displays Threat Intel Reports as cards on a dashboard or view panel. Each card shows:

- The **Threat Report Image** as the card header
- The report **Title** as the card title
- The **Report Status** as the left border color
- Body fields such as **Publish Date**, **CVE List**, **Tags**, and **Summary**

This gives analysts an instant, visual overview of all available threat intelligence reports — their status, key metadata, and associated CVEs — without having to open each record individually.

## Next Steps

| [Installation](./setup.md#installation) | [Configuration](./setup.md#configuration) |
| --------------------------------------- | ----------------------------------------- |

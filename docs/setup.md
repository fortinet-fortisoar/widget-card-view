| [Home](../README.md) |
|----------------------|

# Installation

1. In FortiSOAR, navigate to **Content Hub** > **Discover**.

2. From the list of widgets, search for **Card View**.

3. Click the **Card View** widget card.

4. Click **Install** at the bottom of the card to begin installation.

# Configuration

To configure the **Card View** widget:

1. Navigate to the listing page where you want to add the widget.

2. Click **Edit Template** to open the template editor.

3. Click **Add Widget** and select **Card View** from the list.

4. The **Add Card View** configuration form opens. Fill in the fields described.

5. Click **Save** to apply the configuration.

## Data Source

Select the FortiSOAR module whose records will be displayed as cards. For example, select **Threat Intel Reports** to display threat intelligence report records.

## Limit

Set the maximum number of records to fetch and display in the card grid. The default value is **`30`**. Adjust this based on how many cards you want visible at once.

## Filter Criteria

Define conditions to restrict which records are displayed. The filter builder supports the following modes:

- **All of the below are true (AND)** — all defined conditions must be met for a record to appear.
- **Any of the below are true (OR)** — at least one condition must be met.

Use **<picture><source media="(prefers-color-scheme: dark)" srcset="./res/icon-add-light.svg"><source media="(prefers-color-scheme: light)" srcset="./res/icon-add-dark.svg"><img alt="Fallback image description" src="./res/icon-add-dark.svg"></picture> Add Condition** to add individual field-level filters, or **<picture><source media="(prefers-color-scheme: dark)" srcset="./res/icon-add-light.svg"><source media="(prefers-color-scheme: light)" srcset="./res/icon-add-dark.svg"><img alt="Fallback image description" src="./res/icon-add-dark.svg"></picture> Add Conditions Group** to create nested logical groups for more complex filtering.

## Default Sort

Define the default order in which cards are displayed. Click **<picture><source media="(prefers-color-scheme: dark)" srcset="./res/icon-add-light.svg"><source media="(prefers-color-scheme: light)" srcset="./res/icon-add-dark.svg"><img alt="Fallback image description" src="./res/icon-add-dark.svg"></picture> Add Sorting Parameter** to select a field and choose ascending or descending order. Multiple sort parameters can be added and prioritized.

## Card Header Content

Select the field whose value is displayed as the header image or banner at the top of each card. For example, select **Threat Report Image** to display the report's associated image in the card header.

## Card Title

Select the field whose value is used as the primary title of each card. For example, select **Title** to display the record's title prominently on the card.

## Card Left Border

Select the field whose value determines the color of the left border on each card. This is typically used to reflect a status or severity at a glance. For example, select **Report Status** to color-code cards by their current status.

## Fields

Add the fields you want displayed in the body of each card. Use the **Select a field** dropdown to choose a field, then click **Add Field** to include it. Repeat this for each field you want shown.

Fields added here appear as labeled rows inside the card body. You can remove any field by clicking the <picture><source media="(prefers-color-scheme: dark)" srcset="./res/icon-close-light.svg"><source media="(prefers-color-scheme: light)" srcset="./res/icon-close-dark.svg"><img alt="" src="./res/icon-close-dark.svg"></picture> button next to it.

**Example fields configured for Cybersecurity News:**

The following are the fields selected to manage information displayed in *Cybersecurity News* under **Threat intel Management**.

| Field        | Purpose                                 |
|--------------|-----------------------------------------|
| Publish Date | Shows when the report was published     |
| CVE List     | Lists associated CVEs                   |
| Tags         | Displays classification tags            |
| Summary      | Shows a brief description of the report |

## Next Steps

| [Usage](usage.md) |
| ----------------- |

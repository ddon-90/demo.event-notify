## Name:
Event Notify

## Description:
Example of a custom back-end application that listens to catalog changes and acts accordingly.

## Proof points:
- Back-end customization
- App settings
- Listening to events

## How to demo:

1. Clone/Download this repository and open it with a code editor of your choice, eg. VSCode

2. Open the terminal and login to your VTEX account

```
vtex login {{account}}
```

3. Create a new development workspace or use an existing one

```
vtex use {{workspace}}
```

4. Add the account name as the vendor on `manifest.json` file

```
{
  "name": "event-notify",
  "vendor": "{{account}}",
  "version": "0.0.1",
  "title": "Event Notify",
  "description": "Example of a custom back-end application that listens to catalog changes and acts accordingly.",
  "mustUpdateAt": "2018-01-04",
  ...
  ...
}
```

5. Link the project

```
vtex link
```

6. On the master workspace, set up the Catalog Broadcaster app in order to receive notifications on the workspace you are working on

![Safe Inventory](./images/safe-inventory-3.png)
![Safe Inventory](./images/safe-inventory-4.png)